let express = require("express");
let { sequelize } = require("./lib");
let { user } = require("./models/user.model");
let { track } = require("./models/track.model");
let { like } = require("./models/like.model");
let { Op } = require("@sequelize/core");

let app = express();

app.use(express.json());

// users
let userData = [
  {
    username: "testuser",
    email: "testuser@gmail.com",
    password: "testuser",
  },
];

// tracks
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
    await user.bulkCreate(userData);
    await track.bulkCreate(trackData);
    res.status(200).json({ message: "Database seeding successful." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Like a Track
async function likeTrack(data) {
  let result = await like.create({
    userId: data.userId,
    trackId: data.trackId,
  });
  return {
    message: "Track liked",
    newLike: result,
  };
}
app.get("/users/:id/like", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let trackId = parseInt(req.query.trackId);
    let response = await likeTrack({ userId, trackId });
    if (response.newLike.length === 0) {
      return res.status(404).json({ message: "Track not liked." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Dislike a Track
async function dislikeTrack(data) {
  let result = await like.destroy({
    where: {
      userId: data.userId,
      trackId: data.trackId,
    },
  });
  if (result === 0) return {};
  return { message: "Track disliked" };
}
app.get("/users/:id/dislike", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let trackId = parseInt(req.query.trackId);
    let response = await dislikeTrack({ userId, trackId });
    if (!response.message) {
      return res
        .status(404)
        .json({ message: "This track is not in your liked list." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get All Liked Tracks
async function getAllLikedTracks(userId) {
  let trackIds = await like.findAll({
    where: { userId: userId },
    attributes: ["trackId"],
  });

  let tracksRecords = [];

  for (let i = 0; i < trackIds.length; i++) {
    tracksRecords.push(trackIds[i].trackId);
  }

  let likedTracks = await track.findAll({
    where: { id: { [Op.in]: tracksRecords } },
  });

  return { likedTracks };
}
app.get("/users/:id/liked", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let response = await getAllLikedTracks(userId);
    if (response.likedTracks.length === 0) {
      return res.status(404).json({ message: "No liked tracks found." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get All Liked Tracks by Artist
async function getAllLikedTracksByArtists(userId, artist) {
  let tracksIds = await like.findAll({
    where: { userId: userId },
    attributes: ["trackId"],
  });

  let trackRecords = [];

  for (let i = 0; i < tracksIds.length; i++) {
    trackRecords.push(tracksIds[i].trackId);
  }

  let likedTracks = await track.findAll({
    where: { id: { [Op.in]: trackRecords }, artist: artist },
  });

  return { likedTracks };
}
app.get("/users/:id/liked-artist", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let artist = req.query.artist;
    let response = await getAllLikedTracksByArtists(userId, artist);
    if (response.likedTracks.length === 0) {
      return res
        .status(404)
        .json({ message: "No liked track found by artist " + artist });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
