const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/pool');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register', { error: null, success: null });
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.render('register', { error: 'All fields are required.', success: null });
  }

  try {
    const connection = await pool.getConnection();
    const [existing] = await connection.execute('SELECT user_id FROM users WHERE email = ?', [email]);

    if (existing.length) {
      connection.release();
      return res.render('register', { error: 'Email already exists. Please use another one.', success: null });
    }

    const password_hash = await bcrypt.hash(password, 10);
    await connection.execute(
      'INSERT INTO users (username, email, password_hash, weight_kg, height_cm, fitness_goal, target_calories, target_protein_g, target_carbs_g, target_fats_g) VALUES (?, ?, ?, 70, 170, "Maintain", 2000, 150, 200, 70)',
      [username, email, password_hash]
    );
    connection.release();

    return res.render('login', { error: null, success: 'Registration successful. Please log in.' });
  } catch (error) {
    console.error(error);
    return res.render('register', { error: 'Registration failed. Please try again.', success: null });
  }
});

router.get('/login', (req, res) => {
  res.render('login', { error: null, success: null });
});

router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.render('login', { error: 'Email or username and password are required.', success: null });
  }

  try {
    const connection = await pool.getConnection();
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1',
      [identifier, identifier]
    );
    connection.release();

    if (!users.length) {
      return res.render('login', { error: 'Invalid credentials.', success: null });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.render('login', { error: 'Invalid credentials.', success: null });
    }

    req.session.user = {
      user_id: user.user_id,
      username: user.username,
      email: user.email
    };
    return res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    return res.render('login', { error: 'Login failed. Please try again.', success: null });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
