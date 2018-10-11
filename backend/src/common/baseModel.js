const SelectModel = ado => (req, res, next) => {
  ado().select(req.body, (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.send(result);
  });
};

const InsertModel = ado => (req, res, next) => {
  
  ado().insert(req.body, (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.send(result);
  });
};

module.exports = { InsertModel, SelectModel };
