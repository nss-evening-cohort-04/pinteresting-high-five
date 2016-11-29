"use strict";

app.controller("NavCtrl", function($scope){
  $scope.navItems = [
    {
      name: "Logout",
      url: "#/logout"
    },
    {
      name: "My Boards",
      url: "#/my-boards"
    },
    {
      name: "Home",
      url: "#/home"
    }
  ];
});