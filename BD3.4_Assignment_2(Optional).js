let express = require("express");
let app = express();
let PORT = 3000;
let cors = require("cors");

app.use(cors());

// Sample Data
let tasks = [
  { taskId: 1, text: "Fix bug #101", priority: 2 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
];

// Endpoint 1. Add a Task to the Task List
function addTask(tasks, taskId, text, priority) {
  tasks.push({ taskId, text, priority });
  return tasks;
}
app.get("/tasks/add", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addTask(tasks, taskId, text, priority);
  tasks = result;
  res.json({ tasks: result });
});

// Endpoint 2. Read All Tasks in the Task List
app.get("/tasks", (req, res) => {
  res.json({ tasks });
});

// Endpoint 3. Sort Tasks by Priority
function sortTaskByPriority(task1, task2) {
  return task1.priority - task2.priority;
}
app.get("/tasks/sort-by-priority", (req, res) => {
  let copyTasks = tasks.slice();
  copyTasks.sort(sortTaskByPriority);
  res.json({ tasks: copyTasks });
});

// Endpoint 4. Edit Task Priority
function editTaskPrioirty(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
      break;
    }
  }
  return tasks;
}
app.get("/tasks/edit-priority", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editTaskPrioirty(tasks, taskId, priority);
  tasks = result;
  res.json({ tasks });
});

// Endpoint 5. Edit/Update Task Text
function editTaskText(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
      break;
    }
  }
  return tasks;
}
app.get("/tasks/edit-text", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = editTaskText(tasks, taskId, text);
  tasks = result;
  res.json({ tasks });
});

// Endpoint 6. Delete a Task from the Task List
function deleteTask(tasks, taskId) {
  return tasks.filter((ele) => ele.taskId !== taskId);
}
app.get("/tasks/delete", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = deleteTask(tasks, taskId);
  tasks = result;
  res.json({ tasks });
});

// Endpoint 7. Filter Tasks by Priority
function filterTaskByPriority(tasks, priority) {
  return tasks.filter((ele) => ele.priority === priority);
}
app.get("/tasks/filter-by-priority", (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = filterTaskByPriority(tasks, priority);
  res.json({ tasks: result });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
