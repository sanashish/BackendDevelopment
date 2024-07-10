let express = require("express");
let app = express();
let PORT = 3000;

//Endpoint 1: Body Mass Index (BMI) Calculator
app.get("/bmi", (req, res) => {
  let height = parseFloat(req.query.height);
  let weigth = parseFloat(req.query.weight);
  let bmi = weigth / (height * height);
  res.send("Your BMI is " + bmi);
});

//Endpoint 2: Calculate grocery checkout price
app.get("/checkout", (req, res) => {
  let product = req.query.product;
  let units = parseInt(req.query.units);
  let price = parseFloat(req.query.price);
  let total_price = price * units;
  res.send("Your total for " + units + " " + product + " is " + total_price);
});

//Endpoint 3: Calculate grade percentage
app.get("/grade", (req, res) => {
  let maths = parseInt(req.query.maths);
  let science = parseInt(req.query.science);
  let english = parseInt(req.query.english);
  let gradeInPercentage = Math.round(((maths + science + english) / 300) * 100);
  res.send("Your grade in percentage is " + gradeInPercentage + "%");
});

//Endpoint 4: Return bill amount after applying discount
app.get("/discounted-price", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let discount = parseFloat(req.query.discount);
  let totalPrice = cartTotal - cartTotal * (discount / 100);
  res.send("Result: Your bill amount is " + totalPrice);
});

//Endpoint 5: Split bill among friends
app.get("/split-bill", (req, res) => {
  let billAmount = parseFloat(req.query.billAmount);
  let numberOfFriends = parseInt(req.query.numberOfFriends);
  let splitAmount = billAmount / numberOfFriends;
  res.send("Result: Each friend owes Rs. " + splitAmount + " against the bill");
});

//Endpoint 6: Convert Celsius to Fahrenheit
app.get("/celsius-to-fahrenheit", (req, res) => {
  let celsius = parseFloat(req.query.temperature);
  let fahrenheit = (celsius * 9) / 5 + 32;
  res.send("Result: " + fahrenheit + " Fahrenheit");
});

//Endpoint 7: Calculate monthly salary
app.get("/monthly-salary", (req, res) => {
  let totalHours = parseInt(req.query.totalHours);
  let hourlyWage = parseFloat(req.query.hourlyWage);
  let monthlySalary = totalHours * hourlyWage;
  res.send("Result: Your monthly salary is ₹" + monthlySalary);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
