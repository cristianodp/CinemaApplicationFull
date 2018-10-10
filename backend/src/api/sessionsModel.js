const SessionsADO = require("../api/sessionsADO");
const { SelectModel, InsertModel } = require("../common/baseModel");
const InsertSession = InsertModel(SessionsADO);
const SelectSession = SelectModel(SessionsADO);

const { getAuditorium, closeConnection } = require("../common/utils");

const GetSessionOcupation = (req, res, next) => {
  const PurchasesDAO = require("./itensPurchasesDAO");
  const conn = require("../config/database")();
  SessionsADO(conn).select({ id: req.query.session_id }, (errr, session) => {
    if (errr || session.length === 0) {
      //closeConnection(conn,"GetSessionOcupation")

      req.status(500).send(errr || "session no data found");
      return;
    }

    PurchasesDAO(conn).select(
      { session_id: req.query.session_id },
      (err, purchases) => {
        getAuditorium(session[0].room, purchases)
          .then(response => {
            //closeConnection(conn,"GetSessionOcupation")
            res.json(response);
          })
          .catch(error => {
            //closeConnection(conn,"GetSessionOcupation")
            res.status(500).json(error);
          });
      }
    );
  });
};

module.exports = { InsertSession, SelectSession, GetSessionOcupation };
