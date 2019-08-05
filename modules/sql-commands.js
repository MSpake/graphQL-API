'use strict';

const commands = {
  getAllOrders: 'SELECT * FROM orders;',
  getAllPayments: 'SELECT * FROM payments;',
  insertOrder: 'INSERT INTO orders (order_number, description, total, balance_due) VALUES ($1, $2, $3, $4) RETURNING *;',
}

module.exports = commands;