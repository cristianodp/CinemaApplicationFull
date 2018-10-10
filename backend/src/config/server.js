const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const connectMultiparty = require("connect-multiparty");
const allowCors = require("./cors");

var server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(connectMultiparty());
server.use(allowCors);
server.use(methodOverride());

module.exports = server;
