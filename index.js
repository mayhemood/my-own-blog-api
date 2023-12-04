import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [
  {
    id: 1,
    title: "Renewable Energy",
    content:
      "Harnessing the power of nature, renewable energy sources like solar and wind are revolutionizing our approach to power generation. Solar panels, converting sunlight into electricity, adorn rooftops, while wind turbines gracefully spin in open landscapes. As we shift away from fossil fuels, these sustainable alternatives promise cleaner air and a reduced carbon footprint. The renewable energy sector not only contributes to environmental conservation but also fosters technological innovation, driving us towards a future powered by clean, limitless resources.",
    author: "Mehmood Ali",
    date: "2023-12-03T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mehmood Ali",
    date: "2023-12-03T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Mehmood Ali",
    date: "2023-12-03T16:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/posts", (req, res) => {
  res.json(posts);
});


app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id);
  if (foundPost) {
    res.json(foundPost);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});


app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});


app.patch("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const existingPost = posts.find((post) => post.id === postId);

  if (!existingPost) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (req.body.title) {
    existingPost.title = req.body.title;
  }
  if (req.body.content) {
    existingPost.content = req.body.content;
  }
  if (req.body.author) {
    existingPost.author = req.body.author;
  }
  res.json(existingPost);
});

app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((post) => post.id === id);
  if (searchIndex > -1) {
    posts.splice(searchIndex, 1);
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: `Post with id: ${id} not found. No posts were deleted.` });
  }
});


app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
