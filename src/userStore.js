const pool = require('../db');
const bcrypt = require('bcrypt');

async function createUser(username, email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (username, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at
  `;
  const values = [username, email, passwordHash];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
}

async function getUserById(id) {
  const query = 'SELECT id, username, email, created_at FROM users WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

async function verifyPassword(email, password) {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password_hash);
  if (isValid) {
    return { id: user.id, username: user.username, email: user.email };
  }
  return null;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  verifyPassword
};