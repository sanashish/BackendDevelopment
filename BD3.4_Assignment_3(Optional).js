let express = require("express");
let app = express();
let PORT = 3000;
let cors = require("cors");

app.use(cors());

// Sample Data
let activities = [
  { activityId: 1, type: "Running", duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: "Swimming", duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: "Cycling", duration: 60, caloriesBurned: 500 },
];

// Endpoint 1: Add an Activity
function addActivity(activityId, type, duration, caloriesBurned) {
  activities.push({ activityId, type, duration, caloriesBurned });
  return activities;
}
app.get("/activities/add", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseInt(req.query.caloriesBurned);
  addActivity(activityId, type, duration, caloriesBurned);
  res.json({ activities });
});

// Endpoint 2: Sort Activities by Duration
function sortActivitiesByDuration(activity1, activity2) {
  return activity1.duration - activity2.duration;
}
app.get("/activities/sort-by-duration", (req, res) => {
  let copyActivities = activities.slice();
  copyActivities.sort(sortActivitiesByDuration);
  res.json({ activities: copyActivities });
});

// Endpoint 3: Filter Activities by Type
function filterActivitiesByType(activity, type) {
  return activity.type.toLowerCase() === type.toLowerCase();
}
app.get("/activities/filter-by-type", (req, res) => {
  let type = req.query.type;
  let result = activities.filter((activity) =>
    filterActivitiesByType(activity, type),
  );
  res.json({ activities: result });
});

// Endpoint 4: Calculate Total Calories Burned
function totalCaloriesBurned(activities) {
  let totalCalories = 0;
  for (let i = 0; i < activities.length; i++) {
    totalCalories += activities[i].caloriesBurned;
  }
  return totalCalories;
}
app.get("/activities/total-calories", (req, res) => {
  let result = totalCaloriesBurned(activities);
  res.json({ totalCaloriesBurned: result });
});

// Endpoint 5: Update Activity Duration by ID
function updateActivityById(activityId, duration) {
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].activityId === activityId) {
      activities[i].duration = duration;
      break;
    }
  }
  return activities;
}
app.get("/activities/update-duration", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);
  updateActivityById(activityId, duration);
  res.json({ activities });
});

// Endpoint 6: Delete Activity by ID
function deleteActivityById(activityId) {
  let result = activities.filter((ele) => ele.activityId !== activityId);
  return result;
}
app.get("/activities/delete", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let result = deleteActivityById(activityId);
  activities = result;
  res.json({ activities });
});

// Endpoint 7: Delete Activities by Type
function deleteActivityByType(type) {
  let result = activities.filter((ele) => ele.type !== type);
  return result;
}
app.get("/activities/delete-by-type", (req, res) => {
  let type = req.query.type;
  let result = deleteActivityByType(type);
  activities = result;
  res.json({ activities });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
