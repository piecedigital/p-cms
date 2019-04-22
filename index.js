const fs = require("fs");
const cp = require("child_process");

try {
    cp.fork("./dist/app.js", [], {
        env: {}
    });
} catch (error) {
    console.error(error);
}
