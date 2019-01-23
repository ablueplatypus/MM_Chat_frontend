// Welcome MM Chat JS Code.
// index JS
document.addEventListener('DOMContentLoaded', (e) => {
console.log('loaded');

const chatroomContainer = document.querySelector('#chatroom-container')

function chatroomHtml(chatrooms) {
  return `<div>
            <ul>
              <li data-action="room" data-chatroom-id="${chatrooms.id}">${chatrooms.room_name}</li>
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


function renderChatrooms() {
  return fetchGetApiChatrooms().then(chatrooms => {
    chatrooms.forEach(chatroom => {
      // console.log(chatroom.room_name)
      chatroomContainer.innerHTML += chatroomHtml(chatroom)
    }) //end of forEach
  })
}

function onChatroomClick(e) {
console.log('Data name clicked', e.target.dataset.action, 'target id',e.target.dataset.chatroomId);
  const data = e.target.dataset

  if (data.action === 'room') {
    const chatroomId = data.chatroomId
    console.log(chatroomId);

  }


}












chatroomContainer.addEventListener('click', onChatroomClick)
renderChatrooms()
}) // end of DOM DOMContentLoaded event listener
