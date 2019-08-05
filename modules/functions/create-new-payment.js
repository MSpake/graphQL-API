'use strict';

const SQL = require('../sql-commands.js');
const checkForDuplicatePayment = require('./check-for-duplicate-payment.js');
const updateBalanceDue = require('./update-balance-due.js');

module.exports = async function (args, client, DUPLICATES_CHECK_TIME_DELAY) {
  const { order_number, amount } = args.input;
  let note = args.input.note || '';
  const appliedAt = new Date(Date.now()).toString();

  const duplicatePayment = await checkForDuplicatePayment(order_number, amount, appliedAt, DUPLICATES_CHECK_TIME_DELAY, client);

  if(duplicatePayment) {
    throw new Error('Duplicate payment detected. If you intended to make a second payment, please wait a few minutes and try again. Thank you.');
  } else {
    const newBalanceDue = await updateBalanceDue(order_number, amount, client);
  
    if(newBalanceDue < 0) note = note + ' Over payed, reimbursement required.';
  
    const result = await client.query(SQL.insertPayment, [order_number, amount, appliedAt, note])
    const newPayment = result.rows[0];
  
    return newPayment;
  }
}