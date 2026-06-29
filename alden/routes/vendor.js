const express = require('express');
const { createPool } = require('mysql2/promise');

const router = express.Router();

const sampleOrders = [
  { order_id: 1001, item_name: 'Coke', quantity: 2, status: 'Pending', item_type: 'drinks' },
  { order_id: 1002, item_name: 'Chicken Burger', quantity: 1, status: 'Preparing', item_type: 'mains' },
  { order_id: 1003, item_name: 'Fries', quantity: 3, status: 'Pending', item_type: 'sides' },
  { order_id: 1004, item_name: 'Lemon Tea', quantity: 1, status: 'Ready', item_type: 'drinks' },
  { order_id: 1005, item_name: 'Salad', quantity: 2, status: 'Preparing', item_type: 'sides' }
];

function normalizeOrder(row) {
  return {
    order_id: row.order_id ?? row.OrderID ?? row.orderId,
    item_name: row.item_name ?? row.itemName ?? 'Unknown item',
    quantity: row.quantity ?? 1,
    status: row.status ?? 'Pending',
    item_type: (row.item_type ?? row.itemType ?? 'mains').toLowerCase()
  };
}

async function getOrdersFromDb() {
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
    return sampleOrders.map(normalizeOrder);
  }

  const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0
  });

  try {
    const [rows] = await pool.query('SELECT order_id, item_name, quantity, status, item_type FROM orders ORDER BY item_type, order_id');
    return rows.map(normalizeOrder);
  } catch (error) {
    console.error('Database query failed, falling back to sample data:', error.message);
    return sampleOrders.map(normalizeOrder);
  } finally {
    await pool.end();
  }
}

function groupOrdersByType(orders) {
  const grouped = { drinks: [], mains: [], sides: [] };

  orders.forEach((order) => {
    const type = order.item_type?.toLowerCase();
    if (type && grouped[type]) {
      grouped[type].push(order);
    } else {
      grouped.mains.push(order);
    }
  });

  return grouped;
}

router.get('/vendor-dashboard', async (req, res) => {
  const orders = await getOrdersFromDb();
  const groupedOrders = groupOrdersByType(orders);

  res.render('vendor-dashboard', {
    groupedOrders,
    hasOrders: orders.length > 0,
    orders
  });
});

router.groupOrdersByType = groupOrdersByType;
router.getOrdersFromDb = getOrdersFromDb;
module.exports = router;
