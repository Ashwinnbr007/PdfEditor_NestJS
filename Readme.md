# Pdf Editor - Assignment

## Step 1

### Run the backend 

1. Open terminal 
2. `cd backend/`
3. `npm run start:dev`

This will run the server on localhost:4000

The api calls are made on localhost:4000/files

To test if the api is working, you can make a get request to localhost:4000/ and you will get "Hello world" as response.

## Step 2
### Run the frontend

1. Open terminal 
2. `cd frontend/`
3. `npm run start`

## Step 3 
### Connect your postgres

1. Open terminal 
2. `cd backend/src/app.module.ts`
3. In the @Module decorator, edit the parameters to configure to your specific postgres credentials.

You can verify if your postgresDB is connected by running the backend server. If the backend runs without any errors, you can assume that your postgresDB has no issues in connection else, you will get a specific error from postgres in your backend.