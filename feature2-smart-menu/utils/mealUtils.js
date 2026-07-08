function dedupeMeals(meals) {
  const seen = new Set();

  return meals.filter((meal) => {
    const identity = [
      meal.meal_name,
      meal.restaurant_name,
      meal.calories,
      meal.protein,
      meal.carbs,
      meal.fats
    ].join('|');

    if (seen.has(identity)) {
      return false;
    }

    seen.add(identity);
    return true;
  });
}

module.exports = { dedupeMeals };
