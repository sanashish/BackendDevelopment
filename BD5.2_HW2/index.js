let express = require("express");
const { sequelize } = require("./lib");
const { employee } = require("./models/employee.model");

let app = express();

let employeeData = [
  {
    id: 1,
    name: "Alice",
    salary: 60000,
    department: "Engineering",
    designation: "Software Engineer",
  },
  {
    id: 2,
    name: "Bob",
    salary: 70000,
    department: "Marketing",
    designation: "Marketing Manager",
  },
  {
    id: 3,
    name: "Charlie",
    salary: 80000,
    department: "Engineering",
    designation: "Senior Software Engineer",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employeeData);
    res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Fetch all employees
async function fetchAllEmployees() {
  let empoloyeeData = await employee.findAll();
  return { employees: empoloyeeData };
}
app.get("/employees", async (req, res) => {
  try {
    let results = await fetchAllEmployees();
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch employee details by ID
async function fetchEmployeeById(id) {
  let result = await employee.findOne({ where: { id: id } });
  return { employee: result };
}
app.get("/employees/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchEmployeeById(id);
    if (result.employee === null) {
      return res.status(404).json({ message: "No employee found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch all employees by department
async function fetchEmployeesByDepartment(department) {
  let result = await employee.findAll({ where: { department: department } });
  return { employees: result };
}
app.get("/employees/department/:department", async (req, res) => {
  try {
    let department = req.params.department;
    let results = await fetchEmployeesByDepartment(department);
    if (results.employees.length === 0) {
      return res
        .status(404)
        .json({ message: "No employees found with department " + department });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort all the employees by their salary
async function sortEmployeesBySalary(order) {
  let result = await employee.findAll({ order: [["salary", order]] });
  return { employees: result };
}
app.get("/employees/sort/salary", async (req, res) => {
  try {
    let order = req.query.order;
    let results = await sortEmployeesBySalary(order);
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
