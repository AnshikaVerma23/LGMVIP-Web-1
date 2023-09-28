const addUserBtn = document.getElementById("addUser");
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById("username");
const recordsDisplay = document.getElementById('records');
let userArray=[];
let edit_id= null;

let objStr= localStorage.getItem('users');

if(objStr != null){
    userArray = JSON.parse(objStr);
}
DisplayInfo();
usernameTextField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Prevent the default Enter key behavior (form submission)
      event.preventDefault();
  
      // Trigger the button click
      addUserBtn.click();
    }
  });

// console.log(userArray);
addUserBtn.onclick=()=>{
    const name = usernameTextField.value;
    // const recordsDisplay = document.getElementById('records');
    // alert(name);
   
    // console.log(userArray);
    if(edit_id!= null){
        userArray.splice(edit_id,1,{'name':name});
        edit_id=null;
    }
    else{
        userArray.push({'name':name});
    }


    SaveInfo(userArray);
    usernameTextField.value = '';
    addUserBtn.innerText = btnText;
}

function SaveInfo(userArray){
    // js method to change object into strings 
    let str = JSON.stringify(userArray);

    localStorage.setItem('users',str) // this function takes two parameters of string types , 1st is key and 2nd is value.
    DisplayInfo();
}

function DisplayInfo(){
    let statement ='';
    userArray.forEach((user,i) => {
        statement += `<tr style="background-color:black; color:white;">
        <th scope="row" >${i+1}</th>
        <td>${user.name}</td>
        <td><i class="btn btn-outline-primary fa fa-edit mx-3" onclick='EditInfo(${i})'></i> 
        <i class="btn btn-outline-danger fa fa-trash" onclick='DeleteInfo(${i})'></i>
        </td>
      </tr>`;
    });
    recordsDisplay.innerHTML = statement;
}

function EditInfo(id){
// alert(id);
edit_id = id;
usernameTextField.value = userArray[id].name;
addUserBtn.innerText = 'Save Changes';
}

function DeleteInfo(id){
userArray.splice(id,1);
SaveInfo(userArray);

}