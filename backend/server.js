const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Update with your password
  database: 'movie_app'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

const secret = 'your_jwt_secret'; // Use a more secure secret in production

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) return res.status(500).send('Server error');
    if (result.length > 0) return res.status(409).send({ message: 'Email already registered' });

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).send('Server error');
      res.status(200).send('User registered');
    });
  });
});

/*app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return res.status(401).send('Invalid password');

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({ auth: true, token, user });
  });
});*/
app.post('/login', (req, res) => {
  const { email } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({ auth: true, token, user });
  });
});

app.get('/user', (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) return res.status(401).send('No token provided');

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token');

    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [decoded.id], (err, results) => {
      if (err) return res.status(500).send('Server error');
      res.status(200).send(results[0]);
    });
  });
});


// Add movie to wishlist
app.post('/wishlist', (req, res) => {
  const { user_id, movie_id, title, poster, year, plot } = req.body;
  const sql = 'INSERT INTO wishlist (user_id, movie_id, title, poster, year, plot) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [user_id, movie_id, title, poster, year, plot], (err, result) => {
    if (err) throw err;
    res.send({ success: true, message: 'Movie added to wishlist' });
  });
});

// Get wishlist for a user
app.get('/wishlist/:user_id', (req, res) => {
  const { user_id } = req.params;
  const sql = 'SELECT * FROM wishlist WHERE user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Remove movie from wishlist
app.delete('/wishlist', (req, res) => {
  const { user_id, movie_id } = req.body;
  const sql = 'DELETE FROM wishlist WHERE user_id = ? AND movie_id = ?';
  db.query(sql, [user_id, movie_id], (err, result) => {
    if (err) throw err;
    res.send({ success: true, message: 'Movie removed from wishlist' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
