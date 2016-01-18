angular.module('superio')

  .controller('DashCtrl', function ($scope) {
  })

  .controller('LoginCtrl', function ($scope, UserService, $cordovaToast) {
    $scope.loginData = {
      email: '',
      password: ''
    };

    $scope.login = function () {
      UserService
        .login($scope.loginData)
        .success(function () {

        })
        .error(function () {
          $cordovaToast.show('Verkeerde email/wachtwoord', 'short', 'bottom')
            .then(function () {

            }, function () {

            });
        })
    }
  });
