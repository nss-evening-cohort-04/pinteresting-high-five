"use strict";

//function that tell us whether or not a person is logged in
let isAuth = (AuthFactory) => new Promise((resolve, reject)=>{
  if(AuthFactory.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});



app.run(function($rootScope, $location, FIREBASE_CONFIG, AuthFactory){
  firebase.initializeApp(FIREBASE_CONFIG);

  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){

    let logged = AuthFactory.isAuthenticated();
    let appTo;

if(currRoute.originalPath){
    appTo = 5 !== -1 //true
    appTo = -1 !== -1 //false
    appTo = currRoute.originalPath.indexOf('/auth') !== -1;
}

    console.log("appTo", appTo);
    console.log("hey");

    if(!appTo && !logged){
      event.preventDefault();
      $location.path('/auth');

    }
  });
});

app.config(function($routeProvider){ //routeProvider is angular method that does routes
  $routeProvider
    .when('/auth', {
      templateUrl: 'partials/auth.html',
      controller: 'AuthCtrl'
    })
      .when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl',
        resolve: {isAuth}
      })
    .when('/my-boards', {
      templateUrl: 'partials/my-boards.html',  //this is important how these are spelled here
      controller: 'BoardCtrl',
      resolve: {isAuth} // if isAuth is true then load this controller/partial
    })
    .when('/logout', {
      templateUrl: 'partials/auth.html',
      controller: 'AuthCtrl',
      resolve: {isAuth}
    })
    .otherwise('/auth');
});