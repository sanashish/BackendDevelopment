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
  res.status(200).json({ message: "BD4.4_HW1" });
});

// YOUR ENPOINTS GO HERE

// Exercise 1: Fetch All Courses
async function fetchAllCourses() {
  let query = "SELECT * FROM courses";
  let response = await db.all(query, []);
  return { courses: response };
}
app.get("/courses", async (req, res) => {
  try {
    let result = await fetchAllCourses();
    if (result.courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Courses by Instructor
async function fetchCoursesByInstructor(instructor) {
  let query =
    "SELECT id, title, instructor, category FROM courses WHERE instructor = ?";
  let response = await db.all(query, [instructor]);
  return { courses: response };
}
app.get("/courses/instructor/:instructor", async (req, res) => {
  let instructor = req.params.instructor;
  try {
    let result = await fetchCoursesByInstructor(instructor);
    if (result.courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for instructor " + instructor });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Courses by Category
async function fetchCoursesByCategory(category) {
  let query =
    "SELECT id, title, release_year, category FROM courses WHERE category = ?";
  let response = await db.all(query, [category]);
  return { courses: response };
}
app.get("/courses/category/:category", async (req, res) => {
  let category = req.params.category;
  try {
    let result = await fetchCoursesByCategory(category);
    if (result.courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for category " + category });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch Courses by Year
async function fetchCoursesByYear(year) {
  let query =
    "SELECT id, title, release_year, category FROM courses WHERE release_year = ?";
  let response = await db.all(query, [year]);
  return { courses: response };
}
app.get("/courses/year/:year", async (req, res) => {
  let year = req.params.year;
  try {
    let result = await fetchCoursesByYear(year);
    if (result.courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for Year " + year });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
