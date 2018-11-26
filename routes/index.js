import express from "express";
import mysql from "mysql";

const router = express.Router();
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lapetete",
  database: "music"
});

connection.connect(err => {
  if (err) {
    console.log("Error : ", err);
  } else {
    console.log("Connecté ! ");
  }
});

router.get("/", (req, res) => {
  res.json({
    title: "Express"
  });
});
// SELECTIONNE LA TOTALITÉ DE LA BDD //
router.get("/group", (req, res) => {
  connection.query("SELECT * from metalgroup", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des employés");
    } else {
      res.json(results);
    }
  });
});

//SELECTIONNE SEULEMENT LES NOMS //
router.get("/group/name", (req, res) => {
  connection.query("SELECT name from metalgroup", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des employés");
    } else {
      res.json(results);
    }
  });
});

//SELECTIONNE SEULEMENT VIA LE FILTRE APPLIQUÉ ===> caractère en params //
router.get("/groupe/:filter", (req, res) => {
  let filter = `${req.params.filter}`;

  connection.query(
    "SELECT * FROM metalgroup WHERE name LIKE ?",
    [filter],
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send("Erreur lors de la récupération du filtre du groupe");
      } else {
        res.json(results);
      }
    }
  );
});

// SELECTIONNE SEULEMENT VIA LE FILTRE APPLIQUE ===> comprenant une chaine de caracère //
router.get("/groupe/a/str", (req, res) => {
  connection.query(
    'SELECT * FROM metalgroup WHERE name LIKE  "%ct%"',
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send("Erreur lors de la récupération du filtre du groupe");
      } else {
        res.json(results);
      }
    }
  );
});

router.get("/gr/filt/date/date", (req, res) => {
  connection.query(
    'SELECT * FROM metalgroup WHERE  date > "2004-03-01"',
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send("Erreur lors de la récupération du filtre du groupe");
      } else {
        res.json(results);
      }
    }
  );
});

router.get("/grou/filt/date/asc", (req, res) => {
  connection.query(
    "SELECT * FROM metalgroup ORDER BY name ASC",
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send("Erreur lors de la récupération du filtre du groupe");
      } else {
        res.json(results);
      }
    }
  );
});

router.post("/music/inser", (req, res) => {
  const formData = req.body;

  connection.query("INSERT INTO metalgroup SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un groupe");
    } else {
      res.sendStatus(200);
    }
  });
});

router.put("/api/metalgroup/bool/:id", (req, res) => {
  const idgroup = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE metalgroup SET ontour= ?  WHERE id = ?",
    [formData, idgroup],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un groupe");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.delete("/api/mg/del/:id", (req, res) => {
  const idgroupe = req.params.id;

  connection.query("DELETE FROM metalgroup WHERE id = ?", [idgroupe], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un groupe");
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete("/api/megr/del/all", (req, res) => {
  

  connection.query("DELETE FROM metalgroup WHERE ontour = false", err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un groupe");
    } else {
      res.sendStatus(200);
    }
  });
});

export default router;
