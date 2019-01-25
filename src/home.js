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

    let foundUser = AllUSERS.find(function(user){
      return user.username.toLowerCase() == formInput.value.toLowerCase()
    })
    console.log(AllUSERS);
    console.log(foundUser);
    if (typeof foundUser == 'undefined'){
      console.log("couldn't find you");
    }else{
      let userID = foundUser.id
      localStorage.setItem('theID', `${foundUser.id}`);
      window.location.href = 'file:///Users/agamy/Development/mod3-project/Mod_3_project_frontend/index.html';

    }
    form.reset();
  })
})
