'use strict';

const SQL = require('../sql-commands.js');

module.exports = async function (orderNumber, amount, appliedAt, DUPLICATES_CHECK_TIME_DELAY, client) {
  const results = await client.query(SQL.getPaymentsByOrderNumber, [orderNumber]);
  if(results.rows.length > 0) {
    const lastPayment = results.rows[results.rows.length - 1];

    const difference = (new Date(appliedAt).getTime()) - (new Date(lastPayment.applied_at).getTime());

    if(lastPayment.amount === amount && difference < DUPLICATES_CHECK_TIME_DELAY) {
      return true;
    }
    else return false;
  }
}