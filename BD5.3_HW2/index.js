let express = require("express");
let { sequelize } = require("./lib");
let { employee } = require("./models/employee.model");

let app = express();

app.use(express.json());

let employeeData = [
  {
    name: "John Doe",
    designation: "Manager",
    department: "Sales",
    salary: 90000,
  },
  {
    name: "Anna Brown",
    designation: "Developer",
    department: "Engineering",
    salary: 80000,
  },
  {
    name: "James Smith",
    designation: "Designer",
    department: "Marketing",
    salary: 70000,
  },
  {
    name: "Emily Davis",
    designation: "HR Specialist",
    department: "Human Resources",
    salary: 60000,
  },
  {
    name: "Michael Wilson",
    designation: "Developer",
    department: "Engineering",
    salary: 85000,
  },
  {
    name: "Sarah Johnson",
    designation: "Data Analyst",
    department: "Data Science",
    salary: 75000,
  },
  {
    name: "David Lee",
    designation: "QA Engineer",
    department: "Quality Assurance",
    salary: 70000,
  },
  {
    name: "Linda Martinez",
    designation: "Office Manager",
    department: "Administration",
    salary: 50000,
  },
  {
    name: "Robert Hernandez",
    designation: "Product Manager",
    department: "Product",
    salary: 95000,
  },
  {
    name: "Karen Clark",
    designation: "Sales Associate",
    department: "Sales",
    salary: 55000,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employeeData);
    res.status(200).json({ message: "Database seeding successful." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Fetch all employees
async function fetchAllEmployees() {
  let result = await employee.findAll();
  return { employees: result };
}
app.get("/employees", async (req, res) => {
  try {
    let response = await fetchAllEmployees();
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No employees found." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Add a new employee in the database
async function addNewEmployee(newEmployee) {
  let result = await employee.create(newEmployee);
  return { newEmployee: result };
}
app.post("/employees/new", async (req, res) => {
  try {
    let newEmployee = req.body.newEmployee;
    let response = await addNewEmployee(newEmployee);
    if (response.newEmployee === null) {
      return res.status(404).json({ message: "Employee not created." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Update employee information
async function updateEmployeeById(newEmployeeData, id) {
  let employeeData = await employee.findOne({ where: { id: id } });
  if (!employeeData) {
    return { message: "Employee not found." };
  }
  employeeData.set(newEmployeeData);
  let result = await employeeData.save();
  return {
    message: "Employee updated successfully",
    updatedEmployee: result,
  };
}
app.post("/employees/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newEmployeeData = req.body;
    let response = await updateEmployeeById(newEmployeeData, id);
    if (!response.message) {
      return res.status(404).json({ message: "Employee not updated." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Delete an employee from the database
async function deleteEmployeeById(id) {
  let employeeData = await employee.destroy({ where: { id: id } });
  if (employeeData === 0) {
    return { message: "Employee not deleted." };
  }
  return { message: "Employee record deleted successfully." };
}
app.post("/employees/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteEmployeeById(id);
    if (!response.message) {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
