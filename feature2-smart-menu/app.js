const express = require('express');
const path = require('path');
const { dedupeMeals } = require('./utils/mealUtils');
const pool = require('./db/pool');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes/menu'));

// API endpoint for filtered meals
app.get('/api/meals', async (req, res) => {
  try {
    const { caloriesMax, proteinMax, carbsMax, fatsMax } = req.query;

    const connection = await pool.getConnection();

    let query = 'SELECT * FROM meals WHERE 1=1';
    const params = [];

    if (caloriesMax) {
      query += ' AND calories <= ?';
      params.push(parseInt(caloriesMax));
    }
    if (proteinMax) {
      query += ' AND protein <= ?';
      params.push(parseInt(proteinMax));
    }
    if (carbsMax) {
      query += ' AND carbs <= ?';
      params.push(parseInt(carbsMax));
    }
    if (fatsMax) {
      query += ' AND fats <= ?';
      params.push(parseInt(fatsMax));
    }

    const [meals] = await connection.execute(query, params);
    connection.release();

    res.json(dedupeMeals(meals));
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

app.listen(PORT, () => {
  console.log(`Smart Menu app running on http://localhost:${PORT}`);
});