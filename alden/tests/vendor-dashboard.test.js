const test = require('node:test');
const assert = require('node:assert/strict');
const { app } = require('../app');
const request = require('supertest');
const { groupOrdersByType } = require('../routes/vendor');

test('route returns 200 for vendor dashboard', async () => {
  const response = await request(app).get('/vendor-dashboard');
  assert.equal(response.status, 200);
  assert.match(response.text, /Vendor Fulfillment Dashboard/);
});

test('orders are grouped correctly by item type', () => {
  const orders = [
    { order_id: 1, item_name: 'Coke', quantity: 2, status: 'Pending', item_type: 'drinks' },
    { order_id: 2, item_name: 'Burger', quantity: 1, status: 'Preparing', item_type: 'mains' },
    { order_id: 3, item_name: 'Fries', quantity: 3, status: 'Pending', item_type: 'sides' }
  ];

  const grouped = groupOrdersByType(orders);
  assert.deepEqual(Object.keys(grouped), ['drinks', 'mains', 'sides']);
  assert.equal(grouped.drinks.length, 1);
  assert.equal(grouped.mains.length, 1);
  assert.equal(grouped.sides.length, 1);
});
