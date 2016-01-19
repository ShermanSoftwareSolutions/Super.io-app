angular.module('superio')

  .controller('ShoppinglistCtrl', function ($scope, ShoppinglistService) {

    $scope.lists = [];

    $scope.onItemDelete = function(item) {
      // Perform API request
      $scope.lists.splice($scope.lists.indexOf(item), 1);
    };

    $scope.getItems = function () {
      ShoppinglistService
        .get()
        .success(function (res) {
          $scope.lists = res;
          console.log(res);
          console.log('worked');
        })
        .error(function (err) {
          console.log(err);
          console.log('erorr');
        })
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        })
    }

    $scope.getItems();

  })
