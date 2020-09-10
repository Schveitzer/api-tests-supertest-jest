import nconf from '../config/EnvironmentVariables';
import logins from '../config/Logins.json';
import supertest from 'supertest';

const authorizations = {};

class LoginHelper {
    async getClient(userType) {
        const user = logins[userType];

        const token = await this.getToken(user);

        const hook = (method = 'post') => (args) =>
            supertest(nconf.get('APP_BASE_URL'))
                [method](args)
                .set('authorization', token);

        return {
            post: hook('post'),
            get: hook('get'),
            put: hook('put'),
            patch: hook('patch'),
            delete: hook('delete'),
        };
    }

    async getToken(user) {
        if (!(user.email in authorizations)) {
            const url = 'auth/login';
            const params = {
                email: user.email,
                password: user.password,
            };

            const response = await supertest(nconf.get('APP_BASE_URL'))
                .post(url)
                .send(params);
            authorizations[user.email] = {
                access_token: response.body.access_token,
            };
        }

        return `Bearer ${authorizations[user.email].access_token}`;
    }
}

export const loginHelper = new LoginHelper();
