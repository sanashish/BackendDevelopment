let express = require("express");
let app = express();
let PORT = 3000;

//Endpoint 1: Create an endpoint that takes the marks in two subjects and returns the total marks.
app.get("/total-marks", (req, res) => {
  let marks1 = parseFloat(req.query.marks1);
  let marks2 = parseFloat(req.query.marks2);
  let totalMarks = marks1 + marks2;
  res.send(totalMarks.toString());
});

//Endpoint 2: Create an endpoint that takes the weight of 3 items in a shipment and returns the total weight of the shipment.
app.get("/total-weight", (req, res) => {
  let weight1 = parseFloat(req.query.weight1);
  let weight2 = parseFloat(req.query.weight2);
  let weight3 = parseFloat(req.query.weight3);
  let totalWieght = weight1 + weight2 + weight3;
  res.send(totalWieght.toString());
});

//Endpoint 3: Create an endpoint that takes the annual salary and returns the monthly salary.
app.get("/monthly-salary", (req, res) => {
  let annualSalary = parseFloat(req.query.annualSalary);
  let monthlySalary = annualSalary / 12;
  res.send(monthlySalary.toString());
});

//Endpoint 4: Create an endpoint to calculate the total number of pages read given pages per day and number of days.
app.get("/total-pages", (req, res) => {
  let pagesPerDay = parseFloat(req.query.pagesPerDay);
  let days = parseFloat(req.query.days);
  let toatalPages = pagesPerDay * days;
  res.send(toatalPages.toString());
});

//Endpoint 5: Create an endpoint to calculate the conversion from one currency to another given the exchange rate.
app.get("/currency-conversion", (req, res) => {
  let amount = parseFloat(req.query.amount);
  let exchangeRate = parseFloat(req.query.exchangeRate);
  let convertedAmount = amount * exchangeRate;
  res.send(convertedAmount.toString());
});

//Endpoint 6: Create an endpoint to calculate the average sales of a product, given the sales on 3 days.
app.get("/average-sales", (req, res) => {
  let sales1 = parseFloat(req.query.sales1);
  let sales2 = parseFloat(req.query.sales2);
  let sales3 = parseFloat(req.query.sales3);
  let avgSales = (sales1 + sales2 + sales3) / 3;
  res.send(avgSales.toString());
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
