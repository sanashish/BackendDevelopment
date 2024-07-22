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
  res.status(200).json({ message: "BD4.5_CW" });
});

// YOUR ENPOINTS GO HERE
// Exercise 1: Filter Movies by Year and Actor
async function filterMoviesByYearAndActor(releaseYear, actor) {
  let query = "SELECT * FROM movies WHERE release_year = ? AND actor = ?";
  let response = await db.all(query, [releaseYear, actor]);
  return { movies: response };
}
app.get("/movies/year-actor", async (req, res) => {
  let releaseYear = req.query.releaseYear;
  let actor = req.query.actor;
  try {
    let results = await filterMoviesByYearAndActor(releaseYear, actor);
    if (results.movies.length === 0) {
      return res.status(404).json({
        message:
          "No movies found for year " + releaseYear + " by actor " + actor,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Award Winning Movies
async function fetchAwardWinningMovies() {
  let query = "SELECT * FROM movies WHERE rating >=4.5 ORDER BY rating";
  let response = await db.all(query, []);
  return { movies: response };
}
app.get("/movies/award-winning", async (req, res) => {
  try {
    let results = await fetchAwardWinningMovies();
    if (results.movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No award winning movies found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Blockbuster Movies
async function fetchBlockbusterMovies() {
  let query =
    "SELECT * FROM movies WHERE box_office_collection>=100 ORDER BY box_office_collection DESC";
  let response = await db.all(query, []);
  return { movies: response };
}
app.get("/movies/blockbuster", async (req, res) => {
  try {
    let results = await fetchBlockbusterMovies();
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No blockbuster movies found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
