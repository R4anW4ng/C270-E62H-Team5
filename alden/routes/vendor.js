const express = require('express');
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

router.get('/vendor-dashboard', (req, res) => {
  const groupedOrders = groupOrdersByType(sampleOrders);
  res.render('vendor-dashboard', {
    groupedOrders,
    hasOrders: sampleOrders.length > 0,
    orders: sampleOrders
  });
});

router.groupOrdersByType = groupOrdersByType;
module.exports = router;
