let express = require("express");
let { sequelize } = require("./lib");
let { post } = require("./models/post.model");
let app = express();

let postData = [
  {
    id: 1,
    name: "Post1",
    author: "Author1",
    content: "This is the content of post 1",
    title: "Title1",
  },
  {
    id: 2,
    name: "Post2",
    author: "Author2",
    content: "This is the content of post 2",
    title: "Title2",
  },
  {
    id: 3,
    name: "Post3",
    author: "Author1",
    content: "This is the content of post 3",
    title: "Title3",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(postData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Fetch all posts
async function fetchAllPosts() {
  let postData = await post.findAll();
  return { posts: postData };
}
app.get("/posts", async (req, res) => {
  try {
    let results = await fetchAllPosts();
    if (results.posts.length === 0) {
      return res.status(404).json({ message: "No posts found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch post details by ID
async function fetchPostById(id) {
  let postData = await post.findOne({ where: { id: id } });
  return { post: postData };
}
app.get("/posts/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchPostById(id);
    if (result.post === null) {
      return res.status(404).json({ message: "No post found." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch all posts by an author
async function fetchPostsByAuthor(author) {
  let postData = await post.findAll({ where: { author: author } });
  return { posts: postData };
}
app.get("/posts/author/:author", async (req, res) => {
  try {
    let author = req.params.author;
    let results = await fetchPostsByAuthor(author);
    if (results.posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found by author " + author });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort all the posts by their name
async function sortPostsByName(order) {
  let postData = await post.findAll({ order: [["name", order]] });
  return { posts: postData };
}
app.get("/posts/sort/name", async (req, res) => {
  try {
    let order = req.query.order;
    let results = await sortPostsByName(order);
    if (results.posts.length === 0) {
      return res.status(404).json({ message: "No posts found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
