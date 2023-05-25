# Skill Matcher Guide

## Links

- [User client ](https://user-client-ao39q.ondigitalocean.app)
- [API](https://api.skillmatcher.putdevs.com/)
- [API Documentations](https://api.skillmatcher.putdevs.com/api-docs)

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

## Run Skill Matcher with docker compose locally

- clone the repository

- navigate to `docker` folder

- Build and run the application by running `docker compose up`. Use `-d` flag to run in detach mode.

- Run the script in `docker/init_s3.sh` to initialise a local s3 bucket.

- By default:
  - The API runs on `http://localhost:8080`
  - The Admin client runs on `http://localhost:8082`
  - The user client runs on `http://localhost:8081`


## Run Skill Matcher in development mode

### MongoDB and S3 (Optional)

- If you do not already have MongoDB and/or S3 running. We do provide a docker compose file in `docker/infras` to spin up the required infrastructure locally. 
- To initialise a S3 bucket run the script in `docker/init_s3.sh`. This will create an S3 bucket called `skill-matcher-bucket`
- MongoDB default configuration are:
  - Host: `localhost`
  - Port: `27017`
  - Root user: `root`
  - Root password: `password`
  - Database: `skill-matcher`
- S3 default configurations are:
  - Endpoint: `http://localhost:4566/`
  - Bucket name: `skill-matcher-bucket`
  - Region: Any valid AWS region 
  - Access key Id: Any random string
  - Secret Access Key: Any random string

### API

- Configure environment variable in `api/.env` file appropriately. See `api/exmaple.env` to see a list of all the variables.

- If you are using the provided docker compose to run MongoDB and S3 with the default configuration. Use the copy the following configuration into your `api/.env` file:

```
NODE_ENV=development

MONGO_URI=mongodb://root:password@localhost:27017/skill-matcher

PORT=8080

ROOT_USER_USERNAME=root
ROOT_USER_PASSWORD=password
ROOT_USER_EMAIL=root@example.com

AWS_USE_LOCAL=true
AWS_REGION=ap-southeast-2
AWS_ACCESS_KEY_ID=demo
AWS_SECRET_ACCESS_KEY=demo

AWS_S3_PUBLIC_BUCKET_NAME=skill-matcher-bucket
AWS_S3_ENDPOINT=http://localhost:4566
```

- Navigate into `api`

- To populate the application with dummy data run `npm run migrate up`.

- Run the `npm run start:dev` to start the application in development mode.


### User client

- Configure environment variable in `user-client/.env`. See `api/example.env` to see all the available variables.

- If you are using the default configuration for the API. Copy the following configuration into your `user-client/.env`.
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
SERVER_SIDE_API_BASE_URL=http://localhost:8080
```

- Navigate to `user-client`

- Run `yarn dev` to start the application in development mode.


### Admin client

- Configure environment variable in `admin-client/.env`. See `admin/example.env` to see all the available variables.

- If you are using the default configuration for the API. Copy the following configuration into your `user-client/.env`.
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
SERVER_SIDE_API_BASE_URL=http://localhost:8080
```

- Navigate to `admin-client`

- Run `yarn dev` to start the application in development mode.







