// Importer, Axios, dotenv, Express et utiliser le Router
const axios = require("axios");
require("dotenv").config();
const express = require("express");
const router = express.Router();

// Importer les models

// Créer les routes

// Création d'une route pour récupérer les comics
router.get("/comics", async (req, res) => {
  try {
    const { skip, limit, title } = req.query;
    let urlRequest = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`;

    if (skip) {
      urlRequest += `&skip=${skip}`;
    }
    if (limit <= 100) {
      urlRequest += `&limit=${limit}`;
    }
    if (title) {
      urlRequest += `&title=${title}`;
    }

    const response = await axios.get(urlRequest);
    const dataComics = response.data;
    res.status(200).json(dataComics);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});

// Création d'une route pour récupérer une liste de comics liés à un character
router.get("/comics/:characterId", async (req, res) => {
  try {
    if (req.params.characterId) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
      );
      const dataComicsOfChar = response.data;
      res.status(200).json(dataComicsOfChar);
    } else {
      res.status(400).json({ message: "Missing parameter characterId" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Création d'une route pour récupérer un comic à partir de son ID
router.get("/comic/:comicId", async (req, res) => {
  try {
    if (req.params.comicId) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.MARVEL_API_KEY}`
      );
      const dataComic = response.data;
      res.status(200).json(dataComic);
    } else {
      res.status(400).json({ message: "Missing parameter comicId" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Exporter les routes
module.exports = router;
