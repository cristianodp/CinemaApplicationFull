const FilmsADO = require("./filmsDAO");
const SessionsADO = require("./sessionsADO");
//const { callbackLog, closeConnection } = require("../common/utils");

const clearDataBase = conn => callback => {
  FilmsADO(conn).trucate(callback);
};

const LoadFilmsFromFileModel = (req, res, next) => {
  if (!req.files) {
    return res.status(400).send("file is required");
  }

  extractFilmsFormFile(req.files.file.path, (err, filmJson) => {
    if (err || !filmJson || filmJson.length === 0) {
      return res.status(400).send(err);
    }

    if (filmJson.length === undefined || filmJson.length === 0) {
      return res.status(500).json({ errors: "array no informed" });
    }

    const conn = require("../config/database")();

    clearDataBase(conn)((err1, sucess1) => {
      if (err1) {
        res.status(400).send(err1);
        //closeConnection(conn,"LoadFilmsFromFileModel")
        return;
      }

      let control = 0;
      let aux = 0;
      filmJson.forEach(it => {
        FilmsADO(conn).insert({ name: it.name }, (err2, sucess2) => {
          if (err2) {
            res.status(400).send(err2);
            //closeConnection(conn,"LoadFilmsFromFileModel")
            return;
          }

          it.sessions.forEach(sess => {
            control += 1;
            console.log("sucess2[0]", sucess2[0]);
            SessionsADO(conn).insert(
              { ...sess, film_id: sucess2[0].id },
              (err3, sucess3) => {
                control -= 1;
                if (err3 && aux === 0) {
                  aux = 1;
                  //closeConnection(conn,"GetSessionOcupation")
                  res.status(400).send(err3);
                  return;
                }
                if (control <= 0 && aux === 0) {
                  aux = 1;
                  //closeConnection(conn,"GetSessionOcupation")
                  res.status(200).send(true);
                }
              }
            );
          });
        });
      });
    });
  });
};

const sequenceDayOfTheWeek = value => {
  let seq = 0;
  switch (value.toUpperCase()) {
    case "MO":
      seq = 0;
      break;
    case "DI":
      seq = 1;
      break;
    case "MI":
      seq = 2;
      break;
    case "DO":
      seq = 3;
      break;
    case "FR":
      seq = 4;
      break;
    case "SA":
      seq = 5;
      break;
    case "SO":
      seq = 6;
      break;
    default:
      break;
  }
  return seq;
};

const getDaysOfDayWeekFullName = value => {
  let day = value;
  switch (value.toUpperCase()) {
    case "MO":
      day = "Monday";
      break;
    case "DI":
      day = "Tuesday";
      break;
    case "MI":
      day = "Wednesday";
      break;
    case "DO":
      day = "Thursday";
      break;
    case "FR":
      day = "Friday";
      break;
    case "SA":
      day = "Saturday";
      break;
    case "SO":
      day = "Sunday";
      break;
    default:
      break;
  }
  return day;
};

const extractFilmsFormFile = (path, callback) => {
  var fs = require("fs");
  fs.readFile(path, function(err, data) {
    if (err) return callback(err, null);
    else {
      try {
        const arq = data.toString();
        const lines = arq.split(/\r\n|\r|\n/);
        var films = [];
        lines.forEach(line => {
          let film = {};
          const columns = line.split(";");
          film.name = columns[0];
          film.sessions = [];
          columns[1].split(",").forEach(element => {
            let session = {};

            const attributes = element.split("/");

            const dayOfTheWeek = getDaysOfDayWeekFullName(attributes[0]);

            session.seq = sequenceDayOfTheWeek(attributes[0]);
            session.time = attributes[1];
            session.room = attributes[2];
            session.price = attributes[3];
            session.dayOfTheWeek = dayOfTheWeek;

            film.sessions.push(session);
          });

          films.push(film);
        });
      } catch (error) {
        return callback(error, null);
      }
      return callback(null, films);
    }
  });
};

module.exports = {
  LoadFilmsFromFileModel,
  extractFilmsFormFile,
  sequenceDayOfTheWeek
};
