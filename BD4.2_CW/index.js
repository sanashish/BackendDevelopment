const express = require("express");
let cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

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
  res.status(200).json({ message: "BD4.2 CW - Error Handling" });
});

// YOUR ENPOINTS GO HERE

// Exercise 1: Get all moviess
async function fetchAllMovies() {
  let query = "SELECT * FROM movies";
  let response = await db.all(query, []);
  return { movies: response };
}
app.get("/movies", async (req, res) => {
  try {
    let result = await fetchAllMovies();
    if (result.movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Exercise 2: Fetch movies by genre
async function fetchMoviesByGenre(genre) {
  let query = "SELECT * FROM movies WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { movies: response };
}
app.get("/movies/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await fetchMoviesByGenre(genre);
    if (result.movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found with this Genre." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.messaage });
  }
});

// Exercise 3: Fetch movie by ID
async function fetchMovieDetailsById(id) {
  let query = "SELECT * FROM movies WHERE id = ?";
  let response = await db.get(query, [id]);
  return { movie: response };
}
app.get("/movies/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchMovieDetailsById(id);
    if (result.movie === undefined) {
      return res.status(404).json({ message: "No movie found." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Exercise 4: Fetch movie details by release_year
async function fetchMovieByReleaseYear(year) {
  let query = "SELECT * FROM movies WHERE release_year = ?";
  let response = await db.all(query, [year]);
  return { movies: response };
}
app.get("/movies/release-year/:year", async (req, res) => {
  try {
    let year = parseInt(req.params.year);
    let result = await fetchMovieByReleaseYear(year);
    if (result.movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found with this release year." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
