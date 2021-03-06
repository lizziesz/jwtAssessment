var app = angular.module('jwt',[]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('jwtInterceptor');
})
.service('jwtInterceptor', function jwtInterceptor(){
  //TODO: Attach the token to every request.
  return {
    // always make sure to return anything you use here!
    request: function(config){
      if (localStorage.jwt) {
        config.headers.Authorization = 'Bearer ' + localStorage.jwt;
      }
      return config;
    }
  };
})

app.controller('jwtController',['$scope','$http', function($scope,$http) {

  $scope.view = {};

  $scope.login = function() {
    $http.get('/login').then(function (res) {
      //TODO:Store token in localstorage
      localStorage.jwt = res.data.token;
    });
  };

  $scope.protected = function () {
    $http.get('/protected').then(function successfulCallback(response) {
      $scope.view.response = response.data;
    }, function errorCallback(response) {
      $scope.view.response = "ERROR";
      console.log(response);
    });
  }
}]);
