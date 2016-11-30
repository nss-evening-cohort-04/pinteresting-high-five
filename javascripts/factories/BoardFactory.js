"use strict";

app.factory('BoardFactory', function($q, $http, FIREBASE_CONFIG){

  var getBoardList=function(userId){
    return $q((resolve, reject)=>{
      $http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json?orderBy="uid"&equalTo="${userId}"`)
        .success(function(response){
          console.log("response", response)
          let boards =[];
          Object.keys(response).forEach(function(key){
            response[key].id=key;
            boards.push(response[key]);
          });
          resolve(boards);
        })
        .error(function(errorResponse){
          reject(errorResponse);
        })
    })
  }

  var postNewBoard = function(newBoard){
    return $q((resolve, reject)=>{
      $http.post(`${FIREBASE_CONFIG.databaseURL}/boards.json`,
        JSON.stringify({
          title: newBoard.title,
          uid: newBoard.uid
        })
      )
        .success(function(postResponse){
          resolve(postResponse);
        })
        .error(function(postError){
          reject(postError);
        })
    })
  }

  var deleteBoard =  function(boardId){
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`)
      .success(function(deleteResponse){
        console.log("success")
        resolve(deleteResponse);
      })
      .error(function(deleteError){
        reject(deleteError);
      })
    })
  }

  // var getSingleBoard =  function(BoardId){
  //   return $q((resolve, reject) => {
  //     $http.get(`${FIREBASE_CONFIG.databaseURL}/Boards/${BoardId}.json`)
  //     .success(function(getSingleResponse){
  //       console.log("success", getSingleResponse)
  //       resolve(getSingleResponse);
  //     })
  //     .error(function(getSingleError){
  //       reject(getSingleError);
  //     })
  //   })
  // }


// var editBoard = function(editBoard){
//     return $q((resolve, reject)=>{
//       $http.put(`${FIREBASE_CONFIG.databaseURL}/Boards/${editBoard.id}.json`, 
//         JSON.stringify({
//         city: editBoard.city,
//           email: editBoard.email,
//           firstName: editBoard.firstName,
//           lastName: editBoard.lastName,
//           phone: editBoard.phone,
//           state: editBoard.state,
//           streetAddress: editBoard.streetAddress,
//           zipcode: editBoard.zipcode,
//           uid: editBoard.uid
//       })
//     )
//       .success(function(editResponse){
//         resolve(editResponse);
//       })
//       .error(function(editError){
//         reject(editError);
//       })
//     })
//   }


  return {getBoardList:getBoardList,
          postNewBoard:postNewBoard,
          deleteBoard:deleteBoard
          // getSingleBoard:getSingleBoard,
          // editBoard:editBoard
        }
     
});
