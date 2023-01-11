let userList = document.getElementById('userList');
let form = document.getElementById('form');
let userName = document.getElementById('name');
let category = document.getElementById('category');
let errorMessage = document.getElementById('errorMessage');

// preventDefault
form.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    validateNewUser();
});
//Validation
let validateNewUser = () =>{
    if(userName.value.length < 2){
        errorMessage.innerHTML = 'Emri duhet te permbaje te pakten dy germa!';
    }
    else{
        errorMessage.innerHTML = "";
        createUser();
    }
};
//Create a new user
let users = [{}];
let createUser = ()=>{
    users.push({
        text: userName.value,
        options: category.value,
});
// Set items in localstorage
localStorage.setItem("users", JSON.stringify(users));
    createUserLIst();
};
//Create list item
let createUserLIst = ()=>{
    userList.innerHTML = "",
    users.map((x,y) =>{
return(userList.innerHTML += 
    `<li id=${y} class="list-items">
    <div class="left-section">
        <img src="images/User-avatar.png" class="user-avatar">
        <div class="user-data">
            <span class="itemName">${x.text}</span>
            <span>${x.options}</span>
        </div>
    </div>
    <button onClick="deleteList(this)"id="deleteButton">&#10005;</button>
     </li>`
)
    });
   resetInputField();
};
// resetInputField
let resetInputField = ()=>{
    userName.value="";
}
//Delete user
let deleteList = (ev)=>{
    ev.parentElement.remove();
    users.splice(ev.parentElement.id,1);
    localStorage.setItem("users", JSON.stringify(users));
}
// Filter list of users by name
function filterUsers(){
    filter = document.getElementById('searchBox').value.toLowerCase();
     li = userList.getElementsByTagName("li");
     for (i = 0; i < li.length; i++) {
         a = li[i].getElementsByClassName("itemName")[0];
         txtValue = a.textContent || a.innerText;
         if (txtValue.toLowerCase().indexOf(filter) > -1) {
             li[i].style.display = "flex";
         } else {
             li[i].style.display = "none";
         }
     }
 }

//  Get items from localstorage
 (() => {
    users= JSON.parse(localStorage.getItem("users")) || [];
    createUserLIst();
  })();
 
 