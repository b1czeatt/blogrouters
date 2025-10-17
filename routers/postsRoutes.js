import express from "express";
import * as Post from "../data/post.js";

const postRoutes = express.Router();

postRoutes.get("/", (req, res) => {
  const posts = Post.getPosts();
  res.json(posts);
});

postRoutes.get("/:id", (req, res) => {
  const id = req.params.id;
  const post = post.getPostById(id);
  if (!post) {
    res.status(400).json({ message: "No such post!" });
  }

  res.status(200).json(post);
});

postRoutes.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Some data are missing!" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPw = await bcrypt.hash(password, salt);
  const saved = post.savePost(name, email, hashedPw);

  const post = post.getPostById(saved.lastInsertRowid);

  res.status(201).json(post);
});

postRoutes.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  const post = post.getPostById(id);
  if (!post) {
    res.status(400).json({ message: "No such post!" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPw = await bcrypt.hash(password, salt);
  const saved = post.updatePost(name, email, hashedPw, id);

  const updatedpost = post.getPostById(saved.lastInsertRowid);

  res.status(201).json(updatedpost);
});

postRoutes.delete("/:id", (req, res) => {
  const id = req.params.id;
  const post = post.getPostById(id);
  if (!post) {
    res.status(400).json({ message: "No such post!" });
  }
  post.deletePost(id);
  res.status(200).json({ message: "Deletion was successful!" });
});

export default postRoutes;
