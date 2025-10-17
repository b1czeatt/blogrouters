import db from "./db.js";

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
  )
`
).run();

export function getAllUsers() {
  return db.prepare("SELECT * FROM users").all();
}

export function getUserById(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

export function createUser(user) {
  const { name, email, password } = user;
  return db
    .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
    .run(name, email, password);
}

export function updateUser(id, user) {
  const { name, email, password } = user;
  return db
    .prepare("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?")
    .run(name, email, password, id);
}

export function deleteUser(id) {
  return db.prepare("DELETE FROM users WHERE id = ?").run(id);
}
