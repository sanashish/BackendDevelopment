let express = require("express");
let app = express();
let PORT = 3000;

// Sample Data
let watchList = [
  {
    videoId: 1,
    title: "JavaScript Tutorial",
    watched: false,
    url: "https://youtu.be/shorturl1",
  },
  {
    videoId: 2,
    title: "Node.js Basics",
    watched: true,
    url: "https://youtu.be/shorturl2",
  },
  {
    videoId: 3,
    title: "React.js Guide",
    watched: false,
    url: "https://youtu.be/shorturl3",
  },
];

let watchList2 = [
  {
    videoId: 1,
    title: "JavaScript Tutorial",
    watched: false,
    url: "https://youtu.be/shorturl1",
    isFavorite: false,
  },
  {
    videoId: 2,
    title: "Node.js Basics",
    watched: true,
    url: "https://youtu.be/shorturl2",
    isFavorite: false,
  },
  {
    videoId: 3,
    title: "React.js Guide",
    watched: false,
    url: "https://youtu.be/shorturl3",
    isFavorite: false,
  },
];

let tasks = [
  { taskId: 1, title: "Buy groceries", completed: false },
  { taskId: 2, title: "Walk the dog", completed: false },
  { taskId: 3, title: "Do laundry", completed: true },
];

let books = [
  { bookId: 1, title: "1984", available: true },
  { bookId: 2, title: "Brave New World", available: true },
  { bookId: 3, title: "Fahrenheit 451", available: false },
];

// Exercise 1: Remove All Unwatched Videos
function deleteUnwatchedVideos(video) {
  return video.watched === true;
}
app.get("/watchlist/delete-unwatched", (req, res) => {
  let result = watchList.filter((video) => deleteUnwatchedVideos(video));
  watchList = result;
  res.json(watchList);
});

// Exercise 2: Mark Video as Favorite by ID
function markVideoAsFavorite(watchList2, videoId, isFavorite) {
  for (let i = 0; i < watchList2.length; i++) {
    if (watchList2[i].videoId === videoId) {
      watchList2[i].isFavorite = isFavorite;
      break;
    }
  }
  return watchList2;
}
app.get("/watchlist/favorite", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let isFavorite = req.query.isFavorite.toLowerCase() === "true";
  let result = markVideoAsFavorite(watchList2, videoId, isFavorite);
  watchList2 = result;
  res.json(watchList2);
});

// Example 3: Update Task Status by ID
function updateTaskStatusById(tasks, taskId, completed) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].completed = completed;
      break;
    }
  }
  return tasks;
}
app.get("/tasks/update", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let completed = req.query.completed.toLowerCase() === "true";
  let result = updateTaskStatusById(tasks, taskId, completed);
  tasks = result;
  res.json(tasks);
});

// Example 4: Remove Completed Tasks
function removeCompletedTasks(tasks) {
  return tasks.completed === false;
}
app.get("/tasks/remove-completed", (req, res) => {
  let result = tasks.filter((task) => removeCompletedTasks(task));
  tasks = result;
  res.json(tasks);
});

// Example 5: Update Library Book Availability by ID
function updateBookAvailabilityById(books, bookId, available) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].bookId === bookId) {
      books[i].avaiable = available;
      break;
    }
  }
  return books;
}
app.get("/library/update", (req, res) => {
  let bookId = parseInt(req.query.bookId);
  let available = req.query.available.toLowerCase() === "true";
  let result = updateBookAvailabilityById(books, bookId, available);
  books = result;
  res.json(books);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
