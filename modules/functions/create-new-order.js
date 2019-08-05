'use strict';

const uuid = require('uuid/v1');

const SQL = require('../sql-commands.js');

module.exports = async function (args, client) {
  const { description, total } = args.input;
  const orderNumber = uuid();
  const balanceDue = total;

  const result =  await client.query(SQL.insertOrder, [orderNumber, description, total, balanceDue]);
  return result.rows[0];
}