## Admin Route
/pc_admin

## Create Admin User
1. Start MongoDB `mongod`
2. Connect to MongoDB server `mongo`
3. Switch to admin database `use admin`
4. Create admin user
```
   db.createUser(
     {
       user: "<username>",
       pwd: "password",
       roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
     }
   )
```
5. Restart MongoDB with access control `mongod --auth`
6. Connect and auth as admin user `mongo -u "<username>" -p "<password>" --authenticationDatabase "admin"`