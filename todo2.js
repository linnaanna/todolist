
const todoForm = document.querySelector('.todo-form');

const todoInput = document.querySelector('.todo-input');

const todoItemsList = document.querySelector('.todo-items');

//create array for todos
let todos = [];

//add eventListener for submit event to call add Todo function
todoForm.addEventListener('submit', function (event) {
event.preventDefault();//prevent reloading when submitting
addTodo(todoInput.value);});


//check correcteness and add todo
function addTodo(item) {
  if (item === '') {
    alert("Write something first!");
    var element = document.getElementById("input");
    setTimeout(function () { element.classList.add("wrong") }, 100);
    setTimeout(function () { element.classList.remove("wrong") }, 1000);

  } else if (item.length < 4) {
    alert("Input must be longer!");
    var element = document.getElementById("input");
    setTimeout(function () { element.classList.add("wrong") }, 100);
    setTimeout(function () { element.classList.remove("wrong") }, 1000);

  } else if (item[0] == item[1] && item[1] == item[2]){
    alert("Seriously?");
    var element = document.getElementById("input");
    setTimeout(function () { element.classList.add("wrong") }, 100);
    setTimeout(function () { element.classList.remove("wrong") }, 1000);
  
  } else {

    if (item !== '') {
      
      const todo = { //todo object
        id: Date.now(),
        name: item,
        completed: false
      };
      
      todos.push(todo); //add to array and store
      addToLocalStorage(todos);
      todoInput.value = ''; //clear input box
    }
  }
}


//render todos on screen
function renderTodos(todos) {
  todoItemsList.innerHTML = '';
  todos.forEach(function (item) { //go through items in todos
    
    const checked = item.completed ? 'checked' : null; //check if item is completed

    //make <li> element and fill it, check for completed items 
    //and add check
    const li = document.createElement('li');

    li.setAttribute('class', 'item');

    li.setAttribute('data-key', item.id);

    if (item.completed === true) {
      li.classList.add('checked');
    }
    li.innerHTML =
      `<input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="close"></button>`;

    //finally, add <li> to <ul>
    todoItemsList.append(li);
  });
}


//add todos to storage and render on screen
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}


//get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');

  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

//set value to completed or not completed
function toggle(id) {
  todos.forEach(function (item) {

    if (item.id == id) {
        item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
}


//delete todo from todos array, update localstorage
//and render updated list on screen
function deleteTodo(id) {
  // filters out <li> with id and updates todos array
  todos = todos.filter(function (item) {
          return item.id != id;
          });

  addToLocalStorage(todos);
}
//get everything from localStorage
getFromLocalStorage();
//listen for click event in close-button and checkbox
todoItemsList.addEventListener('click', function (event) {
  //check if the event is on checkbox and change state
  if (event.target.type === 'checkbox') {
      toggle(event.target.parentElement.getAttribute('data-key'));
    }
  //check if item has been closed and get id from closed
  if (event.target.classList.contains('close')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});