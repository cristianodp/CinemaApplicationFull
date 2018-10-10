const ItensPurchasesDAO = require("./itensPurchasesDAO");
const { SelectModel, InsertModel } = require("../common/baseModel");
const InsertItensPurchases = InsertModel(ItensPurchasesDAO);
const SelectItensPurchases = SelectModel(ItensPurchasesDAO);

module.exports = { InsertItensPurchases, SelectItensPurchases };
