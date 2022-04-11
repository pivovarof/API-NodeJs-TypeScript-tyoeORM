const addBtn = document.getElementById('addBtn');
const tbody = document.getElementById('tbody');
const removeAll = document.getElementById('removeBtn');
const mainUrl = 'http://localhost:8000/user';


async function createTableUser (arr) {
    let  name = '';
    let  email = '';
    let  date;
    let  id;    
    
    let result = arr.map(el => {        
        
          name = el.userName;
          email = el.email;
          date = el.data_updated;
          id = el.id;
        
        return (`<tr class="stringUser" id=${id}>
     <td class="columnInput">
         <input type="text" class="name input" name="name" value=${name} >
     </td>
     <td class="columnInput">
         <input type="email" class="email input" name="email"  value=${email}>
     </td>
     <td>${date}</td>
     <td>
         <button onclick="changeUser(${id})">
             <i class="fas fa-pencil-alt"></i>
         </button>
     </td>
     <td>
         <button onclick="removeUser(${id})">
             <i class="far fa-trash-alt"></i>
         </button>
     </td>
     <td>
            <button class="saveBtn activeBtn" onclick="saveUser(${id})">Save</button>
         <button class="confBtn" onclick="deleteUser(${id})">Confirm</button>
     </td>
 </tr>`) 

    })
    
    
    return tbody.innerHTML = result.join('');    
    
}


const getAllusers = async () => {
    let response = await fetch('http://localhost:8000/user/users');
    let res = await response.json();
    await createTableUser(res)

}
getAllusers()

addBtn.addEventListener('click', () => {
    let inputName = document.querySelectorAll('.name');
    let inputEmail = document.querySelectorAll('.email');
    let stringUser = document.querySelectorAll('.stringUser')
    
    stringUser.forEach( el => {
        if(el.id){
           let saveBtn = document.getElementsByClassName('saveBtn');
           console.log(saveBtn);
        }

       
    })
    

})




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