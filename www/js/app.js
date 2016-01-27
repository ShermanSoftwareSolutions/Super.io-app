/**
 * Starting point of the Super.io app
 */
angular.module('superio', [
  'ionic',
  'satellizer',
  'ngCordova'
])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .constant('settings', {
    // The url of the Sails backend
    apiUrl: 'http://128.199.32.43:1337'
  })

  .config(function ($stateProvider, $urlRouterProvider, $authProvider, settings, $ionicConfigProvider) {
    // Configuration for the Satellizer plugin
    $authProvider.baseUrl = settings.apiUrl;
    $authProvider.loginUrl = '/user/login';
    $authProvider.signupUrl = '/user/signup';

    // Align the tabs to the bottom (Top on iOS)
    $ionicConfigProvider.tabs.position('bottom');

    // Configurate all the states (routing)
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignupCtrl'
      })

      .state('shoppinglist', {
        url: '/shoppinglist',
        templateUrl: 'templates/shoppinglist.html',
        controller: 'ShoppinglistCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function ($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/login');
            }
          }]
        },
        cache: false
      })

      .state('check-scanner', {
        url: '/check',
        controller: 'CheckScannerCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function ($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/login');
            }
          }]
        }
      })

      .state('check', {
        url: '/check/:cartId',
        templateUrl: 'templates/check.html',
        controller: 'CheckCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function ($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/login');
            }
          }]
        }
      })

      .state('shoppingcart', {
        url: '/shoppingcart/:id',
        templateUrl: 'templates/shoppingcart.html',
        controller: 'ShoppingcartCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function ($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/login');
            }
          }]
        }
      })

      .state('shoppinglist-detail', {
        url: '/shoppinglist/:id',
        templateUrl: 'templates/shoppinglist-detail.html',
        controller: 'ShoppinglistDetailCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function ($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/login');
            }
          }]
        },
        cache: false
      })

      .state('new-product', {
        url: '/new-product/:shoppinglistId',
        templateUrl: 'templates/new-product.html',
        controller: 'NewProductCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function ($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/login');
            }
          }]
        }
      })

      .state('invoice', {
        url: '/invoice/:shoppingcartId',
        templateUrl: 'templates/invoice.html',
        controller: 'InvoiceCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function ($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/login');
            }
          }]
        }
      });

    // If none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/shoppinglist');

  });
