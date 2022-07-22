require('dotenv').config();

const express = require("express");

const config = require("./src/config/config");

const app = express();


app.listen(config.app_port);

console.log(`Server funguje na porte ${config.app_port}`);

app.use(express.json({
    type:['application/json','text/plains']
}));


