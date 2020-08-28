import { loginHelper } from '../helpers/Login.helper';
import { Severity } from 'jest-allure/dist/Reporter';
import { objectHelper } from '../helpers/Object.helper';

let client;
const url = 'comments/';

beforeAll(async () => {
    client = await loginHelper.getClient('User 1');
});

describe('Comments', () => {
    it('/GET ID: 1', async () => {
        reporter.severity(Severity.Critical);
        const response = await client.get(url + '1').expect(200);

        expect(response.body).toStrictEqual({
            articleId: 1,
            body: 'Brilliant',
            id: 1,
        });
    });

    it('/POST', async () => {
        reporter.severity(Severity.Critical);
        const response = await client
            .post(url)
            .send({
                body: 'Brilliant',
                articleId: 1,
            })
            .expect(201);

        // Remove dinamic key id from response for comparation
        objectHelper.removeKeys(response.body, ['id']);

        expect(response.body).toEqual({
            body: 'Brilliant',
            articleId: 1,
        });
    });

    it('/PATCH ID: 10', async () => {
        reporter.severity(Severity.Minor);
        const response = await client
            .patch(url + '10')
            .send({ body: 'Update with PATCH' })
            .expect(200);

        expect(response.body).toEqual({
            id: 10,
            body: 'Update with PATCH',
            articleId: 1,
        });
    });

    it('/DELETE', async () => {
        reporter.severity(Severity.Normal);
        const responsePost = await client
            .post(url)
            .send({
                body: 'Brilliant',
                articleId: 1,
            })
            .expect(201);

        const resquestDelete = await client.delete(
            `${url}${responsePost.body.id}`,
        );

        expect(resquestDelete.statusCode).toEqual(200);
    });
});
