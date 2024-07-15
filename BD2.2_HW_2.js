let express = require("express");
let app = express();
let PORT = 3000;

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let pNumbers = [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let oNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Endpoint 1: Filter Prime Numbers
function filterPrimeNumbers(num) {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}
app.get("/prime-numbers", (req, res) => {
  let result = numbers.filter((num) => filterPrimeNumbers(num));
  res.json(result);
});

// Endpoint 2: Filter Positive Numbers
function filterPositiveNumbers(num) {
  return num > 0;
}
app.get("/positive-numbers", (req, res) => {
  let result = pNumbers.filter((num) => filterPositiveNumbers(num));
  res.json(result);
});

// Endpoint 3: Filter Negative Numbers
function filterNegativeNumbers(num) {
  return num < 0;
}
app.get("/negative-numbers", (req, res) => {
  let result = pNumbers.filter((num) => filterNegativeNumbers(num));
  res.json(result);
});

// Endpoint 4: Filter Odd Numbers
function filterOddNumbers(num) {
  return num % 2 !== 0;
}
app.get("/odd-numbers", (req, res) => {
  let result = oNumbers.filter((num) => filterOddNumbers(num));
  res.json(result);
});

// Endpoint 5: Filter Numbers Greater Than a Given Value
function filterNumbersGreaterThan(num, value) {
  return num > value;
}
app.get("/numbers-greater-than", (req, res) => {
  let value = parseFloat(req.query.value);
  let result = oNumbers.filter((num) => filterNumbersGreaterThan(num, value));
  res.json(result);
});

// Endpoint 6: Filter Numbers Less Than a Given Value
function filterNumbersLessThan(num, value) {
  return num < value;
}
app.get("/numbers-less-than", (req, res) => {
  let value = parseFloat(req.query.value);
  let result = oNumbers.filter((num) => filterNumbersLessThan(num, value));
  res.json(result);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
