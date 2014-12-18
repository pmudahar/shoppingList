'use strict';

angular.module('shoppingApp')
  .factory('shoppingList', function ($http) {
    // Service logic
    

    var meaningOfLife = 42;
    var list = [];


    // Public API here
    return {
      getPrice: function (name, callback) {
        $http.post('/api/shoppingItems/getPrice', {name: name}).success(function(data){
          
          callback(data.price)
          
        });
      },

      addItem: function(item){
        $http.post('/api/shoppingItems/addItem', item).success(function(data){
          list = data;
        });
      },

      getList: function(callback){
        $http.get('api/shoppingItems/').success(function(data){
          list = data;

          callback(data);
        });
      },

      changeStatus: function(item, callback){
        $http.put('/api/shoppingItems/'+item._id, item) .success(function(data){
          callback();
        });
      }

    };
  });
