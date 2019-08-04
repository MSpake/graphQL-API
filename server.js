'use strict';

const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

const testData = require('./test-data.js');

const PORT = process.env.PORT || 3000;

const schema = buildSchema(`
    type Query {
        orders: [Order]
    },
    type Order {
        id: Int
        description: String
        total: Float
        balanceDue: Float
    },
    type Payment {
      id: Int
      orderId: Int
      amount: Float
      appliedAt: Int
      note: String
    }
`);

const root = {
  orders: getOrders,
}

var app = express();
app.use('/', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

function getOrders(args) {
  //connect to database
  return testData;
}


app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
/*
Orders
We don't need anything too complex. An order can be as simple as a description of the item(s) purchased, and the total cost. And since we're allowing multiple payments, we need to keep track of the balance due.

It might also be nice to allow clients to request the list of payments that have been applied to an order, so let's include that too.

We also need some way to identify the order.

So an Order might look like:

id - Some identifier
description - Just a string describing the product(s) purchased
total - The total value of the order
balanceDue - How much is still owed
paymentsApplied - The list of payments applied to this order so far
Payments
A payment should belong to an order, and just define an amount paid. It's probably also a good idea to keep track of when the payment was made. Maybe an optional note might be useful too.

So a Payment might look something like this:

id - Some identifier
amount - The amount of the payment
appliedAt - When the payment was applied
note - An optional string
*/