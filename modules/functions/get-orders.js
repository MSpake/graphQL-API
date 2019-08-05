'use strict';

const SQL = require('../sql-commands.js');

module.exports = async function (client) {
  const orderResults = await client.query(SQL.getAllOrders);
  const paymentResults = await client.query(SQL.getAllPayments);

  const payments = [...paymentResults.rows];
  const orders = [...orderResults.rows];

  orders.forEach( order => {
    order.payments_applied = payments.filter( payment => payment.order_number === order.order_number)
  })

  return orders;
}