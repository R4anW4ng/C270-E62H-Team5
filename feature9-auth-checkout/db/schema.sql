CREATE DATABASE IF NOT EXISTS feature9_db;
USE feature9_db;

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  weight_kg DECIMAL(5,2) DEFAULT 70,
  height_cm DECIMAL(5,2) DEFAULT 170,
  fitness_goal VARCHAR(100) DEFAULT 'Maintain',
  target_calories INT DEFAULT 2000,
  target_protein_g INT DEFAULT 150,
  target_carbs_g INT DEFAULT 200,
  target_fats_g INT DEFAULT 70
);

CREATE TABLE IF NOT EXISTS orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  meal_name VARCHAR(100) NOT NULL,
  calories INT NOT NULL,
  protein_g INT NOT NULL,
  carbs_g INT NOT NULL,
  fats_g INT NOT NULL,
  order_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS daily_logs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  consumed_calories INT DEFAULT 0,
  consumed_protein_g INT DEFAULT 0,
  consumed_carbs_g INT DEFAULT 0,
  consumed_fats_g INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
