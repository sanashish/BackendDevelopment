let express = require("express");
let app = express();
let PORT = 3000;

let numbers = [1, 2, 3, 4, 5];
let strings = ["hello", "world", "javascript", "node"];

// Question 1: Add a Number to an Array of Numbers
function addNumber(numbers, num) {
  numbers.push(num);
  return numbers;
}
app.get("/numbers/add", (req, res) => {
  let result = addNumber(numbers, 6);
  res.json(result);
});

// Question 2: Add a String to an Array of Strings
function addString(strings, str) {
  strings.push(str);
  return strings;
}
app.get("/strings/add", (req, res) => {
  let result = addString(strings, "express");
  res.json(result);
});

// Question 3 : Sum an Array of Numbers Using for Loop
function sumNumbers(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}
app.get("/numbers/sum", (req, res) => {
  let result = sumNumbers(numbers);
  res.json({ sum: result });
});

// Question 4 : Find the Maximum Number in an Array
function findMax(numbers) {
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (max < numbers[i]) {
      max = numbers[i];
    }
  }
  return max;
}
app.get("/numbers/max", (req, res) => {
  let result = findMax(numbers);
  res.json({ max: result });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
