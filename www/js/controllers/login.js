/**
 * Controller to handle user login
 */
angular.module('superio')

  .controller('LoginCtrl', function ($scope, UserService, $cordovaToast, $auth, $state, $ionicHistory) {
    // Contains the login data of the user
    $scope.loginData = {
      email: '',
      password: ''
    };

    /**
     * Start the authorization process with the Satellizer library ($auth)
     * @param loginForm
     */
    $scope.login = function (loginForm) {
      $auth
        .login($scope.loginData)
        .then(function () {
          // Clear out password
          $scope.loginData.password = null;
          // Reset the form validation
          loginForm.$setPristine();
          loginForm.$setUntouched();

          // Disable the back button
          $ionicHistory.currentView($ionicHistory.backView());

          // Go to the shoppinglist overview
          $state.go('tab.shoppinglist', {location: 'replace'});
        })
        .catch(function () {
          // Show a toast error message
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
