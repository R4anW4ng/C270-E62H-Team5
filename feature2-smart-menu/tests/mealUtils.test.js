const test = require('node:test');
const assert = require('node:assert/strict');
const { dedupeMeals } = require('../utils/mealUtils');

test('dedupeMeals removes exact duplicate meals', () => {
  const meals = [
    { meal_name: 'Salad', restaurant_name: 'Cafe', calories: 200, protein: 10, carbs: 30, fats: 5 },
    { meal_name: 'Salad', restaurant_name: 'Cafe', calories: 200, protein: 10, carbs: 30, fats: 5 },
    { meal_name: 'Soup', restaurant_name: 'Cafe', calories: 180, protein: 5, carbs: 20, fats: 4 }
  ];

  const result = dedupeMeals(meals);

  assert.equal(result.length, 2);
  assert.deepEqual(result[0], meals[0]);
  assert.deepEqual(result[1], meals[2]);
});
