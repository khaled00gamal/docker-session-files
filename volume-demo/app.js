const express = require('express');
const { Client } = require('pg');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'testdb',
  password: 'password',
  port: 5432,
});

client.connect();

// Serve the static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Create a simple table
client.query('CREATE TABLE IF NOT EXISTS items(id SERIAL PRIMARY KEY, name VARCHAR(50));', (err, res) => {
  if (err) throw err;
});

// Endpoint to add items via form
app.post('/add-item', (req, res) => {
  const { name } = req.body;
  client.query('INSERT INTO items(name) VALUES($1) RETURNING *;', [name], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Endpoint to get items for the UI
app.get('/items', (req, res) => {
  client.query('SELECT * FROM items;', (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
