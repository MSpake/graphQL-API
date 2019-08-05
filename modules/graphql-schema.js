'use strict';

const { buildSchema } = require('graphql');


const schema = buildSchema(`
    type Query {
        orders: [Order]
    },
    type Order {
        order_number: String
        description: String
        total: Float
        balance_due: Float
        payments_applied: [Payment]
    },
    type Payment {
      id: Int
      order_number: String
      amount: Float
      applied_at: String
      note: String
    }
`);

module.exports = schema;