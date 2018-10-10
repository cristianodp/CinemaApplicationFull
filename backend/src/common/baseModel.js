const SelectModel = ado => (req, res, next) => {
  const conn = require("../config/database")();
  ado(conn).select(req.body, (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.send(result);
  });
};

const InsertModel = ado => (req, res, next) => {
  const conn = require("../config/database")();
  ado(conn).insert(req.body, (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.send(result);
  });
};

module.exports = { InsertModel, SelectModel };
