'use strict';

const SQL = require('../sql-commands.js');

module.exports = async function (args, client) {
  const { order_number } = args;
  const orderResult = await client.query(SQL.getSingleOrder, [order_number]);

  const paymentResults = await client.query(SQL.getPaymentsByOrderNumber, [order_number]);

  const payments = [...paymentResults.rows];
  const order = {...orderResult.rows[0]};

  order.payments_applied = payments;


  return order;
}