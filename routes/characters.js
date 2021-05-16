// Importer, Axios, dotenv, Express et utiliser le Router
const axios = require("axios");
require("dotenv").config();
const express = require("express");
const router = express.Router();

// Importer les models

// Créer les routes

// Création d'une route pour récupérer les characters
router.get("/characters", async (req, res) => {
  try {
    const { skip, limit, name } = req.query;
    let urlRequest = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`;

    if (skip) {
      urlRequest += `&skip=${skip}`;
    }
    if (limit <= 100) {
      urlRequest += `&limit=${limit}`;
    }
    if (name) {
      urlRequest += `&name=${name}`;
    }

    const response = await axios.get(urlRequest);
    const dataCharacters = response.data;
    res.status(200).json(dataCharacters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Exporter les routes
module.exports = router;
