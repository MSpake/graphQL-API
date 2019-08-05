'use strict';

const commands = {
  getAllOrders: 'SELECT * FROM orders;',
  getAllPayments: 'SELECT * FROM payments;',
  getSingleOrder: 'SELECT * FROM orders WHERE order_number=$1;',
  getPaymentsByOrderNumber: 'SELECT * FROM payments WHERE order_number=$1;',
  insertOrder: 'INSERT INTO orders (order_number, description, total, balance_due) VALUES ($1, $2, $3, $4) RETURNING *;',
  insertPayment: 'INSERT INTO payments (order_number, amount, applied_at, note) VALUES ($1, $2, $3, $4) RETURNING *;',
  getBalanceDue: 'SELECT balance_due FROM orders WHERE order_number=$1;',
  updateBalanceDue: 'UPDATE orders SET balance_due=$1 WHERE order_number=$2 RETURNING *;',
}

module.exports = commands;
