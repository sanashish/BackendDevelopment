let express = require("express");
let app = express();
let PORT = 3000;

let numbers = [1, 2, 3, 4, 5];
let strings = ["hello", "world", "javascript", "node"];

// Exercise 1: Multiply All Numbers in an Array
function multiplyNumber(numbers, multiplier) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * multiplier);
  }
  return result;
}
app.get("/numbers/multiply", (req, res) => {
  let multiplier = parseFloat(req.query.multiplier);
  let result = multiplyNumber(numbers, multiplier);
  res.json({ result: result });
});

// Exercise 2: Concatenate Strings
function concatStrings(strings, suffix) {
  let result = [];
  for (let i = 0; i < strings.length; i++) {
    result.push(strings[i] + suffix);
  }
  return result;
}
app.get("/strings/concat", (req, res) => {
  let suffix = req.query.suffix;
  let result = concatStrings(strings, suffix);
  res.json({ result: result });
});

// Exercise 3: Remove All Odd Numbers from an Array
function removeOddNumbers(numbers) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      result.push(numbers[i]);
    }
  }
  return result;
}
app.get("/numbers/remove-odds", (req, res) => {
  let result = removeOddNumbers(numbers);
  res.json({ result: result });
});

// Exercise 4: Join All Strings in an Array
function joinStrings(strings) {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i] + " ";
  }
  return result;
}
app.get("/strings/join", (req, res) => {
  let result = joinStrings(strings);
  res.json({ result: result });
});

// Exercise 5: Double All Numbers in an Array
function doubleNumbers(numbers) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * 2);
  }
  return result;
}
app.get("/numbers/double", (req, res) => {
  let result = doubleNumbers(numbers);
  res.json({ result: result });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
