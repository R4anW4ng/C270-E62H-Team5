-- Create database
CREATE DATABASE IF NOT EXISTS feature2_db;
USE feature2_db;

-- Create meals table
CREATE TABLE IF NOT EXISTS meals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meal_name VARCHAR(100) NOT NULL,
    restaurant_name VARCHAR(100) NOT NULL,
    calories INT NOT NULL,
    protein INT NOT NULL,
    carbs INT NOT NULL,
    fats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample meal data (10+ meals with varied nutritional values)
INSERT INTO meals (meal_name, restaurant_name, calories, protein, carbs, fats) VALUES
('Grilled Chicken Breast', 'Healthy Eats', 165, 31, 0, 3),
('Caesar Salad with Chicken', 'Garden Fresh', 320, 28, 12, 18),
('Salmon Fillet with Vegetables', 'Ocean Bistro', 380, 35, 15, 18),
('Turkey Wrap', 'Quick Bites', 280, 22, 35, 6),
('Veggie Burger', 'Plant Power', 310, 15, 42, 8),
('Greek Salad', 'Mediterranean Grill', 250, 8, 20, 14),
('Beef Steak with Sweet Potato', 'Prime Cuts', 520, 42, 38, 18),
('Quinoa Buddha Bowl', 'Zen Kitchen', 420, 14, 58, 12),
('Pasta Carbonara', 'Italian Kitchen', 640, 24, 72, 28),
('Sushi Platter', 'Tokyo Express', 280, 18, 42, 5),
('Chicken Fajitas', 'Taco Fiesta', 450, 28, 48, 15),
('Tofu Stir-Fry', 'Asian Fusion', 320, 20, 38, 10),
('Breakfast Omelette', 'Morning Glory', 280, 24, 8, 16),
('Fish and Chips', 'Harbor Grill', 580, 32, 62, 20),
('Vegetable Soup with Bread', 'Comfort Kitchen', 380, 12, 52, 10);