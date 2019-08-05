'use strict';

require('dotenv').config();
const express = require('express');
const express_graphql = require('express-graphql');
const pg = require('pg');
const uuid = require('uuid/v1');

const schema = require('./modules/graphql-schema');
const SQL = require('./modules/sql-commands.js');

//=====================================

const PORT = process.env.PORT || 3000;

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.error(error));
client.connect();

const app = express();

//=====================================

const root = {
  getOrders: getOrders,
  getSingleOrder: getSingleOrder,
  createNewOrder: createNewOrder,
  createNewPayment: createNewPayment,
}

//=====================================

app.use('/', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

//=====================================

async function getOrders() {
  const orderResults = await client.query(SQL.getAllOrders);
  const paymentResults = await client.query(SQL.getAllPayments);

  const payments = [...paymentResults.rows];
  const orders = [...orderResults.rows];

  orders.forEach( order => {
    order.payments_applied = payments.filter( payment => payment.order_number === order.order_number)
  })

  return orders;
}

async function getSingleOrder(args) {
  const { order_number } = args;
  const orderResult = await client.query(SQL.getSingleOrder, [order_number]);

  const paymentResults = await client.query(SQL.getPaymentsByOrderNumber, [order_number]);

  const payments = [...paymentResults.rows];
  const order = {...orderResult.rows[0]};

  order.payments_applied = payments;


  return order;
}

async function createNewOrder(args) {
  const { description, total } = args.input;
  const orderNumber = uuid();
  const balanceDue = total;

  const result =  await client.query(SQL.insertOrder, [orderNumber, description, total, balanceDue]);
  return result.rows[0];
}

async function createNewPayment(args) {
  const { order_number, amount } = args.input;
  let note = args.input.note || '';
  const appliedAt = new Date(Date.now()).toString();

  const duplicatePayment = await checkForDuplicatePayment(order_number, amount, appliedAt);

  if(duplicatePayment) {
    throw new Error('Duplicate payment detected. If you intended to make a second payment, please wait a few minutes and try again. Thank you.');
  } else {
    const newBalanceDue = await updateBalanceDue(order_number, amount);
  
    if(newBalanceDue < 0) note = note + ' Over payed, reimbursement required.';
  
    const result = await client.query(SQL.insertPayment, [order_number, amount, appliedAt, note])
    const newPayment = result.rows[0];
  
    return newPayment;
  }
}

async function updateBalanceDue(order_number, amount) {
  const result = await client.query(SQL.getBalanceDue, [order_number]);
  let newBalance = result.rows[0].balance_due;
  
  newBalance = newBalance - amount;
  await client.query(SQL.updateBalanceDue, [newBalance, order_number]);

  return newBalance;
}

async function checkForDuplicatePayment(orderNumber, amount, appliedAt) {
  const results = await client.query(SQL.getPaymentsByOrderNumber, [orderNumber]);
  if(results.rows.length > 0) {
    const lastPayment = results.rows[results.rows.length - 1];
    
    const difference = (new Date(appliedAt).getTime()) - (new Date(lastPayment.applied_at).getTime());

    if(lastPayment.amount === amount && difference < process.env.DUPLICATES_CHECK_TIME_DELAY) {
      return true;
    }
    else return false;
  }
}

//=====================================

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));