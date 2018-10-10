module.exports = function SessionsADO(conn) {
  const _tableName = "tsessions";

  function getWhere(query) {
    if (query.id || query.dayOfTheWeek || query.film_id) {
      return (
        `where 1=1 ${query.id ? `and id=${query.id}` : ""}` +
        `${
          query.dayOfTheWeek ? `and dayOfTheWeek '${query.dayOfTheWeek}'` : ""
        }` +
        `${query.film_id ? `and film_id = ${query.film_id})` : ""}`
      );
    } else {
      return "";
    }
  }

  function select(parms, callback) {
    const query = `select * from ${_tableName} ${getWhere(
      parms
    )} order by dayOfTheWeek`;
    conn().query(query, callback);
  }

  function insert(parms, callback) {
    conn().query(`insert into ${_tableName} set ?`, parms, (err, result) => {
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

  return { select, insert, remove };
};
