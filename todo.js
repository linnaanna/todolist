var myList = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myList.length; i++) {
  var span = document.createElement("span");
  var textgap = ("\u00A0\u00A0\u00A0");
  //var gap = document.createTextNode("\u00A0\u00A0\u00A0");
  var trashcan = document.createElement("img");
  span.className = "close";
  
  span.appendChild(trashcan);
  //span.appendChild(gap);
  myList[i].appendChild(span);
}



function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("task").value;
  var textgap = ("\u00A0\u00A0\u00A0");
  var text = document.createTextNode(inputValue+textgap);
  li.appendChild(text);
  if (inputValue === '') {
    alert("Write something first!");
    var element = document.getElementById("task");
    setTimeout(function () {element.classList.add("wrong")}, 100);
    setTimeout(function () {element.classList.remove("wrong")}, 1000);
    
  } else if (inputValue.length < 4) {
    alert("Input must be longer!");
    var element = document.getElementById("task");
    setTimeout(function () {element.classList.add("wrong")}, 100);
    setTimeout(function () {element.classList.remove("wrong")}, 1000);

  } else {
    document.getElementById("todolist").appendChild(li);
  }
  document.getElementById("task").value = "";

  var span = document.createElement("span");
  var trashcan = document.createElement("img");
  var gap = document.createTextNode("\u00A0\u00A0\u00A0\u00A0");
  span.className = "close";
  span.appendChild(gap);
  span.appendChild(trashcan);
  li.appendChild(span);

  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('done');
  }
}, false);

  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}


function clearList () {


}

function saveData() {
  localStorage.setItem("todolist", document.getElementById("todolist").value);
  alert("List saved!");
}
/*
function populateData() {
  document.getElementById("todolist").value = localStorage.getItem("todolist");
  var sessiondata = <ul>localStorage.getItem("todolist")</ul>
  document.getElementById("sessiondata").innerHTML = sessiondata;
  
  
}
*/

function populateData() {
  var tasks = Array.from(JSON.parse(localStorage.getItem("todolist")));
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    
    list.insertBefore(li, list.children[0]);
  });
}
