import db from "./db.js";

db.pragma('forign_keys = ON');

db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    content TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
  )
`).run();


export function getAllPosts() {
  return db.prepare("SELECT * FROM posts").all();
}

 
export function getPostById(id) {
  return db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
}


export function createPost(post) {
  const { userId, title, content } = post;
  return db.prepare("INSERT INTO posts (userId, title, content) VALUES (?, ?, ?)")
    .run(userId, title, content);
}


export function updatePost(id, post) {
  const { userId, title, content } = post;
  return db.prepare("UPDATE posts SET userId = ?, title = ?, content = ? WHERE id = ?")
    .run(userId, title, content, id);
}


export function deletePost(id) {
  return db.prepare("DELETE FROM posts WHERE id = ?").run(id);
}
