const mysql = require("mysql");
const { callbackLog } = require("../common/utils");
const {
  MYSQL_URI_TEST,
  MYSQL_URI_PROD,
  MYSQL_USER,
  MYSQL_PASSWD,
  MYSQL_DATA_BASE
} = require("../.env");

module.exports = function DataBase() {
  function getInstanceDB() {
    return mysql.createConnection({
      host: MYSQL_URI_PROD,
      user: MYSQL_USER,
      password: MYSQL_PASSWD,
      database: MYSQL_DATA_BASE,
      multipleStatements: true
    });
  }

  function query(sql, callback) {
    const conn = getInstanceDB();
    conn.connect(err => {
      if (err) {
        callback(err);
      }
      conn.query(sql, (err, result) => {
        conn.end(callbackLog("close connection database"));
        if (err) {
          callback(err);
          return;
        }
        callback(null, result);
      });
    });
  }

  function exec(sql, parms, callback) {
    const conn = getInstanceDB();
    conn.connect(err => {
      if (err) {
        callback(err);
      }
      conn.query(sql, parms, (err, result) => {
        conn.end(callbackLog("close connection database"));
        if (err) {
          callback(err);
          return;
        }
        callback(null, result);
      });
    });
  }

  return { query, exec };
};
