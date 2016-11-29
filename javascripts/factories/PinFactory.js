"use strict";

app.factory("PinFactory", function($q, $http, FIREBASE_CONFIG){
  var getPinList = function(userId){
    return $q((resolve,reject)=>{
      $http.get(`${FIREBASE_CONFIG.databaseURL}/pins.json?orderBy="uid"&equalTo="${userId}"`)
        .success(function(response){
          let pins = [];
          Object.keys(response).forEach(function(key){
            response[key].id = key;
            items.push(response[key]);
          });
          resolve(items);
        })
        .error(function(errorResponse){
          reject(errorResponse);
        });
    });
  };

  //   var postNewPin = function(newItem){
  //   return $q((resolve, reject)=>{
  //     $http.post(`${FIREBASE_CONFIG.databaseURL}/items.json`,
  //         JSON.stringify({
  //         assignedTo: newItem.assignedTo,
  //         isCompleted: newItem.isCompleted,
  //         task: newItem.task,
  //         uid: newItem.uid
  //       })
  //     )
  //       .success(function(postResponse){
  //         resolve(postResponse);
  //       })
  //       .error(function(postError){
  //         reject(postError);
  //       });
  //   });
  // };

  // var deletePin = function(itemId){
  //   return $q((resolve, reject)=>{
  //     $http.delete(`${FIREBASE_CONFIG.databaseURL}/items/${itemId}.json`)
  //     .success(function(deleteResponse){
  //       resolve(deleteResponse);
  //     })
  //     .error(function(deleteError){
  //       reject(deleteError);
  //     });
  //   });
  // };


  // var getSinglePin = function(itemId){
  //   return $q((resolve, reject)=>{
  //     $http.get(`${FIREBASE_CONFIG.databaseURL}/items/${itemId}.json`)
  //     .success(function(getSingleResponse){
  //       resolve(getSingleResponse);
  //     })
  //     .error(function(getSingleError){
  //       reject(getSingleError);
  //     });
  //   });
  // };

 // var editPin = function(editItem){
 //    return $q((resolve, reject)=>{
 //      $http.put(`${FIREBASE_CONFIG.databaseURL}/items/${editItem.id}.json`,
 //          JSON.stringify({
 //          assignedTo: editItem.assignedTo,
 //          isCompleted: editItem.isCompleted,
 //          task: editItem.task,
 //          uid: editItem.uid
 //        })
 //      )
 //        .success(function(editResponse){
 //          resolve(editResponse);
 //        })
 //        .error(function(editError){
 //          reject(editError);
 //        });
 //    });
 //  };

return {getPinList:getPinList, postNewPin:postNewPin, deletePin:deletePin, getSinglePin:getSinglePin, editPin:editPin};
});