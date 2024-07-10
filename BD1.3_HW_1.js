let express = require("express");
let app = express();
let PORT = 3000;

//Endpoint 1: Create an endpoint that takes a number as a query parameter and returns whether the number is a whole number or not.
app.get("/check-whole-number", (req, res) => {
  let number = parseFloat(req.query.number);
  let result;
  if (number >= 0) {
    result = "whole number";
  } else {
    result = "not whole number";
  }
  res.send("Number is " + result);
});

//Endpoint 2: Create an endpoint that takes two numbers as a query parameter and returns whether the numbers are equal or not.
app.get("/check-equal", (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);
  let result;
  if (num1 === num2) {
    result = "equal";
  } else {
    result = "not equal";
  }
  res.send("Numebrs are " + result);
});

//Endpoint 3: Create an endpoint that takes a boolean query parameter indicating if a user is active and returns 'User is Active' or 'User is not Active'.
app.get("/check-active", (req, res) => {
  let isActive = req.query.isActive === "true";
  let result;
  if (isActive) {
    result = "User is Active";
  } else {
    result = "User is not Active";
  }
  res.send(result);
});

//Endpoint 4: Create an endpoint that takes a user's cost of goods bought as a query parameter and returns 'User is eligible for a discount' if the cost is over 1000, otherwise 'User is not eligible for a discount'.
app.get("/check-discount", (req, res) => {
  let cost = parseFloat(req.query.cost);
  let result;
  if (cost > 1000) {
    result = "User is eligible for a discount";
  } else {
    result = "User is not eligible for a discount";
  }
  res.send(result);
});

//Endpoint 5: Create an endpoint that takes work experience (in years) as a query parameter and returns whether the person is experienced, fresher, or non-working.
app.get("/check-experience", (req, res) => {
  let workExperience = parseFloat(req.query.workExperience);
  let result;
  if (workExperience > 0) {
    result = "experienced";
  } else if (workExperience < 0) {
    result = "non-working";
  } else {
    result = "fresher";
  }
  res.send("Person is " + result);
});

//Endpoint 6: Create an endpoint that takes the result as a query parameter and returns whether the grade is Grade A (above 80), B (between 50 to 80), or Fail (below 50).
app.get("/check-result", (req, res) => {
  let result = parseFloat(req.query.result);
  let grade;
  if (result > 80) {
    grade = "A";
  } else if (result >= 50) {
    grade = "B";
  } else {
    grade = "Fail";
  }
  res.send("The grade is " + grade);
});

//Endpoint 7: Create an endpoint that takes the number of steps as a query parameter and returns whether the student’s attendance is low (less than 50 classes), moderate (50 to 90 classes), or high (more than 90 classes).
app.get("/check-attendance", (req, res) => {
  let attendance = parseFloat(req.query.attendance);
  let result;
  if (attendance < 50) {
    result = "low";
  } else if (attendance <= 90) {
    result = "moderate";
  } else {
    result = "high";
  }
  res.send("Attendance is " + result);
});

//Endpoint 8: Create an endpoint that takes the number of stars a restaurant has as a query parameter and returns whether the restaurant rating is low (less than 3 stars), medium (3 or 4 stars), or high (5 stars).
app.get("/check-rating", (req, res) => {
  let stars = parseFloat(req.query.stars);
  let result;
  if (stars < 3) {
    result = "low";
  } else if (stars <= 4) {
    result = "medium";
  } else {
    result = "high";
  }
  res.send("Restaurant rating is " + result);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
