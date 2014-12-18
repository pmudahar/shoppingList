/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Shoppingitem = require('./shoppingItem.model');

exports.register = function(socket) {
  Shoppingitem.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Shoppingitem.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('shoppingItem:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('shoppingItem:remove', doc);
}