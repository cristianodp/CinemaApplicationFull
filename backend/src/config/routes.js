const express = require("express");

const {
  InsertFilm,
  SelectFilm,
  selectFilmsAndSessions,
  getFilmPoster
} = require("../api/filmsModel");

const {
  InsertSession,
  SelectSession,
  GetSessionOcupation
} = require("../api/sessionsModel");

const {
  InsertPurchases,
  SelectPurchases,
  ProcessTransaction,
  GenerateOrderPDF
} = require("../api/purchasesModel");

const {
  InsertItensPurchases,
  SelectItensPurchases
} = require("../api/itensPurchasesModel");

const { LoadFilmsFromFileModel } = require("../api/adminModel");

module.exports = function(server) {
  const routerAPI = express.Router();
  server.use("/api", routerAPI);

  routerAPI.get("/film", SelectFilm);
  routerAPI.get("/film/poster", getFilmPoster);
  routerAPI.get("/filmsAndSessions", selectFilmsAndSessions);
  routerAPI.post("/film", InsertFilm);

  routerAPI.post("/session", InsertSession);
  routerAPI.get("/session", SelectSession);
  routerAPI.get("/sessionOcupation", GetSessionOcupation);

  routerAPI.post("/purchase", InsertPurchases);
  routerAPI.get("/purchase", SelectPurchases);
  routerAPI.post("/purchase/payment", ProcessTransaction);
  routerAPI.get("/purchase/orderDetail", GenerateOrderPDF);

  routerAPI.post("/item", InsertItensPurchases);
  routerAPI.get("/item", SelectItensPurchases);

  routerAPI.post("/loadFilmsByFile", LoadFilmsFromFileModel);
};
