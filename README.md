# Skill Matcher Guide



## API

### Configurations

- `MONGO_URI`: The connection string of the MongoDB database used.

- `PORT`: The port number of the API server. By default it is set to `8080`

- `ROOT_USER_USERNAME`: The username of the root user. By default it is set to `root`.

- `ROOT_USER_PASSWORD`: The password of the root user. By default it is set to `password`

- `ACCESS_TOKEN_JWT_SECRET`: Secret used to sign the access token. By default it is set to `secret`. Should be changed in production.

- `REFRESH_TOKEN_JWT_SECRET`: Secret used to sign the refresh token. By default it is set to `secret`. Should be changed in production.

- `AWS_USE_LOCAL`: Set to `true` if Localstack S3 is used, otherwise, if AWS S3 is used set to `false`. By default it is set to `false`.

- `AWS_REGION`: AWS region in which the S3 bucket is hosted.

- `AWS_ACCESS_KEY_ID`: Access key ID used to access the S3 bucket.

- `AWS_SECRET_ACCESS_KEY`: Secret access key used to access the S3 bucket. 

- `AWS_S3_PUBLIC_BUCKET_NAME`: The public name of the S3 bucket used.

- `AWS_S3_ENDPOINT`: The base URL of the localstack S3. This must be configured if Localstack S3 is used. 

### Important Commands

- `npm run start:dev`: Run application in development mode.

- `npm run build`: Build the application.

- `npm run start:prod`:  Run the built application. 

- `npm run migrate`: Used to run migrations in development - Typescript must be available to run. [Read more](https://github.com/mycodeself/mongo-migrate-ts#readme)

- `npm run test`: Run unit tests.

- `npm run test:e2e`: Run end-to-end tests.

Note: OpenAPI specification can be found at `<base url>/api-docs`

## User Client

### Configurations

- `NEXT_PUBLIC_API_BASE_URL`: The base url of the API. It is used when the API on the client side.

- `SERVER_SIDE_API_BASE_URL`: The base url of the API. It is used when the API on the server side


### Important commands

- `yarn dev`: Start the application in development mode.

- `yarn start`: Start the built application. 

- `yarn build`: Build the application. 


## Admin Client

### Configurations

- `NEXT_PUBLIC_API_BASE_URL`: The base url of the API. It is used when the API on the client side.

- `SERVER_SIDE_API_BASE_URL`: The base url of the API. It is used when the API on the server side

### Important commands

- `yarn dev`: Start the application in development mode.

- `yarn start`: Start the built application.

- `yarn build`: Build the application. 

## Running Skill Matcher with docker compose locally

- clone the repository

- navigate to `docker` folder

- Build and run the application by running `docker compose up`. Use `-d` flag to run in detach mode.

- Run the script in `docker/init_s3.sh` to initialise a local s3 bucket.

- By default:
  - The API runs on `http://localhost:8080`
  - The Admin client runs on `http://localhost:8082`
  - The user client runs on `http://localhost:8081`




  






