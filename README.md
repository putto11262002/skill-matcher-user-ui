# Skill Matcher Development Guide

## Required software for local development.
- Git
- Node (V16)
  - Recommend to install it via NVM.
  - [Mac installation guide](https://collabnix.com/how-to-install-and-configure-nvm-on-mac-os/)
  - [Ubuntu installation guide](https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/)
- Yarn
  - [Installation guide](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- Docker

## Getting started 

- Clone code from this repository

	```
	git clone https://isgb.otago.ac.nz/info310/git/sutpu703/skill-matcher.git
	```

## Set up MongoDB with Docker
- At the root of the project run the following command
	```{bash}
	docker-compose up -d
	```

- There should be a MongoDB container named skill-matcher-mongo running. Use the following command to check.

	```{bash}
	docker ps
	```

**Default Configurations**
- `MONGO_INITDB_ROOT_USERNAME` is set to 'root'
- `MONGO_INITDB_ROOT_PASSWORD` is set to 'password'
- `MONGO_INITDB_DATABASE` is set to 'skill-matcher'

Notes: 
- these default configuration is compatible with the api configuration. So you can start developing without having to configure. 

## Set up the API

- Nagivate into the `api` folder
- Install all dependencies
	```{bash}
	yarn install
	```
- To configure the enviroment variable for the API, an configuration exmaple is provided in `example.env`. If you would like to use the default value you can copy the content of `example.env` into your `.env`

- To start the API in development mode use the following command.
	
	```{bash}
	yarn start:dev
	```
- If you use the default configurations the API will be running on `8080`

- To populate the database with all the necessary data run.

	```{bash}
	yarn migrate-mongo up
	```
- This command will initialise the API root user. If you are using the default configuration the `username` is set to 'root' and the `password` is set to 'password'

- To view the OpenAPI specification go to `/api-docs`


Notes: 
- Please make sure that the MongoDB container is running.
- Please make sure that you are using Node.Js V16 (Or Above)
