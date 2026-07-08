const express = require('express');
const { dedupeMeals } = require('../utils/mealUtils');
const pool = require('../db/pool');
const router = express.Router();

const sampleMeals = [
  { meal_name: 'Truffle Herb Chicken', restaurant_name: 'Velora Bistro', calories: 620, protein: 42, carbs: 48, fats: 24 },
  { meal_name: 'Citrus Salmon Bowl', restaurant_name: 'North Harbor', calories: 540, protein: 36, carbs: 41, fats: 19 },
  { meal_name: 'Garden Glow Pasta', restaurant_name: 'Olive & Oak', calories: 690, protein: 25, carbs: 82, fats: 27 },
  { meal_name: 'Miso Mushroom Rice', restaurant_name: 'Kumo House', calories: 510, protein: 18, carbs: 74, fats: 16 },
  { meal_name: 'Rosemary Lamb Plate', restaurant_name: 'Maison Noir', calories: 760, protein: 44, carbs: 53, fats: 34 },
  { meal_name: 'Lemon Thyme Quiche', restaurant_name: 'Cedar & Crumb', calories: 580, protein: 23, carbs: 45, fats: 28 }
];

// GET / - Display home page with all meals
router.get('/', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [meals] = await connection.execute('SELECT * FROM meals ORDER BY restaurant_name, meal_name');
    const uniqueMeals = dedupeMeals(meals);
    res.render('index', { meals: uniqueMeals.length ? uniqueMeals : sampleMeals });
  } catch (error) {
    console.error('Using sample meals because database is unavailable:', error.message);
    res.render('index', { meals: sampleMeals });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = router;