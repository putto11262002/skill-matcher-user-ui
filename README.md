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
	```
	docker-compose up -d
	```

- There should be a MongoDB container named skill-matcher-mongo running. Use the following command to check.

	```
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
	```
	yarn install
	```
- To configure the enviroment variable for the API, an configuration exmaple is provided in `example.env`. If you would like to use the default value you can copy the content of `example.env` into your `.env`

- To start the API in development mode use the following command.
	
	```
	yarn start:dev
	```
- If you use the default configurations the API will be running on `8080`

- To populate the database with all the necessary data run.

	```
	yarn migrate-mongo up
	```
- This command will initialise the API root user. If you are using the default configuration the `username` is set to 'root' and the `password` is set to 'password'

- To view the OpenAPI specification go to `/api-docs`


Notes: 
- Please make sure that the MongoDB container is running.
- Please make sure that you are using Node.Js V16 (Or Above)
- 

## Front-end techniques
### Fetching data

We are using React Query to fetch data. The documentation could be found [here](https://tanstack.com/query/v3/docs/react/overview)

- Query data ([documentation](https://tanstack.com/query/v3/docs/react/guides/queries))
	- `useQuery` is used to retreive data from the servere, e.g. get list of users.
- Mutate data ([documentation](https://tanstack.com/query/v3/docs/react/guides/mutations)) 
	- `useMutate` is used to mutate data on the servert. This includes creating new resource or update resource on the server.

### Authentication

- Sign in

	```
	const dispatch = useDispatch()
	
	// indicate the status of sign in
	const {loading, error} = useSelector(state => state.auth)
	
	// call this any where in the component
	dispatch(signIn({usernameOrEmail: <username or email>, password: <password>}))
	
	```

- Sign out
	```
	const dispatch = useDispatch()
	
	// indicate the status of sign out
	const {loading, error} = useSelector(state => state.auth)
	
	// call this any where in the component
	dispatch(signOut())
	```

- Get app authentication state

	```
	const {user, isLoggedIn, loading, loading, error} = useSelector(state => state.auth)
	```
	- `user` an object that contain information about the current user e.g. _id, username, role
	- `isLoggedIn` a boolean indicating if the current user is logged in
	- `loading` indicating if the user is signing in or signing out
	- `error` contain an error that occur during sign in or sign out, if no error occur it is set to `null`
