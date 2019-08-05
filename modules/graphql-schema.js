'use strict';

const { buildSchema } = require('graphql');


const schema = buildSchema(`
    type Query {
      getOrders: [Order]
      getSingleOrder(order_number: String!): Order
    },
    type Mutation {
      createNewOrder(input: newOrder): Order
      createNewPayment(input: newPayment): Payment
    }
    input newOrder {
      description: String
      total: Float
    }
    input newPayment {
      order_number: String!
      amount: Float!
      note: String
    }
    type Order {
      order_number: String!
      description: String
      total: Float
      balance_due: Float
      payments_applied: [Payment]
    },
    type Payment {
      order_number: String!
      amount: Float
      applied_at: String
      note: String
    }
`);

module.exports = schema;