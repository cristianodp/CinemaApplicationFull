const FilmsDAO = require("../api/filmsDAO");
const { SelectModel, InsertModel } = require("../common/baseModel");
const InsertFilm = InsertModel(FilmsDAO);
const SelectFilm = SelectModel(FilmsDAO);
const { getImageFile } = require("../common/utils");

const selectFilmsAndSessions = (req, res, next) => {
  const conn = require("../config/database")();
  const query =
    "select fil.id filmId " +
    "     , fil.name " +
    "     , sess.* " +
    "  from tsessions sess" +
    "     , tfilms fil" +
    " where fil.id = sess.film_id " +
    `${
      req.query.name ? ` and upper(name) like upper('%${req.query.name}%')` : ""
    }` +
    " order by  fil.id ,seq,time";
  FilmsDAO(conn).execQuery(query, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }

    let nArr = breakArrayByNodos(result);

    res.status(200).send(nArr);
  });
};

function breakArrayByNodos(array) {
  try {
    if (array === undefined || array === null) {
      return;
    }

    let nArr = [];
    let bFilm = "";
    let bSeq = "";
    let idxFil = -1;
    let idxSeq = -1;
    let idxSess = -1;
    for (var i = 0; i < array.length; i++) {
      if (bFilm !== array[i].filmId) {
        idxFil++;
        idxSeq = -1;
        idxSess = -1;
        bFilm = array[i].filmId;
        nArr[idxFil] = {};
        nArr[idxFil].filmId = array[i].filmId;
        nArr[idxFil].name = array[i].name;
        nArr[idxFil].schedules = [];
      }

      if (bSeq !== array[i].seq) {
        idxSeq++;
        idxSess = -1;
        bSeq = array[i].seq;
        nArr[idxFil].schedules[idxSeq] = {};
        nArr[idxFil].schedules[idxSeq].seq = array[i].seq;
        nArr[idxFil].schedules[idxSeq].dayOfTheWeek = array[i].dayOfTheWeek;

        nArr[idxFil].schedules[idxSeq].sessions = [];
      }
      idxSess++;
      nArr[idxFil].schedules[idxSeq].sessions[idxSess] = { ...array[i] };
    }

    return nArr;
  } catch (error) {
    console.log("breakArrayByNodos", error);
    return [];
  }
}

const getFilmPoster = (req, res, next) => {
  getImageFile(req.query.name, true)
    .then(content => {
      res.writeHead(200, { "Content-type": "image/jpg" });
      res.end(content);
    })
    .catch(err => {
      res.writeHead(400, { "Content-type": "text/html" });
      console.log(err);
      res.end("No such image");
    });
};

module.exports = {
  InsertFilm,
  SelectFilm,
  selectFilmsAndSessions,
  getFilmPoster
};
