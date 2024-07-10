let express = require("express");
let app = express();
let PORT = 3000;

// Endpoint 1: Given username generate a GitHub profile URL for the user
function generateProfileUrl(username) {
  return "https://github.com/" + username;
}
app.get("/github-profile", (req, res) => {
  let username = req.query.username;
  res.send(generateProfileUrl(username));
});

//Endpoint 2: Generate Certificate
function generateCertificate(firstName, lastName, courseName) {
  return (
    "This certification is awarded to " +
    firstName +
    " " +
    lastName +
    " for completing the course " +
    courseName
  );
}
app.get("/certificate", (req, res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let courseName = req.query.courseName;
  res.send(generateCertificate(firstName, lastName, courseName));
});

//Endpoint 3: Create an endpoint that takes maths, science & english as query parameters and returns grade in percentage
function calculateGrade(maths, science, english) {
  let result = Math.round(((maths + science + english) / 300) * 100);
  return "Your grade in percentage is " + result + "%";
}
app.get("/grade", (req, res) => {
  let maths = parseFloat(req.query.maths);
  let science = parseFloat(req.query.science);
  let english = parseFloat(req.query.english);
  res.send(calculateGrade(maths, science, english));
});

//Endpoint 4: Create an endpoint that takes billAmount & numberOfFriends as query parameters and returns the result
function splitBill(billAmount, numberOfFriends) {
  let splitAmount = billAmount / numberOfFriends;
  return "Result: Each friend owes Rs. " + splitAmount + " against the bill";
}
app.get("/split-bill", (req, res) => {
  let billAmount = parseFloat(req.query.billAmount);
  let numberOfFriends = parseInt(req.query.numberOfFriends);
  res.send(splitBill(billAmount, numberOfFriends));
});

//Endpoint 5: Create an endpoint that takes a totalHours & hourlyWage and returns the monthly salary.
function calculateSalary(totalHours, hourlyWage) {
  let monthlySalary = hourlyWage * totalHours;
  return "Result: Your monthly salary is ₹" + monthlySalary;
}
app.get("/monthly-salary", (req, res) => {
  let totalHours = parseFloat(req.query.totalHours);
  let hourlyWage = parseFloat(req.query.hourlyWage);
  res.send(calculateSalary(totalHours, hourlyWage));
});


app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
