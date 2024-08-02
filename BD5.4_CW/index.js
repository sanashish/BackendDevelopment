let express = require("express");
let { sequelize } = require("./lib");
let { track } = require("./models/track.model");
let { user } = require("./models/user.model");

let app = express();

app.use(express.json());

let trackData = [
  {
    name: "Raabta",
    genre: "Romantic",
    release_year: 2012,
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 4,
  },
  {
    name: "Naina Da Kya Kasoor",
    genre: "Pop",
    release_year: 2018,
    artist: "Amit Trivedi",
    album: "Andhadhun",
    duration: 3,
  },
  {
    name: "Ghoomar",
    genre: "Traditional",
    release_year: 2018,
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    duration: 3,
  },
  {
    name: "Bekhayali",
    genre: "Rock",
    release_year: 2019,
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 6,
  },
  {
    name: "Hawa Banke",
    genre: "Romantic",
    release_year: 2019,
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    duration: 3,
  },
  {
    name: "Ghungroo",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "War",
    duration: 5,
  },
  {
    name: "Makhna",
    genre: "Hip-Hop",
    release_year: 2019,
    artist: "Tanishk Bagchi",
    album: "Drive",
    duration: 3,
  },
  {
    name: "Tera Ban Jaunga",
    genre: "Romantic",
    release_year: 2019,
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    duration: 3,
  },
  {
    name: "First Class",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 4,
  },
  {
    name: "Kalank Title Track",
    genre: "Romantic",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 5,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(trackData);
    res.status(200).json({ message: "Database seeding successful." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Fetch all tracks
async function fetchAllTracks() {
  let trackData = await track.findAll();
  return { tracks: trackData };
}
app.get("/tracks", async (req, res) => {
  try {
    let results = await fetchAllTracks();
    if (results.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Add a new track in the database
async function addNewTrack(newTrack) {
  let result = await track.create(newTrack);
  return { newTrack: result };
}
app.post("/tracks/new", async (req, res) => {
  try {
    let newTrack = req.body.newTrack;
    let result = await addNewTrack(newTrack);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Update track information
async function updateTrackById(newTrackData, id) {
  let trackDetails = await track.findOne({ where: { id: id } });
  if (!trackDetails) {
    return { message: "Track not found." };
  }
  trackDetails.set(newTrackData);
  let updatedTrack = await trackDetails.save();
  return {
    message: "Track updated successfully.",
    updatedTrack,
  };
}
app.post("/tracks/update/:id", async (req, res) => {
  try {
    let newTrackData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateTrackById(newTrackData, id);
    if (!response.message) {
      return res.status(404).json({ message: "Track not updated." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Delete a track from the database
async function deleteTrackById(id) {
  let destroyedTrack = await track.destroy({ where: { id: id } });
  if (destroyedTrack === 0) {
    return { message: "Track not deleted." };
  }
  return { message: "Track record deleted successfully." };
}
app.post("/tracks/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteTrackById(id);
    if (!response.message) {
      return res.status(404).json({ message: "Track not found." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Create new user
async function addNewUser(newUser) {
  let result = await user.create(newUser);
  return { newUser: result };
}
app.post("/users/new", async (req, res) => {
  try {
    let newUser = req.body.newUser;
    let response = await addNewUser(newUser);
    if (response.newUser === null) {
      return res.status(404).json({ message: "User not created." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Update user data
async function updateUserById(newData, id) {
  let result = await user.findOne({ where: { id: id } });
  if (!result) {
    return { message: "User not found." };
  }
  result.set(newData);
  let updatedUser = await result.save();
  return {
    message: "User updated successfully",
    updatedUser,
  };
}
app.post("/users/update/:id", async (req, res) => {
  try {
    let newData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateUserById(newData, id);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000.");
});
