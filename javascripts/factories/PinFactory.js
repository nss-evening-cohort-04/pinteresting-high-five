"use strict";

app.factory("PinFactory", function($q, $http, FIREBASE_CONFIG){
  var getPinList = function(userId){
    return $q((resolve,reject)=>{
      $http.get(`${FIREBASE_CONFIG.databaseURL}/pins.json?orderBy="uid"`)
        .success(function(response){
          let pins = [];
          Object.keys(response).forEach(function(key){
            response[key].id = key;
            pins.push(response[key]);
          });
          resolve(pins);
        })
        .error(function(errorResponse){
          reject(errorResponse);
        });
    });
  };

    var postNewPin = function(newPin){
    return $q((resolve, reject)=>{
      $http.post(`${FIREBASE_CONFIG.databaseURL}/pins.json`,
          JSON.stringify({
          uid: newPin.uid,
          boardid: newPin.boardid,
          url: newPin.url,
          title: newPin.title
        })
      )
        .success(function(postResponse){
          resolve(postResponse);
        })
        .error(function(postError){
          reject(postError);
        });
    });
  };

  var deletePin = function(pinId){
    return $q((resolve, reject)=>{
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/pins/${pinId}.json`)
      .success(function(deleteResponse){
        resolve(deleteResponse);
      })
      .error(function(deleteError){
        reject(deleteError);
      });
    });
  };


  var getSinglePin = function(pinId){
    return $q((resolve, reject)=>{
      $http.get(`${FIREBASE_CONFIG.databaseURL}/pins/${pinId}.json`)
      .success(function(getSingleResponse){
        resolve(getSingleResponse);
      })
      .error(function(getSingleError){
        reject(getSingleError);
      });
    });
  };

 var editPin = function(editPin){
    return $q((resolve, reject)=>{
      $http.put(`${FIREBASE_CONFIG.databaseURL}/pins/${editPin.id}.json`,
          JSON.stringify({
          uid: editPin.uid,
          boardid: editPin.boardid,
          url: editPin.url,
          title: editPin.title
        })
      )
        .success(function(editResponse){
          resolve(editResponse);
        })
        .error(function(editError){
          reject(editError);
        });
    });
  };

return {getPinList:getPinList, postNewPin:postNewPin};
});