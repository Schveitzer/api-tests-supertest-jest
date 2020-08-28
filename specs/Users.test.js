import { loginHelper } from '../helpers/Login.helper';
import { Severity } from 'jest-allure/dist/Reporter';
import { objectHelper } from '../helpers/Object.helper';
import { fsHelper } from '../helpers/FileSystem.helper';

let client;
const url = 'users/';

beforeAll(async () => {
    client = await loginHelper.getClient('User 1');
});

describe('Users', () => {
    it('/GET ID: 1', async () => {
        reporter.severity(Severity.Critical);
        const response = await client.get(url + '1').expect(200);
        const fileToCompare = fsHelper.readJsonFile('users-1');

        expect(response.body).toStrictEqual(fileToCompare);
    });

    it('/GET PAGE: 1 LIMIT: 2', async () => {
        reporter.severity(Severity.Normal);
        const response = await client
            .get(url + '?_page=1&_limit=2')
            .expect(200);

        const fileToCompare = fsHelper.readJsonFile('users-2');

        expect(response.body).toStrictEqual(fileToCompare);
    });

    it('/POST', async () => {
        reporter.severity(Severity.Normal);
        const fileToPost = fsHelper.readJsonFile('users-3');
        const response = await client.post(url).send(fileToPost).expect(201);

        // Remove dinamic key id from response for comparation
        objectHelper.removeKeys(response.body, ['id']);

        expect(response.body).toEqual(fileToPost);
    });
});
