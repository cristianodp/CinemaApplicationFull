const conn = require("mysql");
const {
  MYSQL_URI_TEST,
  MYSQL_URI_PROD,
  MYSQL_USER,
  MYSQL_PASSWD,
  MYSQL_DATA_BASE
} = require("../.env");

var instanceDB = function() {
  return conn.createConnection({
    host: MYSQL_URI_PROD,
    user: MYSQL_USER,
    password: MYSQL_PASSWD,
    database: MYSQL_DATA_BASE,
    multipleStatements: true
  });
};

module.exports = function() {
  return instanceDB;
};
