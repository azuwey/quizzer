# Quizzer

Quizzer is a small backend API for creating quizzes and attempting quizzes

## Installation

```shell
npm install
```

### Dot env file

You need to create a `.env` file in the root folder of the project with the following content:

```shell
MONGODB_URI=mongodb://<username>:<password>@<host>
JWT_SECRET=some_secret
JWT_EXPIRY=expiration_time
```

## Running the app

### Development (non-watch mode)

```shell
npm run start
```

### Development (watch mode)

```shell
npm run start:dev
```

### Production

```shell
npm run start:prod
```

## Testing

### Unit

```shell
npm run test
```

### E2E

```shell
npm run test:e2e
```

### Coverage

```shell
npm run test:cov
```

## License

Quizzer is [BSD 3-Clause licensed](https://github.com/azuwey/quizzer/blob/main/LICENSE).

## Endpoints

### SignUp

```shell
curl -X POST http://localhost:3000/authentication/sign-up -d '{"emailAddress": "test@test.com", "password": "changeme"}' -H "Content-Type: application/json"
```

### SignIn

```shell
curl -X POST http://localhost:3000/authentication/sign-in -d '{"emailAddress": "test@test.com", "password": "changeme"}' -H "Content-Type: application/json"
```
