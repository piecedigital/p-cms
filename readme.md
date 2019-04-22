# Piece Digital CMS

## Getting Started

### Dependencies

1. [MongoDB](https://www.mongodb.com/download-center/community)
1. [NodeJS](https://nodejs.org/)

### Install MongoDB

1. Download and install [MongoDB](https://www.mongodb.com/download-center/community)
1. Start MongoDB: `mongod`
1. Connect to MongoDB server: `mongo`
1. Switch to admin database: `use admin`
1. Create admin user (has access to every database on the server)

    ``` mongodb
      db.createUser(
        {
          user: "<username>",
          pwd: "<password>",
          roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
        }
      )
    ```

1. Switch to `<your database name>`: `use <your database name>`
1. Create database user (for the database you want to use for the CMS)

    ``` mongodb
      db.createUser(
        {
          user: "<username>",
          pwd: "<password>",
          roles: [ { role: "userAdmin", db: "<database>" }, "readWrite" ]
        }
      )
    ```

1. Restart MongoDB with access control: `mongod --auth`

In order to connect to the database with authentication enabled use this command and use your admin logins: `mongo -u "<username>" -p "<password>" --authenticationDatabase "admin"`

**NOTE**: Be sure to change the credentials in `index.js`.

### Install NodeJS

1. Download and install [NodeJS](https://nodejs.org/)

### Install the server

1. Download the repo
1. Install dependencies with `npm install`

### Start the server

1. Do it: `npm start`

**NOTE**: Currently, starting the server will create an admin user **(username is `admin`, password is `password`)** to access the dashboard. In the future there will be a proper way of setting up an admin user.

## The Dashboard

/pc_admin