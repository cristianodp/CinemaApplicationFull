const PDFDocument = require("pdfkit");
const fs = require("fs");

module.exports = function genereteOrderPDF(order, callback) {
  var fileName = `${Math.ceil(
    Math.random() * 10000
  )}-${new Date().getTime()}.pdf`;
  var doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(fileName));

  doc.fontSize(25).text("Order Detail", 230, 80);

  doc
    .lineCap("butt")
    .moveTo(600, 105)
    .lineTo(10, 105)
    .stroke();
  doc
    .font("Times-Roman", 14)
    .text("Movie", 100, 140)
    .text(order.name, { indent: 8 });

  doc
    .font("Times-Roman", 14)
    .text("Session", 400, 140)
    .text(order.dayOfTheWeek + " at " + order.time, { indent: 8 });

  doc
    .font("Times-Roman", 14)
    .text("Room", 100, 200)
    .text(order.room, { indent: 8 });

  doc
    .font("Times-Roman", 14)
    .text("Seats", 400, 200)
    .text(order.chairs, { indent: 8 });

  doc.fontSize(20).text("Transaction Detail", 230, 280);

  doc
    .lineCap("butt")
    .moveTo(600, 300)
    .lineTo(10, 300)
    .stroke();

  doc
    .font("Times-Roman", 14)
    .text("TransactionID", 100, 340)
    .text(order.transaction_id, { indent: 8 });

  doc
    .font("Times-Roman", 14)
    .text("Transaction Date", 400, 340)
    .text(new Date(order.transaction_date).toLocaleString(), { indent: 8 });

  doc
    .font("Times-Roman", 14)
    .text("Payment Method", 100, 400)
    .text("Credit Card", { indent: 8 });

  doc
    .font("Times-Roman", 14)
    .text("Total", 400, 400)
    .text(Number.parseFloat(order.total).toFixed(2), { indent: 8 });

  doc.end();

  callback(null, fileName);
};
