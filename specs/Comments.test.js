import { loginHelper } from '../helpers/Login.helper';
import { Severity } from 'jest-allure/dist/Reporter';
import { objectHelper } from '../helpers/Object.helper';
import { StatusCodes } from 'http-status-codes/build/es';

let client;
let endPoint;
let keysToRemove;

beforeAll(async () => {
    client = await loginHelper.getClient('User 1');
    endPoint = 'comments/';
    keysToRemove = ['id'];
});

describe('Comments', () => {
    it('/GET ID: 1 - Returns the comment with id 1 ', async () => {
        reporter.severity(Severity.Critical);
        const response = await client
            .get(endPoint + '1')
            .expect(StatusCodes.OK);

        expect(response.body).toStrictEqual({
            articleId: 1,
            body: 'Brilliant',
            id: 1,
        });
    });

    it('/POST - Post a new comment ', async () => {
        reporter.severity(Severity.Critical);
        const response = await client
            .post(endPoint)
            .send({
                body: 'Brilliant',
                articleId: 1,
            })
            .expect(StatusCodes.CREATED);

        // Remove dinamic key id from response for comparation
        objectHelper.removeKeys(response.body, keysToRemove);

        expect(response.body).toEqual({
            body: 'Brilliant',
            articleId: 1,
        });
    });

    it('/PATCH ID: 10 - Update the comment with id 10', async () => {
        reporter.severity(Severity.Minor);
        const response = await client
            .patch(endPoint + '10')
            .send({ body: 'Update with PATCH' })
            .expect(StatusCodes.OK);

        expect(response.body).toEqual({
            id: 10,
            body: 'Update with PATCH',
            articleId: 1,
        });
    });

    it('/DELETE - Register a comment and delete it', async () => {
        reporter.severity(Severity.Normal);
        const responsePost = await client
            .post(endPoint)
            .send({
                body: 'Brilliant',
                articleId: 1,
            })
            .expect(StatusCodes.CREATED);

        const resquestDelete = await client.delete(
            `${endPoint}${responsePost.body.id}`,
        );

        expect(resquestDelete.statusCode).toEqual(StatusCodes.OK);
    });
});
