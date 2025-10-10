import express from "express";
import * as User from "../data/user.js";

const router = express.Router();

router.get("/", (req, res) => {
  const users = User.getAllUsers();
  res.json(users);
});

router.get("/:id", (req, res) => {
  const user = User.getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

router.post("/", (req, res) => {
  const result = User.createUser(req.body);
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put("/:id", (req, res) => {
  const user = User.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  User.updateUser(req.params.id, req.body);
  res.json({ message: "User updated" });
});

router.delete("/:id", (req, res) => {
  const user = User.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  User.deleteUser(req.params.id);
  res.json({ message: "User deleted" });
});

export default router;
