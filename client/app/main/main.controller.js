'use strict';

angular.module('shoppingApp')
  .controller('MainCtrl', function ($scope, $http, socket, $window, $location, Auth, shoppingList) {

    var reset = function(){
      $scope.item = {
        username: Auth.getCurrentUser().name,
        name: '',
        amount: '',
        tags: [],
        price: '',
        totalPrice: '',
        purchased: false
      }; 
      $scope.tags = '';
    }


    // calculates the total price of the current list
    $scope.totalPrice = function(){
      var total = 0;
      if ($scope.list){
        for (var i = 0; i < $scope.list.length; i++)
          total += $scope.list[i].totalPrice;

      }
      return total;
    }


    // find out how many things left to buy
    var stuffToBuy = function(){
      var count = 0;

      for (var i = 0; i < $scope.list.length; i++)
        if ($scope.list[i].purchased === false)
          count++;

      return count;
    }


    // get complete list of items
    var init = function(callback){
      shoppingList.getList(function(data){
        $scope.org = data;
        $scope.list = data;
        $scope.unpurchased = stuffToBuy();
        
        if (callback) callback();
      });
    }


    // filters the current list depending on parameters, not purchased items or everything
    $scope.filterList = function(value){
        $scope.list = angular.copy($scope.org);

        if (value === false){
          $scope.list = $scope.org.filter(function(item){
            return item.purchased === false;
          });
        }
      
    }


    // on submit, add item to shopping list
    $scope.submit = function(){
    
      // convert tags into array of strings
      $scope.item.tags = $scope.tags.replace(/^\s*|\s*$/g,'').split(/\s*,\s*/);
      
      // get price of new item
      shoppingList.getPrice($scope.item.name, function (price){
        $scope.item.price = price;
        $scope.item.totalPrice = (price * $scope.item.amount).toFixed(2);
        shoppingList.addItem($scope.item);
        reset();
        init();
      });

    };


    // change purchased status of shopping item
    $scope.purchase = function(index){
      shoppingList.changeStatus($scope.list[index], function(){
        $scope.unpurchased = stuffToBuy();
        init();
      });
    }


    // open google oauth
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };


    // check if user is logged in
    $scope.loggedIn = function(){
      return Auth.isLoggedIn();
    }


    // logout user
    $scope.logout = function(){
      Auth.logout();
    }

  
    // matches list items that match the query
    $scope.tagMatcher = function(query) {

        // if query is nothing set to original list
        if (query === ''){
          $scope.list = angular.copy($scope.org);
        }

        // else search each item and to find tag matches
        else{
          $scope.list = $scope.org.filter(function(item) {
            var value = false;

            for (var i =0; i < item.tags.length; i++){
              if (item.tags[i] === query)    
                value = true;
            }

            return value;
          });
        }
    };


    // watch for changes in tag query, call tagMatcher if there are changes
    $scope.$watch('query', function(newVal, oldVal){
      if (newVal != oldVal){
        $scope.tagMatcher(newVal);
      }
    });


    //initalize list
    reset();
    init();
  });