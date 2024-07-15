let express = require("express");
let app = express();
let PORT = 3000;

let githubPublicData = {
  username: "ankit123",
  fullName: "Ankit Kumar",
  email: "ankit@gmail.com",
  repositories: 24,
  gists: 12,
  joinOn: "Sep 2018",
};

//Endpoint 1: Profile URL
function getProfileUrl(githubPublicData) {
  return `https://github.com/${githubPublicData.username}`;
}
app.get("/github-profile", (req, res) => {
  let profileUrl = getProfileUrl(githubPublicData);
  res.json({ profileUrl: profileUrl });
});

//Endpoint 2: Public Email
function getPublicEmail(githubPublicData) {
  return githubPublicData.email;
}
app.get("/github-public-email", (req, res) => {
  let publicEmail = getPublicEmail(githubPublicData);
  res.json({ publicEmail: publicEmail });
});

//Endpoint 3: Get Repos Count
function getReposCount(githubPublicData) {
  return githubPublicData.repositories;
}
app.get("/github-repos-count", (req, res) => {
  let reposCount = getReposCount(githubPublicData);
  res.json({ reposCount: reposCount });
});

//Endpoint 4: Get Gists Count
function getGistsCount(githubPublicData) {
  return githubPublicData.gists;
}
app.get("/github-gists-count", (req, res) => {
  let gistsCount = getGistsCount(githubPublicData);
  res.json({ gistsCount: gistsCount });
});

//Endpoint 5: Get User Bio
function getUserBio(githubPublicData) {
  return {
    fullName: githubPublicData.fullName,
    joinedOn: githubPublicData.joinOn,
    email: githubPublicData.email,
  };
}
app.get("/github-user-bio", (req, res) => {
  let userBio = getUserBio(githubPublicData);
  res.json(userBio);
});

//Endpoint 6: Repository URL
function getRepoUrl(githubPublicData, repoName) {
  return `https://github.com/${githubPublicData.username}/${repoName}`;
}
app.get("/github-repo-url", (req, res) => {
  let repoName = req.query.repoName;
  let repoUrl = getRepoUrl(githubPublicData, repoName);
  res.json({ repoUrl: repoUrl });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
