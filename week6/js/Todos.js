class Todos {
    constructor(key, element) {
        this.key = 'list';
        this.element = document.querySelector('.listcontainer');
    }

    removeTodo = (key) => {
        // console.log('removeTodo');
        localStorage.setItem(key, todoList);
    }

    listTodos() {
        // console.log('listTodos');
        renderTodoList(todoList, this.element);
    }

    addTodo = () => {
        // console.log('addTodo');
        const input = document.querySelector('input');
        saveTodo(this.key, input.value);
        this.listTodos();
    }

    completeTodo = (task) => {
        // console.log('completeTodo');
        if (task.completed === true) {
            task.completed = false;
        } else {
            task.completed = true;
        }
    }

    filterTodos = () => {
        // console.log('filterTodos');
        // let allButton = document.querySelector('#all');

        // allButton.addEventListener('click', function() {
        //     console.log('allButton');
        //     todoList.forEach(task => {
        //         task.style.display = 'block';
        //     });
        //     renderTodoList(todoList, this.element);
        // });

        // let activeButton = document.querySelector('#active');

        // activeButton.addEventListener('click', function() {
        //     console.log('activeButton');
        //     todoList.forEach(task => {
        //         if (task.completed) {
        //             task.style.display = 'none';
        //         }
        //     });
        //     renderTodoList(todoList, this.element);
        // });

        // let completedButton = document.querySelector('#completed');
        // completedButton.addEventListener('click', function() {
        //     console.log('completedButton');
        //     todoList.forEach(task => {
        //         if (!task.completed) {
        //             task.style.display = 'none';
        //         }
        //     });
        //     renderTodoList(todoList, this.element);
        // });
        // let completed = this.todoList.filter((task) => task.completed);

        // let active = this.todoList.filter((task) => !task.completed);
    }
}







const  todoList = [];

function saveTodo(key, task) {
    // console.log('saveTodo');
    let todo = { id: Date.now(), content: task, completed: false };
    // console.log(todo);
    todoList.push(todo);
    localStorage.setItem(key, todoList);
}

function getTodos(key) {
    // console.log('getTodos');
    if (todoList.length === 0 || todoList === null) {
        todoList = localStorage.getItem(key);
    }
    return todoList;
}

const renderTodoList = (list, element) => {
    element.innerHTML = "";
    // console.log('renderTodoList');
    list.forEach(task => {
        let div = document.createElement('div');
        div.classList.add('task');

        let checkButton = document.createElement('button');
        checkButton.classList.add('checkbutton');

        let text = document.createElement('p');
        text.textContent = task.content;

        if (task.completed) {
            checkButton.textContent = 'X';
            text.style.textDecoration = 'line-through';
        }

        checkButton.addEventListener('click', function() {
            // console.log('checkButton');
            // console.log(list);
            // completeTodo();
            if (task.completed === true) {
                task.completed = false;
            } else {
                task.completed = true;
            }
            renderTodoList(list, element);
        });

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deletebutton');
        deleteButton.textContent = 'X';

        deleteButton.addEventListener('click', function() {
            // console.log('deleteButton');

            // removeTodo();
            let taskIndex = todoList.indexOf(task);
            todoList.splice(taskIndex, 1);
            localStorage.setItem('list', todoList);
            element.removeChild(div); 
            renderTodoList(todoList, element);
        });

        div.appendChild(checkButton);
        div.appendChild(text);
        div.appendChild(deleteButton);
        element.appendChild(div);
    });

    // filterTodos();
    let allButton = document.querySelector('#all');

    allButton.addEventListener('click', function() {
        // console.log('allButton');
        // todoList.forEach(task => {
        //     task.style.display = 'block';
        // });

        renderTodoList(todoList, element);
    });

    let activeButton = document.querySelector('#active');

    activeButton.addEventListener('click', function() {
        // console.log('activeButton');
        let active = todoList.filter((task) => !task.completed);
        renderTodoList(active, element);
    });

    let completedButton = document.querySelector('#completed');
    completedButton.addEventListener('click', function() {
        // console.log('completedButton');
        let completed = todoList.filter((task) => task.completed);
        renderTodoList(completed, element);
    });

    let number = 0;
    todoList.forEach((task) => {
        if (task.completed === false) {
            number++;
        }
    })
    let count = document.querySelector('#count');
    count.textContent = `${number} tasks left`;
}

export default Todos;