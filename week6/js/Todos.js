class Todos {
    constructor(key, element) {
        this.key = 'list';
        this.element = document.querySelector('.listcontainer');
    }

    removeTodo = () => {
        console.log('removeTodo');
        this.listTodos;
    }

    listTodos() {
        console.log('listTodos');
        renderTodoList(todoList, this.element);
    }

    addTodo = () => {
        console.log('addTodo');
        const input = document.querySelector('input');
        saveTodo(this.key, input.value);
        this.listTodos();
    }

    completeTodo = (task) => {
        console.log('completeTodo');
        if (task.completed === true) {
            task.completed = false;
        } else {
            task.completed = true;
        }
    }

    filterTodos() {
        console.log('filterTodos');
        let completed = this.todoList.filter((task) => task.completed);

        let active = this.todoList.filter((task) => !task.completed);
    }
}

const  todoList = [];

// const todoList = [
//     {
//         id: '',
//         content: 'Eat chocolate',
//         completed: true
//     },
//     {
//         id: '',
//         content: 'Eat more chocolate',
//         completed: false
//     },
//     {
//         id: '',
//         content: 'Write a story',
//         completed: true
//     },
//     {
//         id: '',
//         content: 'Play game',
//         completed: false
//     },
//     {
//         id: '',
//         content: 'Learn Russian',
//         completed: false
//     }
// ];

function saveTodo(key, task) {
    console.log('saveTodo');
    let todo = { id: Date.now(), content: task, completed: false };
    console.log(todo);
    todoList.push(todo);
    localStorage.setItem(key, todoList);
}

function getTodos(key) {
    console.log('getTodos');
    if (todoList.length === 0 || todoList === null) {
        todoList = localStorage.getItem(key);
    }
    return todoList;
}

const renderTodoList = (list, element) => {
    console.log('renderTodoList');
    list.forEach(task => {
        let div = document.createElement('div');
        div.classList.add('task');

        let checkButton = document.createElement('button');
        checkButton.classList.add('checkbutton');

        checkButton.addEventListener('click', function() {
            console.log('checkButton');
            console.log(list);
            // completeTodo(task);
            if (task.completed === true) {
                task.completed = false;
            } else {
                task.completed = true;
            }
            renderTodoList(list);
        });

        let text = document.createElement('p');
        text.textContent = task.content;

        if (task.completed) {
            checkButton.textContent = 'X';
            text.style.textDecoration = 'line-through';
        }

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deletebutton');
        deleteButton.textContent = 'X';

        deleteButton.addEventListener('click', function() {
            console.log('deleteButton');

            // list.removeTodo();
            list.forEach((task, index, object) => {
            if (task.id) {
                object.splice(index, 1);
            }
        });
            element.removeChild(div); 
        });

        div.appendChild(checkButton);
        div.appendChild(text);
        div.appendChild(deleteButton);
        element.appendChild(div);
    });

    let number = 0;
    list.forEach((task) => {
        if (task.completed === false) {
            number++;
        }
    })
    let count = document.querySelector('#count');
    count.textContent = `${number} tasks left`;
}

export default Todos;