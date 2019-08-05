DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS payments;

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(255) NOT NULL,
  total FLOAT,
  balance_due FLOAT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(255) NOT NULL,
  amount FLOAT,
  applied_at TEXT,
  note TEXT
);

INSERT INTO orders (order_number, total, balance_due, description) VALUES (
  'a2e7cb2e-b797-11e9-a2a3-2a2ae2dbcce4',
  100.00,
  50.00,
  'First order'
);

INSERT INTO orders (order_number, total, balance_due, description) VALUES (
  'a2e7cdea-b797-11e9-a2a3-2a2ae2dbcce4',
  1200.00,
  1000.00,
  'Second order'
);

INSERT INTO orders (order_number, total, balance_due, description) VALUES (
  'a2e7cf3e-b797-11e9-a2a3-2a2ae2dbcce4',
  20.00,
  0.00,
  'Third order'
);

INSERT INTO orders (order_number, total, balance_due, description) VALUES (
  'a2e7d1aa-b797-11e9-a2a3-2a2ae2dbcce4',
  90.50,
  57.00,
  'Fouth order'
);

INSERT INTO payments (order_number, amount, applied_at) VALUES (
  'a2e7cb2e-b797-11e9-a2a3-2a2ae2dbcce4',
  25.00,
  'Mon Aug 05 2019 08:49:47 GMT-0700 (Pacific Daylight Time)'
);

INSERT INTO payments (order_number, amount, applied_at) VALUES (
  'a2e7cb2e-b797-11e9-a2a3-2a2ae2dbcce4',
  25.00,
  'Fri May 29 2019 01:36:27 GMT-0800 (Pacific Standard Time)'
);

INSERT INTO payments (order_number, amount, applied_at) VALUES (
  'a2e7cdea-b797-11e9-a2a3-2a2ae2dbcce4',
  200.00,
  'Wed Jul 24 2019 19:03:07 GMT-0700 (Pacific Daylight Time)'
);

INSERT INTO payments (order_number, amount, applied_at) VALUES (
  'a2e7cf3e-b797-11e9-a2a3-2a2ae2dbcce4',
  20.00,
  'Mon Aug 01 2019 07:29:47 GMT-0700 (Pacific Daylight Time)'
);

INSERT INTO payments (order_number, amount, applied_at) VALUES (
  'a2e7d1aa-b797-11e9-a2a3-2a2ae2dbcce4',
  23.50,
  'Thu Apr 18 2019 13:43:07 GMT-0700 (Pacific Daylight Time)'
);