'use strict';

var _ = require('lodash');
var Shoppingitem = require('./shoppingItem.model');
var request = require('request');

// Get list of shoppingItems
exports.index = function(req, res) {
  Shoppingitem.find(function (err, shoppingItems) {
    if(err) { return handleError(res, err); }
    return res.json(200, shoppingItems);
  });
};

// get price of an item
exports.getPrice = function(req, res){
  var url = 'http://item-price.herokuapp.com/get_price';

  var options = {
    url: url,
    qs: {
      item: req.body.name
    }
  };

  request(options, function(err, response, body){
    return res.send(body);
  });
};


// add item to list
exports.addItem = function(req, res){
  Shoppingitem.create(req.body, function(err, shoppingItem) {
    if(err) { return handleError(res, err); }
    return res.json(201, shoppingItem);
  });
};


// exports.changeStatus = function(req, res){
//   Shoppingitem.findById(req.params.id, function (err, shoppingItem) {
  

//   }

// }


// Get a single shoppingItem
exports.show = function(req, res) {
  Shoppingitem.findById(req.params.id, function (err, shoppingItem) {
    if(err) { return handleError(res, err); }
    if(!shoppingItem) { return res.send(404); }
    return res.json(shoppingItem);
  });
};

// Creates a new shoppingItem in the DB.
exports.create = function(req, res) {
  Shoppingitem.create(req.body, function(err, shoppingItem) {
    if(err) { return handleError(res, err); }
    return res.json(201, shoppingItem);
  });
};

// Updates an existing shoppingItem in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Shoppingitem.findById(req.params.id, function (err, shoppingItem) {
    if (err) { return handleError(res, err); }
    if(!shoppingItem) { return res.send(404); }
    var updated = _.merge(shoppingItem, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, shoppingItem);
    });
  });
};

// Deletes a shoppingItem from the DB.
exports.destroy = function(req, res) {
  Shoppingitem.findById(req.params.id, function (err, shoppingItem) {
    if(err) { return handleError(res, err); }
    if(!shoppingItem) { return res.send(404); }
    shoppingItem.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}