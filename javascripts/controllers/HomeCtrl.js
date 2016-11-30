"use strict";

app.controller("HomeCtrl", function($scope, PinFactory, $rootScope){
  $scope.pins = [];

//is $rootScope.pins correct?
  let getPins = function(){
    PinFactory.getPinList().then(function(fbItems){
      $scope.pins = fbItems;
      console.log("THINGS ARE HAPPENING", fbItems)
    });
  };
getPins();






});