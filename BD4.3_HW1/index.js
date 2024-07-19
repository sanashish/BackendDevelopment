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
  res.status(200).json({ message: "BD4.3_HW1" });
});

// YOUR ENPOINTS GO HERE

// Exercise 1: Fetch All Employees by Gender
async function filterByGender(gender) {
  let query = "SELECT * FROM employees WHERE gender = ?";
  let response = await db.all(query, [gender]);
  return { employees: response };
}
app.get("/employees/gender/:gender", async (req, res) => {
  let gender = req.params.gender;
  try {
    let result = await filterByGender(gender);
    if (result.employees.length === 0) {
      return res
        .status(404)
        .json({ message: "No employees found for gender " + gender });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch All Employees by Department
async function filterByDepartment(department) {
  let query = "SELECT * FROM employees WHERE department = ?";
  let response = await db.all(query, [department]);
  return { employees: response };
}
app.get("/employees/department/:department", async (req, res) => {
  let department = req.params.department;
  try {
    let result = await filterByDepartment(department);
    if (result.employees.length === 0) {
      return res
        .status(404)
        .json({ message: "No employees found for department " + department });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch All Employees by Job Title
async function filterByJobTitle(job_title) {
  let query = "SELECT * FROM employees WHERE job_title = ?";
  let response = await db.all(query, [job_title]);
  return { employees: response };
}
app.get("/employees/job_title/:job_title", async (req, res) => {
  let job_title = req.params.job_title;
  try {
    let result = await filterByJobTitle(job_title);
    if (result.employees.length === 0) {
      return res
        .status(404)
        .json({ message: "No employees found for job title" + job_title });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch All Employees by Location
async function filterByLocation(location) {
  let query = "SELECT * FROM employees WHERE location = ?";
  let response = await db.all(query, [location]);
  return { employees: response };
}
app.get("/employees/location/:location", async (req, res) => {
  let location = req.params.location;
  try {
    let result = await filterByLocation(location);
    if (result.employees.length === 0) {
      return res
        .status(404)
        .json({ message: "No employees found for location" + location });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
