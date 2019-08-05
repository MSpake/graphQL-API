const orders = [
  {
    id: 1,
    description: 'first entry',
    total: 12.67,
    balanceDue: 10.00,
  },
  {
    id: 2,
    description: 'second entry',
    total: 100.00,
    balanceDue: 50.00,
  },
  {
    id: 3,
    description: 'third entry',
    total: 3.00,
    balanceDue: 1.50,
  }
]

const payments = [
  {
    id: 1,
    orderId: 2,
    amount: 20.00,
    appliedAt: 1564970615638,
    notes: null,
  },
  {
    id: 2,
    orderId: 2,
    amount: 30.00,
    appliedAt: 1564970747405,
    notes:'half way there',
  },
  {
    id: 3,
    orderId: 3,
    amount: 1.50,
    appliedAt: 1564971247405,
    notes: 'Why not just pay all of it?',
  },
  {
    id: 4,
    orderId: 1,
    amount: 2.67,
    appliedAt: 1564970607405,
    notes: 'Whyyyy?',
  }
]
module.exports = { orders, payments }