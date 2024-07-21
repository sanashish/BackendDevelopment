const express = require("express");
let cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const { error } = require("console");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4_HW2" });
});

// YOUR ENPOINTS GO HERE

// Exercise 1: Fetch All Artworks
async function fetchAllArtworks() {
  let query = "SELECT id, title, artist FROM artworks";
  let response = await db.all(query, []);
  return { artworks: response };
}
app.get("/artworks", async (req, res) => {
  try {
    let result = await fetchAllArtworks();
    if (result.artworks === 0) {
      return res.status(404).json({ message: "No artworks found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Artworks by Artist
async function fetchArtworksByArtist(artist) {
  let query = "SELECT id, title, artist, year FROM artworks WHERE artist = ?";
  let response = await db.all(query, [artist]);
  return { artworks: response };
}
app.get("/artworks/artist/:artist", async (req, res) => {
  let artist = req.params.artist;
  try {
    let result = await fetchArtworksByArtist(artist);
    if (result.artworks.length === 0) {
      return res
        .status(404)
        .json({ message: "No artworks found for artist " + artist });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Artworks by Year
async function fetchArtworksByYear(year) {
  let query = "SELECT id, title, artist, year FROM artworks WHERE year = ?";
  let response = await db.all(query, [year]);
  return { artworks: response };
}
app.get("/artworks/year/:year", async (req, res) => {
  let year = req.params.year;
  try {
    let result = await fetchArtworksByYear(year);
    if (result.artworks.length === 0) {
      return res
        .status(404)
        .json({ message: "No artworks found for year " + year });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch Artworks by Medium
async function fetchArtworksByMedium(medium) {
  let query = "SELECT id, title, artist, medium FROM artworks WHERE medium = ?";
  let response = await db.all(query, [medium]);
  return { artworks: response };
}
app.get("/artworks/medium/:medium", async (req, res) => {
  let medium = req.params.medium;
  try {
    let result = await fetchArtworksByMedium(medium);
    if (result.artworks.length === 0) {
      return res
        .status(404)
        .json({ message: "No artworks found for Medium " + medium });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
