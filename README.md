# Node.js Project · Romain Allemand

## Project Overview

This project is a Node.js application built with the HapiJS framework.
The application provides an API that can be used to perform various operations on users and movies.

## Requirements

- Node.js
- npm
- Docker (optional)

## Installation

Follow the steps below to install and set up the project:

1. Clone the repository using the following command:

    ```bash
    git clone https://github.com/RomainAll/ar-node-project.git
    ```
2. Navigate to the project directory.

3. Install the dependencies using the following command:

    ```bash
    npm install
    ```
4. If you are using Docker, you can run the following command to start a MySQL container:

   ```bash 
    docker run -p 3306:3306 --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d mysql:5
   ```

5. Configure mailer by using https://ethereal.email for example.
   Create an account and copy the credentials in the .env file.

6. Create a file .env at the root of the project and add the following environment variables to it:

   ```env
   # Database configuration, change the values if you are not using Docker or if you have changed the default values
   DB_HOST='0.0.0.0'
   DB_USER='root' 
   DB_PASSWORD='hapi'
   DB_DATABASE='user'
   
   # Credentials provided by ethereal.email
   MAIL_HOST='smtp.ethereal.email' 
   MAIL_PORT=587 
   MAIL_USER='<username>' 
   MAIL_PASS='<password>'
   ```

7. Start the server by running the command:

    ```bash
    npm start
    ```

8. You can now access the API at http://localhost:3000/documentation.

---
**NOTE**

To make your first user an admin, you can make the change directly in the database.

---

## Usage

The API provides the following endpoints:

1. User endpoints:
- `GET /users` - Returns a list of all users.
- `GET /user/{id}` - Returns the user with the specified ID.
- `POST /user` - Creates a new user.
- `PATCH /user/{id}` - Updates the user with the specified ID.
- `DELETE /user/{id}` - Deletes the user with the specified ID.
- `POST /user/login` - Log in to a user.
- `GET /user/{userId}/favorites` - Returns a list of all the movies that the user with the specified ID has favorited.

2. Movie endpoints:
- `GET /movies` - Returns a list of all movies.
- `GET /movie/{id}` - Returns the movie with the specified ID.
- `POST /movie` - Creates a new movie.
- `PATCH /movie/{id}` - Updates the movie with the specified ID.
- `DELETE /movie/{id}` - Deletes the movie with the specified ID.
- `POST /movie/{movieId}/favorite` - Add movie with specified ID to favorites of logged in user.
- `DELETE /movie/{movieId}/favorite` - Remove movie with specified ID from favorites of logged in user.

