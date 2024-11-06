Next.js Passkey Authentication Example
======================================

Welcome to the **Next.js Passkey Authentication** project! This is a simple Next.js application that demonstrates passwordless authentication using **passkeys**. With this app, users can register and log in securely with passkeys instead of traditional passwords, utilizing the WebAuthn standard and leveraging the `simplewebauthn` package for easier integration.

Features
--------

*   **Passwordless Authentication**: Users authenticate using passkeys, offering a seamless and secure login experience.
*   **WebAuthn Integration**: Uses the WebAuthn standard for handling passkey-based registration and authentication.
*   **SQLite Database**: Stores user and credential data in a SQLite database, making it easy to set up and run locally.
*   **Prisma ORM**: Manages database interactions with Prisma, simplifying data handling.

Tech Stack
----------

*   **Next.js**: The framework for building the React application.
*   **simplewebauthn**: A library for handling WebAuthn interactions on both the client and server.
*   **Prisma**: An ORM for managing database interactions with SQLite.
*   **SQLite**: A lightweight database used for storing user and passkey data.

Getting Started
---------------

### Prerequisites

Ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [npm](https://www.npmjs.com/) (usually included with Node.js)

### Installation

1.  **Clone the repository**:
    
    bash
    
    Copy code
    
    `git clone https://github.com/ilyaskarim/NextjsPassKeyAuth.git cd NextjsPassKeyAuth`
    
2.  **Install dependencies**:
    
    bash
    
    Copy code
    
    `npm install`
    
3.  **Set up Prisma and SQLite database**:
    
    Initialize the SQLite database and generate the Prisma client:
    
    bash
    
    Copy code
    
    `npx prisma migrate dev --name init`
    
    This will create a new SQLite database and apply the initial schema, setting up tables to store user and passkey data.
    
4.  **Environment Variables**:
    
    Create a `.env` file in the root directory with the following contents:
    
    plaintext
    
    Copy code
    
    `NEXT_PUBLIC_ORIGIN=http://localhost:3000`
    
    Make sure to configure any other environment variables if required by your setup.
    
5.  **Run the development server**:
    
    bash
    
    Copy code
    
    `npm run dev`
    
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.
    

### Project Structure

*   **pages/api/auth/**: Contains API routes for handling registration and login via WebAuthn.
*   **lib/db.js**: Handles database interactions, including retrieving and storing user and credential data.
*   **components/**: React components used for building the UI.
*   **styles/**: Contains Tailwind CSS files for styling.

Usage
-----

1.  **Register a New User**: Enter your email and follow the prompts to create a passkey.
2.  **Authenticate with Passkey**: Once registered, use your passkey to log in without a password.

### Example Flow

1.  **Registration**:
    
    *   The client requests a registration challenge from the server.
    *   The user’s device creates a passkey and sends the credential data back to the server.
    *   The server verifies and saves the credential data in the database.
2.  **Login**:
    
    *   The client requests an authentication challenge from the server.
    *   The user authenticates with their device, sending the response back to the server.
    *   The server verifies the response and grants access.

Customization
-------------

*   **Configure Database**: Adjust the Prisma schema (in `prisma/schema.prisma`) to fit your specific needs.
*   **Tailwind CSS**: Customize the styling in `tailwind.config.js` and `styles/globals.css` as desired.

Troubleshooting
---------------

*   **RP ID and Origin Mismatch**: Ensure that your `RP ID` is set to `"localhost"` in the development environment and `expectedOrigin` is `"http://localhost:3000"`.
*   **Database Errors**: Make sure to run `npx prisma migrate dev` if you make changes to the schema.

Future Improvements
-------------------

*   **Production Setup**: Add configurations for production deployment.
*   **Support for More Databases**: Easily switch to PostgreSQL, MySQL, etc., by updating the Prisma schema and `.env` configurations.
*   **Enhanced Error Handling**: Improve error messages and handling across API routes.

Contributing
------------

Feel free to submit issues or pull requests if you have suggestions for improvement!

License
-------

This project is licensed under the MIT License.

* * *