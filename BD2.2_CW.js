let express = require("express");
let app = express();
let PORT = 3000;

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let ages = [10, 20, 30, 15, 17, 25];
let words = ["apple", "banana", "cherry", "date", "fig", "grape"];
let fileSizes = [50, 200, 75, 120, 30, 90, 150];

//Endpoint 1: Return Only the Even Numbers
function filterEvenNumbers(nums) {
  return nums % 2 === 0;
}
app.get("/even-numbers", (req, res) => {
  let result = numbers.filter((nums) => filterEvenNumbers(nums));
  res.json(result);
});

//Endpoint 2: Return Only the Ages Greater Than 18
function filterAges(age) {
  return age > 18;
}
app.get("/adult-ages", (req, res) => {
  let result = ages.filter((age) => filterAges(age));
  res.json(result);
});

//Endpoint 3: Return Only the Words Longer Than 5 Characters
function filterLongWords(word, characters) {
  return word.length > characters;
}
app.get("/long-words", (req, res) => {
  let result = words.filter((word) => filterLongWords(word, 5));
  res.json(result);
});

// Endpoint 4: Return Only the Files Smaller Than a Certain Size
function filterSmallFiles(fileSize, filterParam) {
  return fileSize < filterParam;
}
app.get("/small-files", (req, res) => {
  let filterParam = parseFloat(req.query.filterParam);
  let result = fileSizes.filter((fileSize) =>
    filterSmallFiles(fileSize, filterParam),
  );
  res.json(result);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
