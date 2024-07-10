let express = require("express");
let app = express();

//Endpoint 1: Send a custom commit message
app.get("/custom-commit", (req, res) => {
  let type = req.query.type;
  let message = req.query.message;
  let commit = type + ": " + message;
  res.send(commit);
});

//Endpoint 2: Generate certiifcate for students
app.get("/certificate", (req, res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let courseName = req.query.courseName;
  let certificate =
    "This certification is awarded to " +
    firstName +
    " " +
    lastName +
    " for completing the course " +
    courseName;
  res.send(certificate);
});

//Endpoint 3: Configure a custom out-of-office message
app.get("/autoreply", (req, res) => {
  let startMonth = req.query.startMonth;
  let endMonth = req.query.endMonth;
  let message =
    "Dear customer, thank you for reaching out to me. Unfortunately, I'm out of office from " +
    startMonth +
    " till " +
    endMonth +
    ". Your enquiry will be resolved by another colleague.";
  res.send(message);
});

//Endpoint 4: Send a secure URL
app.get("/secureurl", (req, res) => {
  let domain = req.query.domain;
  let url = "https://" + domain;
  res.send(url);
});

//Endpoint 5: Send a verification OTP
app.get("/sendotp", (req, res) => {
  let otpCode = req.query.otpCode;
  let otpMessage =
    "Your OTP for account verification is " +
    otpCode +
    ". Do not share this with anyone";
  res.send(otpMessage);
});

//Endpoing 6: Send a welcome mail to new user
app.get("/welcome", (req, res) => {
  let firstName = req.query.firstName;
  let email = req.query.email;
  let text =
    "Hey " +
    firstName +
    ". We're excited to have you here, we'll send future notifications to your registered mail (" +
    email +
    ")";
  res.send(text);
});

//Endpoint 7: Generate Github profile URL
app.get("/github-profile", (req, res) => {
  let userName = req.query.userName;
  let github = "https://github.com/" + userName;
  res.send(github);
});

//Endpoint 8: Convert text into CSV row format
app.get("/text-to-csv", (req, res) => {
  let id = req.query.id;
  let email = req.query.email;
  let rollNumber = req.query.rollNumber;
  let csv = id + ", " + email + ", " + rollNumber;
  res.send(csv);
});

let PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:" + PORT);
});
