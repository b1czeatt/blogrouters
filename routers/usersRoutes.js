import express from "express";
import * as User from "../data/user.js";
import bcrypt from "bcrypt";

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
  const users = User.getUsers();
  res.json(users);
});

userRoutes.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = User.getUserById(id);
  if (!user) {
    res.status(400).json({ message: "No such user!" });
  }

  res.status(200).json(user);
});

userRoutes.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Some data are missing!" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPw = await bcrypt.hash(password, salt);
  const saved = User.saveUser(name, email, hashedPw);

  const user = User.getUserById(saved.lastInsertRowid);

  res.status(201).json(user);
});

userRoutes.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  const user = User.getUserById(id);
  if (!user) {
    res.status(400).json({ message: "No such user!" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPw = await bcrypt.hash(password, salt);
  const saved = User.updateUser(name, email, hashedPw, id);

  const updatedUser = User.getUserById(saved.lastInsertRowid);

  res.status(201).json(updatedUser);
});

userRoutes.delete("/:id", (req, res) => {
  const id = req.params.id;
  const user = User.getUserById(id);
  if (!user) {
    res.status(400).json({ message: "No such user!" });
  }
  User.deleteUser(id);
  res.status(200).json({ message: "Deletion was successful!" });
});

export default userRoutes;
