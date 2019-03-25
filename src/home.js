document.addEventListener('DOMContentLoaded', (e) => {
// console.log('loaded');
// let isFetching = false
let AllUSERS = []

const form = document.querySelector('#form')
const formInput = document.querySelector('.form-control')
const formsubmit = document.querySelector('#chat')
console.log(form);
console.log(formInput);

/*************************************************************/
// CHATROOOOOOOOOOOOOOOOOOOOMS
/*************************************************************/


/******** grab all chattrooms ********************************/

  fetch('http://localhost:3000/api/v1/users')
  .then(res => res.json())
  .then(res => {
    AllUSERS = res;
  });


  form.addEventListener('submit', function(e){
    e.preventDefault();
    console.log("input value",formInput.value);
    const formInputVal = document.querySelector('.form-control').value
    let foundUser = AllUSERS.find(function(user){
      return user.username.toLowerCase() == formInput.value.toLowerCase()
    })
    console.log(AllUSERS);
    console.log(foundUser);
    if (typeof foundUser == 'undefined'){
      /****** CREATING NEW CUSTOMER ***********/
      fetch('http://localhost:3000/api/v1/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          username: formInputVal,
          password_digest: 123456
        })
      })
      .then(res => res.json())
      .then(user => {
        let userID = user.id
        console.log(userID);
        localStorage.setItem('theID', `${userID}`);
        window.location.href = 'file:///Users/flatironschool/Development/code/Mod_3/project_mod3/mmchat_frontend/index.html';
      })

      /****** END CREATING NEW CUSTOMER ***********/

    }else{
      let userID = foundUser.id
      localStorage.setItem('theID', `${foundUser.id}`);
      window.location.href = 'file:///Users/flatironschool/Development/code/Mod_3/project_mod3/mmchat_frontend/index.html';

    }
    form.reset();
  })
})
