const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/dashboard', (req, res) => {
    const query = `SELECT * FROM orders ORDER BY item_type`;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        const grouped = {};
        results.forEach(order => {
            if (!grouped[order.item_type]) {
                grouped[order.item_type] = [];
            }
            grouped[order.item_type].push(order);
        });
        res.render('vendor-dashboard', { grouped });
    });
});

module.exports = router;
