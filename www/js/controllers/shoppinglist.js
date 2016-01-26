/**
 * Controller that shows an overview of all the shoppinglists
 */
angular.module('superio')

  .controller('ShoppinglistCtrl', function ($scope, ShoppinglistService, $cordovaToast) {
    // Initializes the lists
    $scope.lists = [];

    /**
     * Deletes an item from the overview
     *
     * @param item
     */
    $scope.onItemDelete = function (item) {
      var id = item.id;

      ShoppinglistService
        .delete(id)
        .success(function () {
          // Show a toast message
          $cordovaToast
            .show('Succesvol verwijderd', 'long', 'bottom')
            .then(function () {
              console.log('Toast launched!');
            }, function (err) {
              console.log('Couldn\'t make a toast!');
            });
        })
        .error(function (err) {
          console.log('Deleting failed');
          console.log(err);
        })
        .finally(function () {
          // Splices the deleted item from the overview
          $scope.lists.splice($scope.lists.indexOf(item), 1);
        });
    };

    $scope.createList = function () {
      var shoppinglist = {
        title: new Date().toJSON().slice(0,10)
      };

      ShoppinglistService
        .create(shoppinglist)
        .success(function () {
          $scope.getItems();
        })
        .error(function (err) {
          console.log(err);
          console.log('Something went wrong');
        });
    };

    /**
     * Fetches the shoppinglists for this user
     */
    $scope.getItems = function () {
      ShoppinglistService
        .get()
        .success(function (res) {
          $scope.lists = res;
        })
        .error(function (err) {
          console.log(err);
        })
        .finally(function () {
          // Broadcast that the items are reloaded, so the animation goes away
          $scope.$broadcast('scroll.refreshComplete');
        })
    };

    // Populate the list for the first time
    $scope.getItems();
  });
