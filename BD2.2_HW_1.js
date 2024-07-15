let express = require("express");
let app = express();
let PORT = 3000;

let temperatures = [22, 26, 19, 30, 23, 28, 17, 31];
let prices = [80, 120, 95, 150, 60, 110];
let ratings = [4.2, 3.8, 2.5, 4.7, 3.0, 4.9, 3.6];
let indianNames = [
  "Akshay",
  "Priyanka",
  "Arjun",
  "Anushka",
  "Rajesh",
  "Kavita",
];
let productPrices = [10, 25, 50, 75, 100, 150, 200];

// Endpoint 1: Write an Express code snippet to filter temperatures above 25 degrees Celsius.
function filterHighTemperatures(temp) {
  return temp > 25;
}
app.get("/high-temperatures", (req, res) => {
  let result = temperatures.filter((temp) => filterHighTemperatures(temp));
  res.json(result);
});

// Endpoint 2: Write an Express code snippet to filter prices less than or equal to 100 rupees.
function filterLowPrices(price) {
  return price <= 100;
}
app.get("/low-prices", (req, res) => {
  let result = prices.filter((price) => filterLowPrices(price));
  res.json(result);
});

// Endpoint 3: Write an Express code snippet to filter product ratings greater than 3.5.
function filterHighRatings(rating) {
  return rating > 3.5;
}
app.get("/high-ratings", (req, res) => {
  let result = ratings.filter((rating) => filterHighRatings(rating));
  res.json(result);
});

// Endpoint 4: Write an Express code snippet to filter Indian names longer than 6 characters.
function filterLongIndianNames(name) {
  return name.length > 6;
}
app.get("/long-indian-names", (req, res) => {
  let result = indianNames.filter((indianName) =>
    filterLongIndianNames(indianName),
  );
  res.json(result);
});

// Enpoint 5: Write an Express code snippet to filter products cheaper than a certain price.
function filterCheaperProducts(price, filterParam) {
  return price < filterParam;
}
app.get("/cheaper-products", (req, res) => {
  let filterParam = parseFloat(req.query.filterParam);
  let result = productPrices.filter((price) =>
    filterCheaperProducts(price, filterParam),
  );
  res.json(result);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
