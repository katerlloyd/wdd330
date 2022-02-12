import Todos from "./Todos.js";

// const input = document.querySelector('input');
const addButton = document.querySelector('#addButton');
// const list = document.querySelector('.list');
// let idCount = 1;

const todos = new Todos();
// todos.listTodos();

addButton.addEventListener('click', todos.addTodo);

// addButton.addEventListener('click', function() {
//     if (input.value != "") {
//         let area = document.createElement('div');

//         let checkbox = document.createElement('input');
//         checkbox.setAttribute('type', 'checkbox');
//         checkbox.setAttribute('id', `task${idCount}`);
//         checkbox.setAttribute('name', `task${idCount}`);
//         checkbox.setAttribute('value', `${input.value}`);

//         let label = document.createElement('label');
//         label.setAttribute('for', `task${idCount}`);
//         label.textContent = input.value;

//         let deleteButton = document.createElement('button');
//         deleteButton.textContent = 'X';
        
//         area.appendChild(checkbox);
//         area.appendChild(label);
//         area.appendChild(deleteButton);
//         list.appendChild(area);
//         idCount++;

//         deleteButton.addEventListener('click', function() {
//             list.removeChild(area); 
//             input.value = ''; 
//             input.focus();
//         });
        
//         input.value = '';
//         input.focus();
//     }
// })