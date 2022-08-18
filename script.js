let tododata = [];
const form = document.getElementById("form");
form.addEventListener("submit", logSubmit);

// =========================================

window.onload = loadTasks();

function loadTasks() {
  // Get the tasks from localStorage on load
  let tasks = storageGet()
  console.log(tasks)
   appenditems(tasks);
  
}
// =========================================
// localStorage.clear();


function storageSet(arr_params) {
  localStorage.clear();
  // alert("storageSet start")
  localStorage.setItem("tododata", JSON.stringify(arr_params));
}
function storageGet() {
  // alert("storageGET start",localStorage.getItem("tododata"))
  return JSON.parse(localStorage.getItem("tododata"));
}

function logSubmit(event) {
  event.preventDefault();
  tododata.push(event.target[0].value);
  // storageSet(tododata);
  event.target[0].value = "";
  storageSet(tododata);
  console.log(storageGet());
}

// printing user data

//maping function


// let tododata_storage = storageGet();

function createNewTaskElement(taskString) {
  // create List Item
  let listItem = document.createElement("li");
  // label
  let label = document.createElement("label");
  // input (text)
  let editInput = document.createElement("input");
  // button.edit
  let editButton = document.createElement("button");
  // button.delete
  let deleteButton = document.createElement("button");

  editInput.type = "text";
  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";
  editInput.className = "hidden";
  editButton.classList.add("text-center", "p-2", "m-3");
  deleteButton.classList.add("text-center", "p-2", "m-3");

  label.innerText = taskString;

  // Each element needs appending
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  document.getElementById("ol_list").appendChild(listItem);
};
function appenditems(arr) {
  arr.map((elem, index) => {
    createNewTaskElement(elem);
  });
}


{
  //appling some classes to li
  let li_list = document.getElementsByTagName("li");
  let looplen = li_list.length;
  for (let i = 0; i < looplen; i++) {
    li_list[i].classList.add("text-center", "p-10", "m-3");
  }
}
