'use strict';

var express = require('express');
var controller = require('./shoppingItem.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/getPrice', controller.getPrice);
router.post('/addItem', controller.addItem);
module.exports = router;