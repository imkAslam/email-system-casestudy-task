# Email Sync System

This is a Node.js application that syncs emails from Outlook and Gmail,
provides functionality to send emails, and allows users to flag important emails.

## Features

- OAuth authentication with Outlook
- Email synchronization 
- Send emails via Outlook
- Flag important emails

## Prerequisites

- Node.js (v18+)
- MongoDB
- Outlook Developer Account (for app registration)

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/imkAslam/email-system-casestudy-task
    cd email-system
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```
3. Set up environment variables. Create a `.env` file in the root of the project .env.example is added for sample.

4. Start the MongoDB server:

    ```bash
    mongod
    ```
5. Start the Node.js server:

    ```bash
    npm start
6. Start the dev mode Node.js server:

    ```bash
    npm run dev
    ```
## API Endpoints

- `GET /auth/outlook`: Authenticate with Outlook
- `GET /outlook/all`: get all the database stored emails
- `POST /emails/outlook/sync/:userId`: Sync emails from both providers
- `POST //outlook/send/:userId`: Send an email via Outlook
- `PUT /outlook/flag/:emailId`: Flag an email by its ID

### Authentication

- **Outlook Authentication**

    - Endpoint: `/auth/outlook`
    - Method: `GET`
    - Description: Redirects to Outlook for user authentication.
    - On success full login it will redirect to `/profile` you will get the user id there. copy that id to sync emails

### Emails

- **Sync Emails**

    - Endpoint: `/emails/outlook/sync/:userId`
    - Method: `POST`
    - Description: Sync emails from Outlook accounts.
    - Request Param:"userId": "user-id"

- **Send Email**

    - Endpoint: `/outlook/send/:userId`
    - Method: `POST`
    - Description: Send an email via Outlook SMTP.
    - Request Body:
      ```json
      {
        "to": "recipient-email",
        "subject": "email-subject",
        "body": "email-body"
      }
      ```
- **Flag Email**

    - Endpoint: `/outlook/flag/:emailId`
    - Method: `PUT`
    - emailId: `mongdb default id`
    - Description: Flag an email in the MongoDB database.

- **Db Emails**

    - Endpoint: `/outlook/all`
    - Method: `GET`
    - Description: Get all emails stored in the MongoDB database.

## Code Overview

### Main Files

- `index.js`: Main server file that sets up the Express server with database connection
- `app.js`: Main file that sets up the Express server, routes, and middleware.
- `models/UserSchema.js`: Mongoose model for storing user information.
- `models/EmailSchema.js`: Mongoose model for storing email information.
- `routes/authRoutes.js`: Routes for handling OAuth2 authentication.
- `routes/emailRoutes.js`: Routes for handling email-related actions.
- `controllers/authController.js`: Controller for handling auth-related actions.
- `controllers/emailController.js`: Controller for handling email-related actions.
- `services/outlookService.js`: Service for handling outlet-related business logic.
- `services/googleService.js`: Service for handling google-related business logic.
- `middlewares/passport.js`: Handle the oAuth for google and outlook.
- `config/*.js`: all system related config files and decalred here.
- `utils/*.js`: all system related common functions logic here.


### Authentication

- The system uses Passport.js for OAuth2 authentication with Google and Outlook.
The access tokens are stored in the MongoDB database and used for making API requests to fetch emails.

- Note:Currently oAuth is not working in this system while fetching the emails from outlook i was getting the jtw token code issues , so due to limited time i used the alternative to tha used ms oAuth api to make the system capable of using the oAUTH.


### System security 
- rate limiter used to restrict the multiple request its 100 requests per 15 mints
- CORS (Cross-Origin Resource Sharing) allows server to accept requests from different origins
- Helmet can protect against some well-known web vulnerabilities by setting HTTP headers appropriately
- 

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](http://www.passportjs.org/)
- [Google APIs Node.js Client](https://github.com/googleapis/google-api-nodejs-client)
- [Microsoft Graph JavaScript Client](https://github.com/microsoftgraph/msgraph-sdk-javascript)

## Note :
 - In the assigned task elastic search database was suggested to use , but due to setup and configuration issue i could use that instead i preferd the mongo database. both database are no sql database.
 
