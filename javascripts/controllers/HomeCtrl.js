"use strict";

app.controller("HomeCtrl", function($scope, PinFactory, BoardFactory, $rootScope){
  $scope.pins = [];
  $scope.newPinRevealer = false;

//is $rootScope.pins correct?
  let getPins = function(){
    PinFactory.getPinList().then(function(fbItems){
      $scope.pins = fbItems;
      console.log("THINGS ARE HAPPENING", fbItems)
    });
  };
getPins();

 let getBoards = function(){
    BoardFactory.getBoardList().then(function(fbBoards){
      $scope.boards = fbBoards;
      console.log("THINGS ARE HAPPENING", fbBoards)
    });
  };
getBoards();


$scope.deletePin = function(pinId){ //passed this in on click here and in HTML - we delete item.id in html and this is why we created items with ids
  console.log("you deleted me");
  PinFactory.deletePin(pinId).then(function(response){
    getPins(); //once it is deleted then refresh the DOM
  });
};
//get single pin function?

$scope.revealNewPin = function(){
  $scope.newPinRevealer = true;
}

// $scope.newPin = {};

// $scope.addNewPin = function() {
//         $scope.newPin.title = false;
//         $scope.newPin.uid = $rootScope.user.uid;
//         ItemFactory.postNewItem($scope.newTask).then(function(itemId) {
//             $location.url("/items/list");     //adding a new path once a person adds a new todo
//             $scope.newPin = "";
//       });
//   };




});