
// Welcome MM Chat JS Code.
// index JS
document.addEventListener('DOMContentLoaded', (e) => {
  let CHATROOMS;

  let ALLUSERS;
  let signedUSer;
  let theID = localStorage.getItem('theID');

  function fetchGetApiUsers() {
    return fetch('http://localhost:3000/api/v1/users')
    .then(res => res.json())
  }
  function testing() {
    fetchGetApiUsers().then(users => {
      ALLUSERS = users
      console.log(ALLUSERS);
      let theID = localStorage.getItem('theID');

        if (theID > 0){
          signedUser = ALLUSERS.find(function(user){
            return user.id == parseInt(theID)
          })
          let currName = document.getElementById('currName')
          currName.innerText = signedUser.username
          return signedUser
        }
    })
  }
  testing()

  


  // function mattTesting(allUsersArray) {
  //   // console.log("allusers",ALLUSERS);
  //   let theID = localStorage.getItem('theID');
  //   console.log(theID);
  //   // if (theID > 0){
  //   //   signedUser = ALLUSERS.find(function(user){
  //   //     return user.id == parseInt(theID)
  //   //   })
  //   //   let currName = document.getElementById('currName')
  //   //   currName.innerText = signedUser.username
  //   //   return signedUser
  //   // }
  //   allUsersArray.find(user =>{
  //     console.log(user.id);
  //     return user.id == parseInt(theID)
  //   })
  //
  // }
  // mattTesting(ALLUSERS)

// console.log("signedUSer: ", signedUser);
const userContainer = document.querySelector('#user-container')
const chatHeader = document.querySelector('.chatwith')
const submitMessageForm = document.querySelector('#submit-form')
const messagesContainer = document.querySelector('.messages')
const mainmain = document.querySelector('.main')
// console.log(submitMessageForm);

submitMessageForm.dataset.senderId = theID;
/*************************************************************/
// CHATROOOOOOOOOOOOOOOOOOOOMS
/*************************************************************/



/******** grab all chattrooms ********************************/

  fetch('http://localhost:3000/api/v1/chatrooms')
  .then(res => res.json())
  .then(res => {
    CHATROOMS = res;
    // console.log("CHATOOOOOM", CHATROOMS);
  });
/* FINDING A CHATROOM IN THE GLOBAL */
function userIdArray(chattersArray, someweird){
  console.log("CHATr2", someweird);
  let foundChatRoom = someweird.find(function(chatroom){
    // debugger
    return (JSON.stringify(arrayOfUsers(chatroom)) == JSON.stringify(chattersArray) ||
    JSON.stringify(arrayOfUsers(chatroom)) == JSON.stringify(chattersArray.reverse()));
  })
  console.log("CHATr2", foundChatRoom);
  return foundChatRoom;
}

/* GETTING AN ARRAY OF EACH CHATROOM USERS IDS */
function arrayOfUsers(chatroom){
  return chatroom.users.map(function(user){
    return user.id
  });
}

// let testchatrooooomUsers = arrayOfUsers(CHATROOMS[0])
//**************  clicking on a user
function onUserClick(e, signedUSer) {
  // console.log("uzeeeeeesrrrrre", signedUser);
// console.log('Data name clicked', e.target.dataset.action, 'target id',e.target.dataset.userId);
  const data = e.target.dataset
  receiverID = e.target.dataset.userId

  if (data.action === 'user') {
    const userId = data.userId
    let recipient = e.target.dataset.userId
    let theID = localStorage.getItem('theID');
    let chattersArray = [parseInt(theID), parseInt(recipient)]
    console.log(chattersArray);
    let stringOfUsers = chattersArray.toString()
    // console.log(userId);
    chatHeader.innerHTML = `<h1>${e.target.innerText}</h1>`
    const submitButton = document.querySelector('[value="Send Message"]')
    // let theID = localStorage.getItem('theID');
    submitButton.dataset.receiver = userId
    submitButton.dataset.sender = theID
    mainmain.dataset.receiver = userId

    let foundedChatRoom = userIdArray(chattersArray, CHATROOMS)

    console.log("foundChatRoom", foundedChatRoom);
      if (typeof foundedChatRoom == 'undefined'){
        // debugger
        fetch(`http://localhost:3000/api/v1/chatrooms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            room_name: stringOfUsers
          })
        })
        .then(res => res.json())
        .then(res => {
          messagesContainer.dataset.chatr = res.id
        })
      }else{
        console.log("beforeBed", foundedChatRoom);
        messagesContainer.dataset.chatr = foundedChatRoom.id
        messagesContainer.innerHTML = ""
        foundedChatRoom.messages.forEach(function(message){
          if (message.user_id === 13){
            var directioin = 'left'
          }else{
            var directioin = 'right'
          }
          messagesContainer.innerHTML += `<li data-action="" >${message.content}</li>`
        })
      }
  }
} // end of onChatroomClick

/******** END of chattrooms ********************************/



// function renderAllMessages() {
//   return fetch('http://localhost:3000/api/v1/messages')
//   .then(res => res.json())
//   .then( res => {
//     res.forEach(function(message){
//       messagesContainer.innerHTML += `<li data-action="">${message.content}</li>`
//     })
//   })
// }


function postMessageUpdate(messages, userID, roomID) {
  console.log("message", messages, userID, roomID.dataset.chatr );
  return fetch('http://localhost:3000/api/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      content: messages,
      user_id: userID,
      chatroom_id: roomID.dataset.chatr
    })
  })
}


function renderListOfUsers() {
  return fetchGetApiUsers().then(users => {
    users.forEach(user => {
      // console.log(chatroom.room_name)
      userContainer.innerHTML += `<li data-action="user" data-user-id="${user.id}">${user.username}</li>`
    }) //end of forEach
  })
}


function onSubmitMessage(e) {
  e.preventDefault()
  const messageValue = submitMessageForm.querySelector('#message').value
  const userID = e.target.dataset.senderId
  console.log(userID);
  postMessageUpdate(messageValue, userID, messagesContainer)
  .then( res => res.json())
  .then( message => {
    const messagesContainer = document.querySelector('.messages')
    messagesContainer.innerHTML += `<li data-action="" data-sender=${message.user_id}>${message.content}</li>`
    submitMessageForm.reset();
    window.scrollTo(0,mainmain.scrollHeight);
  })
  // Will uncomment when Form is working e.target.reset()
}









/********** LISTENERS *****************************************************/
submitMessageForm.addEventListener('submit', onSubmitMessage)
userContainer.addEventListener('click', onUserClick)
renderListOfUsers()
// renderAllMessages()

}) // end of DOM DOMContentLoaded event listener
