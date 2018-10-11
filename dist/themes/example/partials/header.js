"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function header(options) {
    return ("<!DOCTYPE html></div>\n    <html>\n    <head>\n        <meta charset=\"utf-8\" />\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"/>\n        <title>" + options.title + "</title>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <link rel=\"stylesheet\" type=\"text/css\" media=\"screen\" href=\"/public/css/style.css\" />\n    </head>\n    <body>\n        <div class=\"react-app\">");
}
exports.default = header;
