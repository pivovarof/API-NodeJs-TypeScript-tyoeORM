const addBtn = document.getElementById('addBtn');
const tbody = document.getElementById('tbody');
const removeAll = document.getElementById('removeBtn');
const mainUrl = 'http://localhost:8000/user';


async function createTableUser (arr) {

    let disabled;
    let result = arr.map((el, index) => {         
        
           let name = el.userName;
           let email = el.email;
           let date = el.data_updated;
           let id = el.id; 
                
        
        return (`<tr class="stringUser" id=${id}>
     <td class="columnInput">
         <input type="text" class="name input" name="name" value=${name} disabled = ${name !== '' ? true : false}>
     </td>
     <td class="columnInput">
         <input type="email" class="email input" name="email"  value=${email} >
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
            <button class="saveBtn" onclick="saveUser(${index})">Save</button>
         <button class="confBtn" onclick="deleteUser(${id})">Confirm</button>
     </td>
 </tr>`) 

    })
    
    
    return tbody.innerHTML = result.join('');    
    
}


const getAllusers = async (arg) => {
    let response = await fetch('http://localhost:8000/user/users');
    let res = await response.json();    
    if(arg){
        let inputName = document.querySelectorAll('.name');
        let inputEmail = document.querySelectorAll('.email');
        console.log(inputName);
        res.push(arg)
    }    
    await createTableUser(res)

}
getAllusers()

addBtn.addEventListener('click', () => {    
    getAllusers(
        {userName:'', 
        email:'',
        data_updated: '',
        id: null        
    });    
})

const saveUser = async (i) => {
    let inputName = document.querySelectorAll('.name');
    let inputEmail = document.querySelectorAll('.email');

    
    let userObj = {
        name: inputName[i].value,
        email: inputEmail[i].value
    }

    await fetch(`http://localhost:8000/user`,
    {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
            'Content-Type': 'application/json'
          }        
        
    });
    await getAllusers()
    
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
    console.log(id);
    let response = await fetch(`http://localhost:8000/user/${id}`, 
    {
        method: 'DELETE'
    }
    )
    getAllusers()

}






// let arrUsers = fetch('https://api.agify.io?name=bella')
// .then((response) => {
//     return response.json();
// })
// .then((data) => {                      
//     return data;           
// })

// console.log(arrUsers);

// const getData = async(url, method) => {
    
//    return fetch(url, method)
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {                      
//             return data;           
//         })
        
// }

// getData(`${mainUrl}/users`, {method: 'GET'});




// const createUsersList = async (data) => {    

//     await data.map( el => {
//         return (`<tr class="stringUser">
//      <td class="columnInput">
//          <input type="text" class="name input" name="name" value=${el.userName} >
//      </td>
//      <td class="columnInput">
//          <input type="email" class="email input" name="email"  value=${el.email}>
//      </td>
//      <td>${el.data_updated}</td>
//      <td>
//          <button onclick="changeUser(${el.id})">
//              <i class="fas fa-pencil-alt"></i>
//          </button>
//      </td>
//      <td>
//          <button onclick="removeUser(${el.id})">
//              <i class="far fa-trash-alt"></i>
//          </button>
//      </td>
//      <td>
//             <button class="saveBtn activeBtn" onclick="saveUser(${el.id})">Save</button>
//          <button class="confBtn" onclick="deleteUser(${el.id})">Confirm</button>
//      </td>
//  </tr>`)

//     })

// }

// createUsersList(getData(`${mainUrl}/users`, {method: 'GET'}));