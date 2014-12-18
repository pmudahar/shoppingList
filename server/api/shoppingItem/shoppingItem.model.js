'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShoppingitemSchema = new Schema({
  username: String,
  name: String,
  amount: Number,
  tags: [],
  price: Number,
  totalPrice: Number,
  purchased: Boolean
});

module.exports = mongoose.model('Shoppingitem', ShoppingitemSchema);