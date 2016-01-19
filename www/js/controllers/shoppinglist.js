angular.module('superio')

  .controller('ShoppinglistCtrl', function ($scope, ShoppinglistService) {

    $scope.lists = [];

    $scope.onItemDelete = function (item) {
      var id = item.id;

      ShoppinglistService
        .delete(id)
        .success(function () {
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
          $scope.lists.splice($scope.lists.indexOf(item), 1);
        });
    };

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
          $scope.$broadcast('scroll.refreshComplete');
        })
    };

    $scope.getItems();
  });
