import { renderOptions } from "../../modules/render";

export default function header(options: renderOptions) {
    return (`<!DOCTYPE html></div>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <title>${options.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="/public/css/style.css" />
    </head>
    <body>
        <div class="react-app">`)
}