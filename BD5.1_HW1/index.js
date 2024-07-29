let express = require("express");
let { post } = require("./models/post.model");
let { sequelize } = require("./lib/index");
let app = express();

let postData = [
  {
    name: "Post 1",
    author: "Abhishek",
    title: "His mother had always taught him",
    content:
      "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
  },
  {
    name: "Post 2",
    author: "Vaibhav",
    title: "He was an expert but not in a discipline",
    content:
      "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
  },
  {
    name: "Post 3",
    author: "Mohan",
    title: "Dave watched as the forest burned up on the hill.",
    content:
      "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
  },
  {
    name: "Post 4",
    author: "Shyam",
    title: "All he wanted was a candy bar.",
    content:
      "All he wanted was a candy bar. It didn't seem like a difficult request to comprehend, but the clerk remained frozen and didn't seem to want to honor the request. It might have had something to do with the gun pointed at his face.",
  },
  {
    name: "Post 5",
    author: "Ram",
    title: "Hopes and dreams were dashed that day.",
    content:
      "Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down.",
  },
  {
    name: "Post 6",
    author: "Satyendra",
    title: "Dave wasn't exactly sure how he had ended up",
    content:
      "Dave wasn't exactly sure how he had ended up in this predicament. He ran through all the events that had lead to this current situation and it still didn't make sense. He wanted to spend some time to try and make sense of it all, but he had higher priorities at the moment. The first was how to get out of his current situation of being naked in a tree with snow falling all around and no way for him to get down.",
  },
  {
    name: "Post 7",
    author: "Ravi",
    title: "This is important to remember.",
    content:
      "This is important to remember. Love isn't like pie. You don't need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn't run out, so don't try to hold back giving it as if it may one day run out. Give it freely and as much as you want.",
  },
  {
    name: "Post 8",
    author: "Rajkumar",
    title: "One can cook on and with an open fire.",
    content:
      "One can cook on and with an open fire. These are some of the ways to cook with fire outside. Cooking meat using a spit is a great way to evenly cook meat. In order to keep meat from burning, it's best to slowly rotate it.",
  },
  {
    name: "Post 9",
    author: "Satyam",
    title: "There are different types of secrets.",
    content:
      "There are different types of secrets. She had held onto plenty of them during her life, but this one was different. She found herself holding onto the worst type. It was the type of secret that could gnaw away at your insides if you didn't tell someone about it, but it could end up getting you killed if you did.",
  },
  {
    name: "Post 10",
    author: "Kishan",
    title: "They rushed out the door.",
    content:
      "They rushed out the door, grabbing anything and everything they could think of they might need. There was no time to double-check to make sure they weren't leaving something important behind. Everything was thrown into the car and they sped off. Thirty minutes later they were safe and that was when it dawned on them that they had forgotten the most important thing of all.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(postData);
    res.status(200).json({ message: "Database Seeding Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
