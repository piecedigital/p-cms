const cp = require("child_process");
cp.fork("./dist/app.js", [], {
    env: {
        DB_NAME: "level2",
        DB_USER: "darryl",
        DB_PASS: "4dm1n",
        DB_PORT: 27017,
        THEME: "example"
    }
});