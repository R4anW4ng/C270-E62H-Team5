# Database Setup Instructions

## ❌ MySQL CLI Not Found

The `mysql` command is not available in your system PATH. Here are several ways to set up the database:

---

## Option 1: Install MySQL (Recommended)

### macOS (using Homebrew)
```bash
brew install mysql
brew services start mysql
mysql -u root < db/menu.sql
```

### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo mysql < db/menu.sql
```

### Windows
1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Run the installer and complete installation
3. Add MySQL to your PATH:
   - Typically: `C:\Program Files\MySQL\MySQL Server X.X\bin`
4. Run: `setup-db.bat`

---

## Option 2: Use Docker (No Installation Required)

### Prerequisites
- Install Docker from https://www.docker.com/products/docker-desktop

### Steps
```bash
# 1. Start MySQL in Docker
docker run --name mysql-smartmenu \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3306:3306 \
  -d mysql:latest

# 2. Wait 10 seconds for MySQL to start, then setup database
sleep 10
docker exec -i mysql-smartmenu mysql -u root -proot < db/menu.sql

# 3. Verify
docker exec -i mysql-smartmenu mysql -u root -proot -e "USE feature2_db; SELECT COUNT(*) as meal_count FROM meals;"

# 4. Update app.js connection if needed (password should be 'root')
```

**To stop/remove container later:**
```bash
docker stop mysql-smartmenu
docker rm mysql-smartmenu
```

---

## Option 3: Use MySQL Workbench (GUI)

1. Download MySQL Workbench: https://dev.mysql.com/downloads/workbench/
2. Open MySQL Workbench
3. Create new connection (if needed)
4. Open `db/menu.sql` file
5. Click Execute (⚡ icon)
6. Verify database created: should see `feature2_db` in left sidebar

---

## Option 4: Manual Database Creation

### Using any MySQL client:

```sql
-- Copy and paste this entire SQL into your MySQL client

CREATE DATABASE IF NOT EXISTS feature2_db;
USE feature2_db;

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

-- Verify
SELECT COUNT(*) as meal_count FROM meals;
```

---

## Verify Database Setup

After setup, verify the database was created:

```bash
# Using mysql CLI
mysql -u root -p -e "USE feature2_db; SELECT * FROM meals LIMIT 5;"

# Or using docker
docker exec -i mysql-smartmenu mysql -u root -proot -e "USE feature2_db; SELECT * FROM meals LIMIT 5;"
```

You should see 15 meals displayed.

---

## Update Connection Password (if needed)

If you used a different password for MySQL, update both files:

1. **app.js** (line ~13)
   ```javascript
   password: 'your_mysql_password'
   ```

2. **routes/menu.js** (line ~9)
   ```javascript
   password: 'your_mysql_password'
   ```

---

## Start the App

Once database is ready:

```bash
npm install          # Install dependencies
npm start            # Start server
# Open http://localhost:3000
```

---

## Troubleshooting

**Error: "connect ECONNREFUSED 127.0.0.1:3306"**
- MySQL is not running
- Start MySQL service or Docker container

**Error: "Access denied for user 'root'@'localhost'"**
- Wrong password in connection settings
- Update password in `app.js` and `routes/menu.js`

**Error: "Unknown database 'feature2_db'"**
- Database not created yet
- Run the setup script or manual SQL commands

---

**Need Help?** Check the main README.md for more information!
