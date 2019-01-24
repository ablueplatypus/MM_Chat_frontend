// Welcome MM Chat JS Code.
// index JS
document.addEventListener('DOMContentLoaded', (e) => {
console.log('loaded');
// let isFetching = false

const userContainer = document.querySelector('#user-container')
const chatHeader = document.querySelector('.chatwith')
const submitMessageForm = document.querySelector('#submit-form')
const messagesContainer = document.querySelector('.messages')
// console.log(submitMessageForm);

/******** HELPERS ********************************/
function userHtml(users) {
  return `<ul>

          </ul>
          `
}


function fetchGetApiChatrooms() {
  return fetch('http://localhost:3000/api/v1/chatrooms')
  .then (res => res.json())
  .then(res => {
    // res.find(function(chatroom){
    //   chatroom.users.includes === re
    // })
  })
}

function fetchGetApiMessages() {
  return fetch('http://localhost:3000/api/v1/messages')
  .then(res => res.json())
  .then( res => {
    res.forEach(function(message){
      messagesContainer.innerHTML += `<li data-action="">${message.content}</li>`
    })
  })
}

function renderAllMessages(res){
  res
}

function fetchGetApiUsers() {
  return fetch('http://localhost:3000/api/v1/users')
  .then(res => res.json())
}

function postMessageUpdate(messages, userID) {
  console.log("message", messages, userID );
  return fetch('http://localhost:3000/api/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      content: messages,
      user_id: userID,
      chatroom_id: 3
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

function onUserClick(e) {
// console.log('Data name clicked', e.target.dataset.action, 'target id',e.target.dataset.userId);
  const data = e.target.dataset

  if (data.action === 'user') {
    const userId = data.userId
    // console.log(userId);
    chatHeader.innerHTML = `<h1>From:Matt To:${e.target.innerText}</h1>`
    const submitButton = document.querySelector('[value="Send Message"]')
    submitButton.dataset.receiver = userId
  }
} // end of onChatroomClick

function onSubmitMessage(e) {
  e.preventDefault()
  const messageValue = submitMessageForm.querySelector('#message').value
  const userID = e.target.dataset.senderId
  console.log(userID);
  postMessageUpdate(messageValue, userID).then(console.log)
  // Will uncomment when Form is working e.target.reset()
}









/********** LISTENERS *****************************************************/
submitMessageForm.addEventListener('submit', onSubmitMessage)
userContainer.addEventListener('click', onUserClick)
renderListOfUsers()
fetchGetApiMessages()
}) // end of DOM DOMContentLoaded event listener
