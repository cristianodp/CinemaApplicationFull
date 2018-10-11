const SessionsADO = require("../api/sessionsADO");
const { SelectModel, InsertModel } = require("../common/baseModel");
const InsertSession = InsertModel(SessionsADO);
const SelectSession = SelectModel(SessionsADO);

const { getAuditorium } = require("../common/utils");

const GetSessionOcupation = (req, res, next) => {
  const PurchasesDAO = require("./itensPurchasesDAO");

  SessionsADO().select({ id: req.query.session_id }, (errr, session) => {
    if (errr || session.length === 0) {
      req.status(500).send(errr || "session no data found");
      return;
    }

    PurchasesDAO().select(
      { session_id: req.query.session_id },
      (err, purchases) => {
        getAuditorium(session[0].room, purchases)
          .then(response => {
            res.json(response);
          })
          .catch(error => {
            res.status(500).json(error);
          });
      }
    );
  });
};

module.exports = { InsertSession, SelectSession, GetSessionOcupation };
