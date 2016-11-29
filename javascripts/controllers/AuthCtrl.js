"use strict";

app.controller("AuthCtrl", function($scope, $rootScope, AuthFactory, UserFactory, $location){
  // $scope.message = "AuthCtrl"
  $scope.loginContainer = true;
  $scope.registerContainer = false;


  if($location.path() === "/logout"){
    AuthFactory.logout();
    $rootScope.user = {};
    $location.url("/auth");
  }

  let logMeIn = function(loginStuff){
    AuthFactory.authenticate(loginStuff).then(function(didLogin){
      console.log(didLogin);
      return UserFactory.getUser(didLogin.uid);
    }).then(function(userCreds){
      $rootScope.user = userCreds; //the scope that's available no matter what root youre in
      $scope.login = {};
      $scope.register = {};
      $location.url("/home");
    });
  };

  $scope.setLoginContainer = function(){
    $scope.loginContainer = true;
    $scope.registerContainer = false;

  };

  $scope.setRegisterContainer = function (){
    $scope.loginContainer = false;
    $scope.registerContainer = true;
  };

  $scope.registerUser = function (registerNewUser){
    AuthFactory.registerWithEmail(registerNewUser).then(function(didRegister){
      registerNewUser.uid = didRegister.uid;
      console.log('thing',didRegister);
      return UserFactory.addUser(registerNewUser);
    }).then(function(registerComplete){
      logMeIn(registerNewUser);
    });
  };

  $scope.loginUser = function (loginNewUser){
    logMeIn(loginNewUser);
  };
});