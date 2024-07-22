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
  res.status(200).json({ message: "BD4.5_HW1" });
});

// YOUR ENPOINTS GO HERE

// Exercise 1: Fetch Courses by Minimum Rating
async function fetchCoursesByMinimumRating(minRating) {
  let query = "SELECT * FROM courses WHERE rating > ?";
  let response = await db.all(query, [minRating]);
  return { courses: response };
}
app.get("/courses/rating", async (req, res) => {
  let minRating = req.query.minRating;
  try {
    let results = await fetchCoursesByMinimumRating(minRating);
    if (results.courses.length === 0) {
      return res.status(404).json({ message: "No Courses found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Courses by Instructor and Minimum Duration
async function fetchCourseByInstructorAndDuration(instructor, minDuration) {
  let query = "SELECT * FROM courses WHERE instructor = ? AND duration > ?";
  let response = await db.all(query, [instructor, minDuration]);
  return { courses: response };
}
app.get("/courses/instructor-duration", async (req, res) => {
  let instructor = req.query.instructor;
  let minDuration = req.query.minDuration;
  try {
    let results = await fetchCourseByInstructorAndDuration(
      instructor,
      minDuration,
    );
    if (results.courses.length === 0) {
      return res.status(404).json({
        message:
          "No Courses found by Instructor " +
          instructor +
          " and Duration " +
          minDuration,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Courses Ordered by Price
async function fetchCoursesOrderedByPrice() {
  let query = "SELECT * FROM courses ORDER BY price DESC";
  let response = await db.all(query, []);
  return { courses: response };
}
app.get("/courses/ordered-by-price", async (req, res) => {
  try {
    let results = await fetchCoursesOrderedByPrice();
    if (results.courses.length === 0) {
      return res.status(404).json({ message: "No Courses found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
