module.exports = function FilmsDAO() {
  const conn = require("../config/database");
  const _tableName = "tfilms";

  function getWhere(query) {
    if (query.id || query.name) {
      return `where 1=1 ${query.id ? `and id=${query.id}` : ""} ${
        query.name ? `and UPPER(name) like UPPER('${query.name}')` : ""
      }`;
    } else {
      return "";
    }
  }

  function select(parms, callback) {
    const query = `select * from ${_tableName} ${getWhere(
      parms
    )} order by name`;
    conn().query(query, callback);
  }

  function execQuery(query, callback) {
    conn().query(query, callback);
  }

  function insert(parms, callback) {
    conn().exec(`insert into ${_tableName} set ?`, parms, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      select({ id: result.insertId }, callback);
    });
  }

  function remove(parms, callback) {
    const query = `delete from ${_tableName} ${getWhere(parms)}`;
    conn().query(query, callback);
  }

  function trucate(callback) {
    const query = `delete from tsessions where id > -1; delete from tfilms where id > -1; delete from tpurchases where id > -1; delete from titens_purchases where id > -1;`;
    conn().query(query, callback);
  }

  return { trucate, remove, insert, execQuery, select };
};
