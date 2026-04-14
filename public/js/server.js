require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple in-memory data for demo
const users = [
  { id: 1, name: 'Fiastara', role: 'Engineer' },
  { id: 2, name: 'John', role: 'Designer' }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Portfolio Express Demo', users });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // For demo: just render a thank-you page
  return res.render('thankyou', { name });
});

// Example server-side fetch usage (Node18+ supports fetch natively)
app.get('/fetch-demo', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    return res.render('fetch', { post: data });
  } catch (err) {
    return res.status(500).send('Fetch error');
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
