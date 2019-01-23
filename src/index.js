// Welcome MM Chat JS Code.
// index JS
document.addEventListener('DOMContentLoaded', (e) => {
console.log('loaded');
// let isFetching = false

const userContainer = document.querySelector('#user-container')
const chatHeader = document.querySelector('.chatwith')
const submitMessageForm = document.querySelector('#submit-form')
// console.log(submitMessageForm);

function userHtml(users) {
  return `<ul>
              <li data-action="user" data-user-id="${users.id}">${users.username}</li>
          </ul>
          `
}

function chatHtmlText(messages) {
  return `<div>
            <ul>
              <li data-action="">${messages.content}</li>
            </ul>
          </div>`
}

function fetchGetApiChatrooms() {
  return fetch('http://localhost:3000/api/v1/chatrooms/')
  .then (res => res.json())
}

function fetchGetApiMessages() {
  return fetch('http://localhost:3000/api/v1/messages/')
  .then(res => res.json())
}

function fetchGetApiUsers() {
  return fetch('http://localhost:3000/api/v1/users/')
  .then(res => res.json())
}

function postMessageUpdate(messages) {
  return fetch('http://localhost:3000/api/v1/messages/', {
    method: 'POST',
    headers: {
      'Content-Type': 'applicaiton/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      content: messages
    })
  })
  .then(res => res.json())
  .then(jsonData => {
  console.log(jsonData);
    return jsonData
  })
}


function renderListOfUsers() {
  return fetchGetApiUsers().then(users => {
    users.forEach(user => {
      // console.log(chatroom.room_name)
      userContainer.innerHTML += userHtml(user)
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
  console.log(e.target);
  

  // Will uncomment when Form is working e.target.reset()
}










submitMessageForm.addEventListener('submit', onSubmitMessage)
userContainer.addEventListener('click', onUserClick)
renderListOfUsers()
}) // end of DOM DOMContentLoaded event listener
