CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  item_type VARCHAR(50) NOT NULL
);

INSERT INTO orders (order_id, item_name, quantity, status, item_type) VALUES
  (1001, 'Coke', 2, 'Pending', 'drinks'),
  (1002, 'Chicken Burger', 1, 'Preparing', 'mains'),
  (1003, 'Fries', 3, 'Pending', 'sides'),
  (1004, 'Lemon Tea', 1, 'Ready', 'drinks'),
  (1005, 'Salad', 2, 'Preparing', 'sides');
