const PurchasesDAO = require("../api/purchasesDAO");
const ItensPurchasesDAO = require("./itensPurchasesDAO");
const { SelectModel, InsertModel } = require("../common/baseModel");
const OrderPdf = require("../common/orderPdf");
const InsertPurchases = InsertModel(PurchasesDAO);
const SelectPurchases = SelectModel(PurchasesDAO);

const { isEmpty } = require("../common/utils");

const ProcessTransaction = (req, res, next) => {
  
    const {
    customerName,
    cardNumber,
    expireDate,
    film_id,
    code,
    sessionId,
    total,
    room,
    chairs
  } = req.body;

  if (
    isEmpty(customerName) ||
    isEmpty(cardNumber) ||
    isEmpty(expireDate) ||
    isEmpty(code) ||
    isEmpty(sessionId) ||
    isEmpty(total) ||
    isEmpty(chairs) ||
    isEmpty(film_id)
  ) {
    res.status(500).send({ errors: "invalid payment" });
    return;
  }

  const chairs2 = typeof chairs === "string" ? chairs.split(",") : chairs;

  var objPayment = {
    customer_name: customerName,
    banner: "master",
    film_id: film_id,
    card_number: cardNumber,
    transaction_id: Math.ceil(Math.random() * 39823),
    authorization: Math.ceil(Math.random() * 39823),
    transaction_date: new Date().toISOString()
  };

  PurchasesDAO().insert(objPayment, (err, result) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    const purchase_id = result[0].id;
    const sessId = sessionId;
    let arrPromises = [];
    chairs2.forEach(chair => {
      arrPromises.push(
        new Promise((resolve, reject) => {
          const objIt = {};
          objIt.purchase_id = purchase_id;
          objIt.chair = chair;
          objIt.session_id = sessId;
          objIt.total = total;
          ItensPurchasesDAO().insert(objIt, (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        })
      );
    });

    Promise.all(arrPromises)
      .then(response => {
        res.json({ purchase_id, response });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
};

const GenerateOrderPDF = (req, res, next) => {

  const query =
    "select fil.name " +
    " , se.dayOfTheWeek " +
    " , se.time " +
    " , se.room " +
    " , se.price " +
    " , count(1) *  se.price total " +
    " , p.banner " +
    " , p.card_number " +
    " , p.transaction_date " +
    " , p.transaction_id " +
    " , p.authorization " +
    " , GROUP_CONCAT(it.chair ORDER BY it.id ASC) chairs" +
    " from titens_purchases it " +
    "    , tpurchases p " +
    "    , tsessions se " +
    "    , tfilms fil " +
    " where p.id = it.purchase_id " +
    "   and se.id = it.session_id " +
    "   and se.film_id = fil.id " +
    "   and p.id = " +
    req.query.purchase_id +
    " group by fil.name " +
    "        , se.dayOfTheWeek " +
    "        , se.time " +
    "        , se.room " +
    "        , se.price" +
    "        , p.banner" +
    "        , p.card_number " +
    "        , p.transaction_date " +
    "        , p.transaction_id " +
    "        , p.authorization ";

  PurchasesDAO().execQuery(query, (err, secess) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    if (secess.length === 0) {
      res.status(404).send("no data found");
      return;
    }

    OrderPdf(secess[0], (err1, fileName) => {
      if (err1) {
        res.status(500).send(err1);
        return;
      }
      setTimeout(() => {
        const fs = require("fs");
        fs.readFile(fileName, function(err, content) {
          if (err) {
            res.status(404).send(err);
          } else {
            //specify the content type in the response will be an image
            res.writeHead(200, { "Content-type": "application/pdf" });
            res.end(content);
          }
        });
      }, 1000);
    });
  });
};

module.exports = {
  InsertPurchases,
  SelectPurchases,
  ProcessTransaction,
  GenerateOrderPDF
};
