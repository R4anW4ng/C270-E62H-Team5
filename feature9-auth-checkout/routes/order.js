const express = require('express');
const pool = require('../db/pool');
const router = express.Router();

const sampleMeals = [
  { meal_name: 'Chicken Bowl', calories: 520, protein_g: 35, carbs_g: 55, fats_g: 18 },
  { meal_name: 'Salmon Plate', calories: 610, protein_g: 40, carbs_g: 42, fats_g: 24 },
  { meal_name: 'Veggie Wrap', calories: 430, protein_g: 18, carbs_g: 48, fats_g: 15 },
  { meal_name: 'Greek Yogurt Bowl', calories: 360, protein_g: 25, carbs_g: 35, fats_g: 10 },
  { meal_name: 'Pasta Primavera', calories: 680, protein_g: 22, carbs_g: 80, fats_g: 25 }
];

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

router.use(requireLogin);

router.get('/dashboard', async (req, res) => {
  const userId = req.session.user.user_id;
  const today = new Date().toISOString().slice(0, 10);

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM daily_logs WHERE user_id = ? AND date = ? LIMIT 1',
      [userId, today]
    );
    connection.release();

    const summary = rows[0] || {
      consumed_calories: 0,
      consumed_protein_g: 0,
      consumed_carbs_g: 0,
      consumed_fats_g: 0
    };

    res.render('dashboard', {
      user: req.session.user,
      summary,
      today,
      message: req.query.success ? 'Order placed successfully.' : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to load dashboard.');
  }
});

router.get('/checkout', (req, res) => {
  res.render('checkout', { meals: sampleMeals, error: null, success: null });
});

router.post('/checkout', async (req, res) => {
  const userId = req.session.user.user_id;
  const { meal_name } = req.body;

  const selectedMeal = sampleMeals.find((meal) => meal.meal_name === meal_name);

  if (!selectedMeal) {
    return res.render('checkout', { meals: sampleMeals, error: 'Please select a valid meal.', success: null });
  }

  const today = new Date().toISOString().slice(0, 10);

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO orders (user_id, meal_name, calories, protein_g, carbs_g, fats_g, order_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, selectedMeal.meal_name, selectedMeal.calories, selectedMeal.protein_g, selectedMeal.carbs_g, selectedMeal.fats_g, today]
    );

    const [existingLogs] = await connection.execute(
      'SELECT * FROM daily_logs WHERE user_id = ? AND date = ? LIMIT 1',
      [userId, today]
    );

    if (existingLogs.length) {
      const log = existingLogs[0];
      await connection.execute(
        'UPDATE daily_logs SET consumed_calories = consumed_calories + ?, consumed_protein_g = consumed_protein_g + ?, consumed_carbs_g = consumed_carbs_g + ?, consumed_fats_g = consumed_fats_g + ? WHERE log_id = ?',
        [selectedMeal.calories, selectedMeal.protein_g, selectedMeal.carbs_g, selectedMeal.fats_g, log.log_id]
      );
    } else {
      await connection.execute(
        'INSERT INTO daily_logs (user_id, date, consumed_calories, consumed_protein_g, consumed_carbs_g, consumed_fats_g) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, today, selectedMeal.calories, selectedMeal.protein_g, selectedMeal.carbs_g, selectedMeal.fats_g]
      );
    }

    connection.release();
    return res.redirect('/dashboard?success=1');
  } catch (error) {
    console.error(error);
    return res.render('checkout', { meals: sampleMeals, error: 'Checkout failed. Please try again.', success: null });
  }
});

module.exports = router;
