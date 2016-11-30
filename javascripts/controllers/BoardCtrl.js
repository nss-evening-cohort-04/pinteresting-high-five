"use strict";
 
app.controller("BoardCtrl", function($scope, $rootScope, BoardFactory){
	console.log("Hello, this is BoardCtrl.js");

	$scope.boards = [];

	let getBoards = function(){
		BoardFactory.getBoardList($rootScope.user.uid).then(function(fbBoards){
			console.log("boards from controller:", fbBoards);
			$scope.boards = fbBoards; //This should return all the database boards
			//passing in the rootScope above allows us to grab the user uid and just pass through its boards
		});
	};
	
	getBoards();


	$scope.deleteBoards = function(boardId) { //need to pass in the id in the html... board.id
		console.log("You deleted:", boardId);
		BoardFactory.deleteBoard(boardId).then(function(response){
			getBoards(); //this refreshes the DOM after you've deleted
		});
	};


/* The inputChange function is for editing boards, will handle later
---------------------------------------------------------------------
	
	$scope.inputChange = function(thingy) { 
		BoardFactory.editBoard(thingy).then(function(response){
			//console.log("Ctrl inputChange response: ", response);
			getBoards();
		});
	};

---------------------------------------------------------------------*/

});