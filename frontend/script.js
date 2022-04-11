const addBtn = document.getElementById('addBtn');
const tbody = document.getElementById('tbody');
const removeAll = document.getElementById('removeBtn');


let arrUsers;
!localStorage.arrUsers ? arrUsers = [] : arrUsers = JSON.parse(localStorage.getItem('arrUsers'));

let idRandom = () => Math.floor(Math.random() * 10000);
function addLeadZero(d) {
    return (d < 10) ? '0' + d : d;
}

function addDateUsers(t = new Date()) {
    const Y = t.getFullYear();
    const M = addLeadZero(t.getMonth() + 1);
    const D = addLeadZero(t.getDate());

    return `${D}/${M}/${Y}`;

}

class UserAdd {
    constructor(name, email) {
        this.id = idRandom();
        this.name = name,
        this.email = email,
        this.date = addDateUsers();
    }

}

const updatetLocal = () => {
    localStorage.setItem('arrUsers', JSON.stringify(arrUsers));
}

addBtn.addEventListener('click', () => {
    let confirmAll = document.getElementById('confirmAll');

    confirmAll.classList.remove('activeBtn');
    arrUsers.push(new UserAdd('', ''));
    updatetLocal();
    fillUsersList();
})

const createUsersList = (user, index) => {

    return (`<tr class="stringUser">
     <td class="columnInput">
         <input type="text" class="name input" name="name" value=${user.name} >
     </td>
     <td class="columnInput">
         <input type="email" class="email input" name="email"  value=${user.email}>
     </td>
     <td>${user.date}</td>
     <td>
         <button onclick="changeUser(${index})">
             <i class="fas fa-pencil-alt"></i>
         </button>
     </td>
     <td>
         <button onclick="removeUser(${index})">
             <i class="far fa-trash-alt"></i>
         </button>
     </td>
     <td>
            <button class="saveBtn activeBtn" onclick="saveUser(${index})">Save</button>
         <button class="confBtn" onclick="deleteUser(${index})">Confirm</button>
     </td>
 </tr>`)


}

function fillUsersList() {
    tbody.innerHTML = '';
    if (arrUsers.length > 0) {
        arrUsers.forEach((item, index) => {
            tbody.innerHTML += createUsersList(item, index);
            let inputName = document.querySelectorAll('.name');
            let inputEmail = document.querySelectorAll('.email');
            saveBtn = document.getElementsByClassName('saveBtn');
            confBtn = document.querySelectorAll('.confBtn');

            if (item.name !== '' && item.email !== '') {
                inputName[index].setAttribute('disabled', 'disabled');
                inputEmail[index].setAttribute('disabled', 'disabled');
                saveBtn[index].classList.remove('activeBtn');
            }

        })
    }
}

fillUsersList()

removeAll.addEventListener('click', () => {
    let stringUser = document.querySelectorAll('.stringUser');
    let confirmAll = document.getElementById('confirmAll');

    if (arrUsers.length > 0) {
        confirmAll.classList.add('activeBtn');
        stringUser.forEach(item => {
            item.classList.add('remove');
        })
    }
});

const deleteAll = () => {
    let confirmAll = document.getElementById('confirmAll');
    arrUsers = [];
    confirmAll.classList.remove('activeBtn');
    updatetLocal();
    fillUsersList();
}

const saveUser = i => {
    let inputName = document.querySelectorAll('.name');
    let inputEmail = document.querySelectorAll('.email');

    arrUsers.push(new UserAdd(inputName[i].value, inputEmail[i].value));
    arrUsers.splice(i, 1);
    updatetLocal();
    fillUsersList();

}

const changeUser = i => {
    let inputName = document.querySelectorAll('.name');
    let inputEmail = document.querySelectorAll('.email');
    let confBtn = document.querySelectorAll('.confBtn');
    let saveBtn = document.getElementsByClassName('saveBtn');
    let stringUser = document.querySelectorAll('.stringUser');

    inputName[i].removeAttribute('disabled');
    inputEmail[i].removeAttribute('disabled');
    stringUser[i].classList.remove('remove');
    saveBtn[i].classList.add('activeBtn');
    confBtn[i].classList.remove('activeBtn');

}

const removeUser = i => {
    let confBtn = document.querySelectorAll('.confBtn');
    let stringUser = document.querySelectorAll('.stringUser');
    let saveBtn = document.getElementsByClassName('saveBtn');

    confBtn[i].classList.add('activeBtn');
    stringUser[i].classList.add('remove');
    saveBtn[i].classList.remove('activeBtn');
}

const deleteUser = i => {
    arrUsers.splice(i, 1);
    updatetLocal();
    fillUsersList();
}






