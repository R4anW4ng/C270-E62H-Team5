CREATE DATABASE IF NOT EXISTS splitthebill;
USE splitthebill;

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    item_type VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending'
);

INSERT INTO orders (item_name, item_type, quantity, status) VALUES
('Chicken Rice', 'mains', 2, 'pending'),
('Milo', 'drinks', 3, 'pending'),
('Spring Roll', 'sides', 1, 'pending'),
('Nasi Lemak', 'mains', 1, 'preparing'),
('Teh Tarik', 'drinks', 2, 'ready');
