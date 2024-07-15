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
  res.status(200).json({ message: "BD4.1 CW - SQL Queries & async/await" });
});

// YOUR ENPOINTS GO HERE

// Exercise 1: Fetch all movies
async function fetchAllMovies() {
  let query = "SELECT * FROM movies";
  let response = await db.all(query, []);
  return { movies: response };
}
app.get("/movies", async (req, res) => {
  let result = await fetchAllMovies();
  res.status(200).json(result);
});

// Exercise 2: Fetch all movies by genre
async function fetchMoviesByGenre(genre) {
  let query = "SELECT * FROM movies WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { movies: response };
}
app.get("/movies/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  let result = await fetchMoviesByGenre(genre);
  res.status(200).json(result);
});

// Exercise 3: Fetch movie details by ID
async function fetchMovieDetailsById(id) {
  let query = "SELECT * FROM movies WHERE id = ?";
  let response = await db.get(query, [id]);
  return { movie: response };
}
app.get("/movies/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await fetchMovieDetailsById(id);
  res.status(200).json(result);
});

// Exercise 4: Fetch movie details by release_year
async function fetchMovieByReleaseYear(year) {
  let query = "SELECT * FROM movies WHERE release_year = ?";
  let response = await db.all(query, [year]);
  return { movies: response };
}
app.get("/movies/release_year/:year", async (req, res) => {
  let year = parseInt(req.params.year);
  let result = await fetchMovieByReleaseYear(year);
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
