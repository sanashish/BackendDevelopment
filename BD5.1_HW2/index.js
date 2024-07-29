let express = require("express");
let { sequelize } = require("./lib/index");
let { employee } = require("./models/employee.model");
let app = express();

let employees = [
  {
    name: "Rajkumar",
    department: "Sales",
    salary: 30000,
    designation: "Senior Sales Executive",
  },
  {
    name: "Abhishek",
    department: "Account",
    salary: 15000,
    designation: "Field Executive",
  },
  {
    name: "Satyam",
    department: "HR",
    salary: 13000,
    designation: "Senior HR Lead",
  },
  {
    name: "Kishan",
    department: "Admin",
    salary: 10000,
    designation: "Front Desk Executive",
  },
  {
    name: "Phanindra",
    department: "Software",
    salary: 50000,
    designation: "Senior Developer",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employees);
    res.status(200).json({ message: "Database Seeding Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
