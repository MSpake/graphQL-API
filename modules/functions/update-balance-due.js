'use strict';

const SQL = require('../sql-commands.js');

module.exports = async function (order_number, amount, client) {
  const result = await client.query(SQL.getBalanceDue, [order_number]);
  let newBalance = result.rows[0].balance_due;
  
  newBalance = newBalance - amount;
  await client.query(SQL.updateBalanceDue, [newBalance, order_number]);

  return newBalance;
}