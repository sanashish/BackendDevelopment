let express = require("express");
let app = express();

//Endpoint 1: Return a name is lower case
app.get("/whisper", (req, res) => {
  let name = req.query.name.toLowerCase();
  res.send(name);
});

//Endpoint 2: Concatenate company name and product name to return full product name
app.get("/full-product-name", (req, res) => {
  let companyName = req.query.companyName;
  let productName = req.query.productName;
  let fullProductName = companyName + " " + productName;
  res.send(fullProductName);
});

//Endpoint 3: Concatenate month and year to return a formatted date
app.get("/date", (req, res) => {
  let month = req.query.month;
  let year = req.query.year;
  let formattedDate = month + "/" + year;
  res.send(formattedDate);
});

//Endpoint 4: Return a greeting wiht the given home city
app.get("/greet", (req, res) => {
  let city = req.query.city;
  let greeting = "You live in " + city;
  res.send(greeting);
});

//Endpoint 5: Return a formatted capital and country name
app.get("/capital", (req, res) => {
  let capital = req.query.capital;
  let country = req.query.country;
  let countryCapital = capital + " is the capital of " + country + ".";
  res.send(countryCapital);
});

//Endpoint 6: Return a formatted email
app.get("/email", (req, res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let domain = req.query.domain;
  let email = firstName + "." + lastName + "@" + domain;
  res.send(email);
});

let PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost" + PORT);
});
