// Welcome MM Chat JS Code.
// index JS
document.addEventListener('DOMContentLoaded', (e) => {
console.log('loaded');

const userContainer = document.querySelector('#user-container')

function userHtml(users) {
  return `<div>
            <ul>
              <li data-action="user" data-user-id="${users.id}">${users.username}</li>
            </ul>
          </div>
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
  .then(res => res.json())
}

function fetchGetApiMessages() {
  return fetch('http://localhost:3000/api/v1/messages/')
  .then(res => res.json())
}

function fetchGetApiUsers() {
  return fetch('http://localhost:3000/api/v1/users/')
  .then(res => res.json())
}


function renderListOfUsers() {
  return fetchGetApiUsers().then(users => {
    users.forEach(user => {
      // console.log(chatroom.room_name)
      userContainer.innerHTML += userHtml(user)
    }) //end of forEach
  })
}

function onChatroomClick(e) {
console.log('Data name clicked', e.target.dataset.action, 'target id',e.target.dataset.userId);
  const data = e.target.dataset

  if (data.action === 'user') {
    const userId = data.userId
    console.log(userId);


  }


}












userContainer.addEventListener('click', onChatroomClick)
renderListOfUsers()
}) // end of DOM DOMContentLoaded event listener
