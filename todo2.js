
const todoForm = document.querySelector('.todo-form');

const todoInput = document.querySelector('.todo-input');

const todoItemsList = document.querySelector('.todo-items');
// create array to store todos
let todos = [];
// add eventListener for submit 
todoForm.addEventListener('submit', function(event) {
// prevent reloading when submitting
  event.preventDefault();
// call addTodo function
  addTodo(todoInput.value); 
});


// function to check for correcteness and add todo
function addTodo(item) {
    if (item === '') {
        alert("Write something first!");
        var element = document.getElementById("input");
        setTimeout(function () {element.classList.add("wrong")}, 100);
        setTimeout(function () {element.classList.remove("wrong")}, 1000);
        
      } else if (item.length < 4) {
        alert("Input must be longer!");
        var element = document.getElementById("input");
        setTimeout(function () {element.classList.add("wrong")}, 100);
        setTimeout(function () {element.classList.remove("wrong")}, 1000);
    
      } else {
  
  if (item !== '') {
// make todo object with id, name, and completed status
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };
// add to array and store
    todos.push(todo);
    addToLocalStorage(todos);
// clear input box value
    todoInput.value = '';
  }
}
}


//populate todos on screen
function renderTodos(todos) {
// clear everything in <ul> with class=todo-items
  todoItemsList.innerHTML = '';
// run through items in todos
  todos.forEach(function(item) {
    // check if item is completed
    const checked = item.completed ? 'checked': null;


// make <li> element and fill it
    
    const li = document.createElement('li');
   
    li.setAttribute('class', 'item');
    
    li.setAttribute('data-key', item.id);
    
    if (item.completed === true) {
      li.classList.add('checked');
    }
li.innerHTML = 
`
       <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="close"></button>
    `;


//  add <li> to <ul>
    todoItemsList.append(li);
  });
}


//add todos to storage
function addToLocalStorage(todos) {

  localStorage.setItem('todos', JSON.stringify(todos));
// populate them on screen
  renderTodos(todos);
}


// get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  
  if (reference) {
    
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}
// set value to completed or not completed
function toggle(id) {
  todos.forEach(function(item) {
    
    if (item.id == id) {
    
      item.completed = !item.completed;
    }
  });
addToLocalStorage(todos);
}
// deletes todo from todos array, updates localstorage and populates updated list on screen
function deleteTodo(id) {
// filters out <li> with id and updates todos array
  todos = todos.filter(function(item) {
   
    return item.id != id;
  });
// update localStorage
  addToLocalStorage(todos);
}
// get everything from localStorage
getFromLocalStorage();
//listen for click event in close-button and checkbox
todoItemsList.addEventListener('click', function(event) {
// check if the event is on checkbox
  if (event.target.type === 'checkbox') {
// toggle the state
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
// check if item has been closed
  if (event.target.classList.contains('close')) {
// get id from data-key value where item has been closed
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});