const cp = require("child_process");
cp.fork("./dist/app.js", [], {
    env: {
        DB_NAME: "pds-cms",
        DB_USER: "darryl",
        DB_PASS: "4dmin",
        DB_AUTH: "admin",
        DB_PORT: 27017,
        THEME: "example"
    }
});