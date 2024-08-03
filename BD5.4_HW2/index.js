let express = require("express");
let { sequelize } = require("./lib");
let { course } = require("./models/course.model");
let { student } = require("./models/student.model");

let app = express();

app.use(express.json());

// courses
let courseData = [
  { title: "Math 101", description: "Basic Mathematics" },
  { title: "History 201", description: "World History" },
  { title: "Science 301", description: "Basic Sciences" },
];

// students
let studentData = [{ name: "John Doe", age: 24 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await course.bulkCreate(courseData);
    await student.bulkCreate(studentData);
    res.status(200).json({ message: "Database seeding successful." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Create New Student
async function addNewStudent(newStudent) {
  let result = await student.create(newStudent);
  return { newStudent: result };
}
app.post("/students/new", async (req, res) => {
  try {
    let newStudent = req.body.newStudent;
    let response = await addNewStudent(newStudent);
    if (response.newStudent === null) {
      return res.status(404).json({ message: "Student not created." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Update Student by ID
async function updateStudentById(newStudentData, id) {
  let result = await student.findOne({ where: { id: id } });
  if (!result) {
    return { message: "Student not found." };
  }
  result.set(newStudentData);
  let updatedStudent = await result.save();
  return {
    message: "Student updated successfully",
    updatedStudent,
  };
}
app.post("/students/update/:id", async (req, res) => {
  try {
    let newStudentData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateStudentById(newStudentData, id);
    if (response.message === null) {
      return res.status(404).json({ message: "Student not updated." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000.");
});
