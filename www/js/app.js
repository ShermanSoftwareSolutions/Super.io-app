// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
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
    apiUrl: 'http://localhost:1337'
  })

  .config(function ($stateProvider, $urlRouterProvider, $authProvider, settings, $ionicConfigProvider) {

    $authProvider.baseUrl = settings.apiUrl;
    $authProvider.loginUrl = '/user/login';
    $authProvider.signupUrl = '/user/signup';

    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
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
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/shoppinglist');

  });
