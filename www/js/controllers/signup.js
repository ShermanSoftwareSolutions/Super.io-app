/**
 * Controller to handle user signup
 */
angular.module('superio')

  .controller('SignupCtrl', function ($scope, UserService, $cordovaToast, $auth, $state, $ionicHistory) {
    // Contains the signup data of the user
    $scope.signupData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    /**
     * Start the authorization process with the Satellizer library ($auth)
     * @param signupForm
     */
    $scope.signup = function (signupForm) {
      $auth
        .signup($scope.signupData)
        .then(function () {
          // Clear out password
          $scope.signupData.password = null;
          $scope.signupData.confirmPassword = null;
          // Reset the form validation
          signupForm.$setPristine();
          signupForm.$setUntouched();

          // Disable the back button
          $ionicHistory.currentView($ionicHistory.backView());

          // Go to the shoppinglist overview
          $state.go('shoppinglist', {location: 'replace'});
        })
        .catch(function (err) {
          console.log(err);
          // Show a toast error message
          $cordovaToast
            .showLongBottom('Verkeerde gegevens')
            .then(function () {
              console.log('Toast launched!');
            }, function (err) {
              console.log('Couldn\'t make a toast!');
            });
        })
    }
  })
;
