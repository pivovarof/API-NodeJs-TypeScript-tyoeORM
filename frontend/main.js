const addBtn = document.getElementById('addBtn');
const tbody = document.getElementById('tbody');
const removeAll = document.getElementById('removeBtn');
let confirmAll = document.getElementById('confirmAll');

async function createTableUser(arr) {

    let result = arr.map((el, index) => {

        let name = el.userName;
        let email = el.email;
        let date = el.data_updated;
        let id = el.id;
        let disabled = 'disabled';
        let activeBtn = '';

        if (el.userName == '') {
            disabled = '';
            activeBtn = 'activeBtn';
        }

        return (`<tr class="stringUser" id=${id}>
     <td class="columnInput">
         <input type="text" placeholder="Enter name..." class="name input"  name="name" value=${name} ${disabled}>
     </td>
     <td class="columnInput">
         <input type="email" placeholder="Enter email..." class="email input" name="email" value=${email} ${disabled} >
     </td>
     <td>${date}</td>
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
            <button class="saveBtn ${activeBtn}" onclick="saveUser(${index})">Save</button>
         <button class="confBtn" onclick="deleteUser(${id})">Confirm</button>
     </td>
 </tr>`)

    })

    return tbody.innerHTML = result.join('');

}

const getAllusers = async (arg) => {
    let response = await fetch('http://localhost:8000/user/users');
    let res = await response.json();
    if (arg) {
        res.push(arg)
    }
    await createTableUser(res)

}
getAllusers()

addBtn.addEventListener('click', () => {
    getAllusers(
        {
            userName: '',
            email: '',
            data_updated: '',
            id: null
        });
})

const saveUser = async (i) => {
    let inputName = document.querySelectorAll('.name');
    let inputEmail = document.querySelectorAll('.email');
    let stringUser = document.querySelectorAll('.stringUser');

    if (inputName[i].value == '' && inputEmail[i].value == '') {
        inputName[i].placeholder = '*Required!';
        inputEmail[i].placeholder = '*Required!';
        inputName[i].classList.add('inputError');
        inputEmail[i].classList.add('inputError');
        return;
    }

    if (inputName[i].value == '') {

        inputName[i].placeholder = '*Required!';
        inputName[i].classList.add('inputError');
        return;
    }
    if (inputEmail[i].value == '') {
        inputEmail[i].placeholder = '*Required!';
        inputEmail[i].classList.add('inputError');
        return;
    }

    else {
        let userObj = {
            name: inputName[i].value,
            email: inputEmail[i].value
        }
        let response = await fetch('http://localhost:8000/user/users');
        let res = await response.json();
        let resId = res.find( el => el.id == stringUser[i].id);               
            
            if( resId !== undefined){
                await fetch(`http://localhost:8000/user/${stringUser[i].id}`,
            {
                method: 'PUT',
                body: JSON.stringify(userObj),
                headers: {
                    'Content-Type': 'application/json'
                }

            });
            }
            else{
                await fetch(`http://localhost:8000/user`,
                {
                    method: 'POST',
                    body: JSON.stringify(userObj),
                    headers: {
                        'Content-Type': 'application/json'
                    }
    
                });
            }
               
    }

    return await getAllusers()

}

const changeUser = (i) => {
    let inputName = document.querySelectorAll('.name');
    let inputEmail = document.querySelectorAll('.email');
    let confBtn = document.querySelectorAll('.confBtn');
    let saveBtn = document.getElementsByClassName('saveBtn');
    let stringUser = document.querySelectorAll('.stringUser');
    
    stringUser[i].classList.remove('remove');
    saveBtn[i].classList.add('activeBtn');
    confBtn[i].classList.remove('activeBtn');
    inputName[i].disabled = false;
    inputEmail[i].disabled = false;

}

const removeUser = i => {
    let confBtn = document.querySelectorAll('.confBtn');
    let stringUser = document.querySelectorAll('.stringUser');
    let saveBtn = document.getElementsByClassName('saveBtn');

    confBtn[i].classList.add('activeBtn');
    stringUser[i].classList.add('remove');
    saveBtn[i].classList.remove('activeBtn');
}

const deleteUser = async (id) => {

    await fetch(`http://localhost:8000/user/${id}`,
        {
            method: 'DELETE'
        }
    )
    getAllusers()

}

removeAll.addEventListener('click', () => {
    let stringUser = document.querySelectorAll('.stringUser');   
    
        confirmAll.classList.add('activeBtn');
        stringUser.forEach(item => {
            item.classList.add('remove');
        })
    
});

const deleteAll = async () => {
    await fetch(`http://localhost:8000/user/users`,{ method: 'DELETE'})
    confirmAll.classList.remove('activeBtn');
    getAllusers()
}






