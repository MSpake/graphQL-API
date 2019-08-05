'use strict';

require('dotenv').config();
const express = require('express');
const express_graphql = require('express-graphql');
const pg = require('pg');

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
  orders: getOrders,
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

//=====================================

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));