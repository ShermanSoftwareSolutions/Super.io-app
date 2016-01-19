angular.module('superio')

  .controller('DashCtrl', function ($scope) {
  })

  .controller('LoginCtrl', function ($scope, UserService, $cordovaToast, $auth, $state, $ionicHistory) {
    $scope.loginData = {
      email: '',
      password: ''
    };

    $scope.login = function (loginForm) {
      $auth
        .login($scope.loginData)
        .then(function () {
          // Clear out password
          $scope.loginData.password = null;
          loginForm.$setPristine();
          loginForm.$setUntouched();

          // Disable the back button
          $ionicHistory.currentView($ionicHistory.backView());

          $state.go('tab.shoppinglist', {location: 'replace'});
        })
        .catch(function () {
          $cordovaToast
            .show('Verkeerde inloggegevens', 'long', 'bottom')
            .then(function () {
              console.log('Toast launched!');
            }, function (err) {
              console.log('Couldn\'t make a toast!');
            });
        })
    }
  })
;
