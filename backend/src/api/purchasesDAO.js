module.exports = function PurchasesDAO() {
  const conn = require('../config/database') 
  const _tableName = "tpurchases";

  function getWhere(query) {
    if (query.id || query.customer_name) {
      return `where 1=1 ${query.id ? `and id=${query.id}` : ""} ${
        query.customer_name
          ? `and UPPER(customer_name) like UPPER('${query.customer_name}')`
          : ""
      }`;
    } else {
      return "";
    }
  }

  function select(parms, callback) {
    const query = `select * from ${_tableName} ${getWhere(
      parms
    )} order by customer_name`;
    conn().query(query, callback);
  }

  function execQuery(query, callback) {
    conn().query(query, callback);
  }

  function insert(parms, callback) {
    conn().exec(`insert into ${_tableName} set ?`, parms, (err, sucess) => {
      if (err) {
        callback(err, null);
        return;
      }
      select({ id: sucess.insertId }, callback);
    });
  }

  function remove(parms, callback) {
    const query = `delete from ${_tableName} ${getWhere(parms)}`;
    conn().query(query, callback);
  }

  return { remove, insert, execQuery, select };
};
