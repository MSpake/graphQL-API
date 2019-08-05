'use strict';

//=====================================
// Global Variables and Configuration
//=====================================

require('dotenv').config();
const express = require('express');
const express_graphql = require('express-graphql');
const pg = require('pg');

const schema = require('./modules/graphql-schema');
const getOrders = require('./modules/functions/get-orders.js');
const getSingleOrder = require('./modules/functions/get-single-order.js');
const createNewOrder = require('./modules/functions/create-new-order.js');
const createNewPayment = require('./modules/functions/create-new-payment.js');

//-------------------------------------

const { PORT, DATABASE_URL, DUPLICATES_CHECK_TIME_DELAY } = process.env;

const root = {
  getOrders: getOrdersWrapper,
  getSingleOrder: getSingleOrderWrapper,
  createNewOrder: createNewOrderWrapper,
  createNewPayment: createNewPaymentWrapper,
}

const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.error(error));
client.connect();

const app = express();

//=====================================
// Router
//=====================================

app.use('/', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

//=====================================
// Conttroller Function Wrappers
//=====================================

async function getOrdersWrapper() {
  return await getOrders(client);
}

async function getSingleOrderWrapper(args) {
  return await getSingleOrder(args, client);
}

async function createNewOrderWrapper(args) {
  return await createNewOrder(args, client);
}

async function createNewPaymentWrapper(args) {
  return await createNewPayment(args, client, DUPLICATES_CHECK_TIME_DELAY);
}

//=====================================
// Runtime
//=====================================

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));