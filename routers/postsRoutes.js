import express from "express";
import * as Post from "../data/post.js";

const router = express.Router();

router.get("/", (req, res) => {
  const posts = Post.getAllPosts();
  res.json(posts);
});

router.get("/:id", (req, res) => {
  const post = Post.getPostById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

router.post("/", (req, res) => {
  const result = Post.createPost(req.body);
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put("/:id", (req, res) => {
  const post = Post.getPostById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  Post.updatePost(req.params.id, req.body);
  res.json({ message: "Post updated" });
});

router.delete("/:id", (req, res) => {
  const post = Post.getPostById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  Post.deletePost(req.params.id);
  res.json({ message: "Post deleted" });
});

export default router;
