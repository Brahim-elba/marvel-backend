// Importer express, express-formidable, cors
const express = require("express");
const expressFormidable = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

// Initialiser le serveur et utiliser Express-Formidable et Cors
const app = express();
app.use(expressFormidable());
app.use(cors());

// Importer les routes
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
app.use(charactersRoutes);
app.use(comicsRoutes);

// Création d'une requête vers les routes inexistantes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Il n'y a rien par là l'ami ! 😎" });
});

// Ecouter un port
app.listen(process.env.PORT, () => {
  console.log("Server started ! 😎");
});
