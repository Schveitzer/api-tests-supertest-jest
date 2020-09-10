import { loginHelper } from '../helpers/Login.helper';
import { Severity } from 'jest-allure/dist/Reporter';
import { objectHelper } from '../helpers/Object.helper';
import { fsHelper } from '../helpers/FileSystem.helper';
import { StatusCodes } from 'http-status-codes';

let client;
let endPoint;
let keysToRemove;

beforeAll(async () => {
    client = await loginHelper.getClient('User 1');
    endPoint = 'users/';
    keysToRemove = ['id'];
});

describe('Users', () => {
    it('/GET ID: 1 - Returns user data with id 1', async () => {
        reporter.severity(Severity.Critical);
        const response = await client
            .get(endPoint + '1')
            .expect(StatusCodes.OK);
        const fileToCompare = fsHelper.readJsonFile('users-1');

        expect(response.body).toStrictEqual(fileToCompare);
    });

    it('/GET PAGE: 1 LIMIT: 2 - Returns user data with pagination and limit', async () => {
        reporter.severity(Severity.Normal);
        const response = await client
            .get(endPoint + '?_page=1&_limit=2')
            .expect(200);

        const fileToCompare = fsHelper.readJsonFile('users-2');

        expect(response.body).toStrictEqual(fileToCompare);
    });

    it('/POST - Register a new user', async () => {
        reporter.severity(Severity.Normal);
        const fileToPost = fsHelper.readJsonFile('users-3');
        const response = await client
            .post(endPoint)
            .send(fileToPost)
            .expect(StatusCodes.CREATED);

        // Remove dinamic key id from response for comparation
        objectHelper.removeKeys(response.body, keysToRemove);

        expect(response.body).toEqual(fileToPost);
    });
});
