# Api tests with Supertest and Jest

In this project I demonstrate how to use Supertest and Jest WebDriver for Api test automation.

This project includes:
- Framworks:
    - Supertest
    - Jest
- Features:
    - Helper´s, Clients´s
    - ES6 style class-based approach
    - Code formatter (ESlint, Prettier)
    - Report with Allure
    
## Requirements
- node >= 10.18.x - [how to install Node](https://nodejs.org/en/download/)
- yarn >= 1.21.x - [how to install Yarn](https://yarnpkg.com/en/docs/install#debian-stable)

## Getting Started
Install dependencies:

```bash
$ yarn install
```
## API
For this tests i use a local api which can be found here: [Simple jwt local api](https://github.com/Schveitzer/simple-api-jwt-server)

## To run tests:
```bash
$ yarn init:tests
```
![Run Img](https://i.ibb.co/FnNpfKT/Peek-28-08-2020-18-12.gif)
## Reports
Run the command below to generate the test report:

```bash
$ allure generate
```

To view the report in the browser, run the command:

```bash
$ allure serve
```
![Allure report](https://i.ibb.co/yy3S6BH/screenshot-127-0-1-1-37023-2020-08-28-11-57-50.png)
## Lint Code
To lint and format the code, run:

```bash
$ yarn code:format
```

## Base url and configurations
The environment variables of other configurations are loaded on [EnvironmentVariables.js](https://github.com/Schveitzer/api-tests-supertest-jest/blob/master/config/EnvironmentVariables.js) , to change the base url edit the address in  [config.json](https://github.com/Schveitzer/api-tests-supertest-jest/blob/master/config/config.json).
