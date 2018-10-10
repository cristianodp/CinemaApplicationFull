module.exports = function PurchasesDAO(conn) {
  const _tableName = "titens_purchases";

  function getWhere(query) {
    if (query.id || query.purchase_id || query.session_id) {
      return (
        `where 1=1 ${query.id ? `and id=${query.id}` : ""}` +
        `${query.purchase_id ? `and purchase_id = ${query.purchase_id}` : ""}` +
        `${query.session_id ? `and session_id = ${query.session_id}` : ""}`
      );
    } else {
      return "";
    }
  }

  function select(parms, callback) {
    const query = `select * from ${_tableName} ${getWhere(parms)} order by id`;
    conn().query(query, callback);
  }

  function insert(parms, callback) {
    conn().query(`insert into ${_tableName} set ?`, parms, (err, sucess) => {
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

  return { select, remove, insert, select };
};
