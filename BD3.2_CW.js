let express = require("express");
let app = express();
let PORT = 3000;

// Sample data
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let names = ["Rahul", "Sita", "Amit", "Vikram", "Priya"];
let employees = [
  { employeeId: 1, name: "Rahul" },
  { employeeId: 2, name: "Sita" },
  { employeeId: 3, name: "Amit" },
];
let contacts = [
  { phoneNumber: "1234567890", name: "Rahul", address: "123 Street, City" },
  { phoneNumber: "0987654321", name: "Sita", address: "456 Avenue, City" },
  { phoneNumber: "1112223334", name: "Amit", address: "789 Boulevard, City" },
];

// Exercise 1: Find a Number in the Array
function findNumber(ele, num) {
  return ele === num;
}
app.get("/numbers/find/:number", (req, res) => {
  let number = parseInt(req.params.number);
  let result = numbers.find((ele) => findNumber(ele, number));
  res.json(result);
});

// Exercise 2:Find a Name in the Array
function findName(ele, name) {
  return ele.toLowerCase() === name.toLowerCase();
}
app.get("/names/find/:name", (req, res) => {
  let name = req.params.name;
  let result = names.find((ele) => findName(ele, name));
  res.json(result);
});

// Exercise 3: Find an Employee by ID
function finEmpoyeeById(ele, id) {
  return ele.employeeId === id;
}
app.get("/employees/find/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let result = employees.find((ele) => finEmpoyeeById(ele, id));
  res.json(result);
});

// Exercise 4: Find a Contact by Phone Number
function findContactByPhoneNumber(ele, phoneNumber) {
  return ele.phoneNumber === phoneNumber;
}
app.get("/contacts/find/:phoneNumber", (req, res) => {
  let phoneNumber = req.params.phoneNumber;
  let result = contacts.find((ele) =>
    findContactByPhoneNumber(ele, phoneNumber),
  );
  res.json(result);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
