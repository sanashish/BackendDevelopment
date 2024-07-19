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
  res.status(200).json({ message: "BD4.4_CW" });
});

// YOUR ENPOINTS GO HERE

// Exercise 1: SELECT only id, title & release_year of all movies
async function fetchAllMovies() {
  let query = "SELECT id, title, release_year FROM movies";
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
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: SELECT id, title, actor & release_year from all movies by an actor
async function fetchMoviesByActor(actor) {
  let query =
    "SELECT id, title, actor, release_year FROM movies WHERE actor = ?";
  let response = await db.all(query, [actor]);
  return { movies: response };
}
app.get("/movies/actor/:actor", async (req, res) => {
  let actor = req.params.actor;
  try {
    let result = await fetchMoviesByActor(actor);
    if (result.movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found for actor " + actor });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: SELECT id, title, director & release_year from all movies by a director
async function fetchMoviesByDirector(director) {
  let query =
    "SELECT id,title,director,release_year FROM movies WHERE director = ?";
  let response = await db.all(query, [director]);
  return { movies: response };
}
app.get("/movies/director/:director", async (req, res) => {
  let director = req.params.director;
  try {
    let result = await fetchMoviesByDirector(director);
    if (result.movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found for director " + director });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
