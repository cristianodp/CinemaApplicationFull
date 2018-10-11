function isEmpty(value) {
  if (value === undefined || value === null || value === "") {
    return true;
  }
  return false;
}

function getFile(path) {
  return new Promise((sucess, reject) => {
    var fs = require("fs");
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }
      sucess(data);
    });
  });
}

function getImageFile(name, recurcivo) {
  return new Promise((sucess, reject) => {
    getFile(`recourses/images/${name}.jpg`)
      .then(content => {
        sucess(content);
      })
      .catch(err => {
        if (recurcivo) {
          getImageFile("no_image", false)
            .then(content => sucess(content))
            .catch(err => reject(err));
        } else {
          reject(err);
        }
      });
  });
}

function createAuditorium(arq, purchases) {
  const lines = arq.split(/\r\n|\r|\n/);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return lines.map((it, idx) => {
    var arr = [];
    for (var pos = 1; pos <= it.length; pos++) {
      const obj = {};
      (obj.chair = letters[idx] + pos),
        (obj.isAvilable = isChairAvilable(obj.chair, purchases));
      arr.push(obj);
    }
    return arr;
  });
}

function getAuditorium(name, purchases) {
  return new Promise((sucess, reject) => {
    getFile(`recourses/auditoriums/${name}.txt`)
      .then(response =>
        sucess(createAuditorium(response.toString(), purchases))
      )
      .catch(reject);
  });
}

function isChairAvilable(chair, purchases) {
  return purchases.filter(it => it.chair === chair).length === 0;
}

const callbackLog = tag => (error, sucess) => {
  if (error) {
    console.log("error", tag, error);
  } else {
    console.log("sucess", tag, sucess);
  }
};

const closeConnection = (conn, tag) => {
  try {
    conn.end(callbackLog(tag));
  } catch (e) {
    console.log(tag, e);
  }
};

module.exports = {
  isEmpty,
  getFile,
  createAuditorium,
  getAuditorium,
  isChairAvilable,
  getImageFile,
  callbackLog,
  closeConnection
};
