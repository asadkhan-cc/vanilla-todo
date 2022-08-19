let tododata = [];
const form = document.getElementById("form");
form.addEventListener("submit", logSubmit);

// =========================================

window.onload = loadTasks();

function loadTasks() {
  console.log("before load", tododata);
  // Get the tasks from localStorage on load
  let tasks = storageGet();
  console.log("load task working", tasks);
  appenditems(tasks);
  console.log(tasks);
  if (tasks !== null) {
    tasks.forEach((element) => {
      tododata.push(element);
    });
  }

  console.log("before load", tododata);
}
// =========================================

function storageSet(arr_params) {
  // localStorage.clear();
  // alert("storageSet start");
  console.log(JSON.stringify(arr_params))
  localStorage.setItem("tododata", JSON.stringify(arr_params));
}
function storageGet() {
  // alert("storageGET start", JSON.stringify(localStorage.getItem("tododata")));
  if (localStorage.getItem("tododata") == "undefined") {
    return localStorage.getItem("tododata");
  } else return JSON.parse(localStorage.getItem("tododata"));

  // console.log()
}

function logSubmit(event) {
  event.preventDefault();
  tododata.push(event.target[0].value);
  // storageSet(tododata);
  console.log("before storage", tododata);
  storageSet(tododata);
  console.log("after storage", tododata);

  console.log("storage get", storageGet());
  createNewTaskElement(event.target[0].value, storageGet().length);
  event.target[0].value = "";
  listyles();
}

// printing user data

// let tododata_storage = storageGet();

function createNewTaskElement(taskString, id) {
  // create List Item
  let listItem = document.createElement("li");
  // label
  let label = document.createElement("label");
  // input (text)
  let editInput = document.createElement("input");
  // button.edit
  let editButton = document.createElement("button");
  // button.editupdate
  let updateEditButton = document.createElement("button");
  // button.delete
  let deleteButton = document.createElement("button");

  listItem.id = `todo-${id}`;
  label.classList.add("grows", "self-center");
  editInput.type = "text";
  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";
  updateEditButton.innerText = "Update";
  //======================================================
  editInput.classList.add(
    "hidden",
    "inpBorder",
    "rounded-full",
    "pl-3",
    "bg-gray-200","self-center"
  );

  updateEditButton.className = "hidden";

  updateEditButton.classList.add(
    "button2",
    "text-center",
    "p-1",
    "px-2",
    "ml-10",
    "m-1",
    "bg-green-300",
    "rounded-full"
  );
  editButton.classList.add(
    "button1",
    "text-center",
    "p-1",
    "ml-10",
    "m-1",
    "bg-blue-300",
    "rounded-full"
  );
  deleteButton.classList.add(
    "button2",
    "text-center",
    "p-1",
    "m-1",
    "bg-red-300",
    "rounded-full"
  );

  deleteButton.addEventListener("click", deleting_Func);
  editButton.addEventListener("click", editing_Func);
  updateEditButton.addEventListener("click", updating_func);
  label.innerText = taskString;

  // Each element needs appending
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(updateEditButton);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  document.getElementById("ol_list").appendChild(listItem);
}
//maping function
function appenditems(arr) {
  try {
    if (typeof arr === "object") {
      arr.map((elem, index) => {
        createNewTaskElement(elem, index + 1);
      });
    } else createNewTaskElement(arr);
  } catch (error) {
    console.log("some initial error");
  }
}

function listyles(param) {
  //appling some classes to li
  let li_list = document.getElementsByTagName("li");
  let looplen = li_list.length;
  for (let i = 0; i < looplen; i++) {
    li_list[i].classList.add(
      "text-center",
      "p-1",
      "m-3",
      "flex",
      "justify-end",
      "alighn-center"
    );
  }
}

document.getElementById("clear").addEventListener("click", clear);
function clear() {
  localStorage.clear();
  location.reload(true);
}
listyles();

function editing_Func(e) {
  // alert("edit clicked");
  let elem_id = e.path[1].id;
  let main_elem = document.getElementById(elem_id);
  console.log(main_elem);
  //making edit button invisible
  main_elem.children[3].style.display = "none";

  let label = main_elem.children[0];
  label.style.display = "none";
  let inp = main_elem.children[1];
  inp.classList.remove("hidden");
  let editUpdateButton = main_elem.children[2];
  editUpdateButton.style.display = "block";
  let elem_arr = storageGet();
  inp.value = label.innerText;
  console.log(inp, editUpdateButton.innerText);
}

function deleting_Func(e) {
  // alert("delete clicked");
  console.log(e.path[1].id);
  let elem_id = e.path[1].id;
  let main_elem = document.getElementById(elem_id);
  main_elem.style.display = "none";
  console.log(main_elem);
  let child = main_elem.firstChild;

  let elem_arr = storageGet();

  console.log(child.innerText);
  // const upd_arr = elem_arr.map((elem,index) => {
  //   if (elem == child.innerText ){
  //     elem_arr.splice(index, 1)
  //   }
  //  });

  //=========this code deletes item from local storage
  let del_elem_index = elem_arr.indexOf(child.innerText);
  elem_arr.splice(del_elem_index, 1);
  console.log("updated array", elem_arr);
  //=========this code updates item from local storage
  storageSet(elem_arr);
}
function updating_func(e) {
  // alert("edit update clicked");
  let elem_id = e.path[1].id;
  let main_elem = document.getElementById(elem_id);
  console.log(main_elem);
  //making edit button visible again and update edit invisible
  main_elem.children[3].style.display = "block";
  main_elem.children[2].style.display = "none";

  let label = main_elem.children[0];
  label.style.display = "";
  let inp = main_elem.children[1];
  console.log(inp.value, "update inp data value");
  inp.classList.add("hidden");
  let elem_arr = storageGet();
  console.log(elem_arr, "before change");
  let isBroken = false;
  elem_arr.map((elem, index) => {
    if (isBroken) {
      return;
    }
    if (elem === label.innerText) {
      elem_arr[index] = inp.value;
      isBroken = true;
      return;
    }
  });
  label.innerText = inp.value;

  console.log(elem_arr, "after change");
  storageSet(elem_arr);
  console.log(storageGet(),"getting updated array from local storage");
}
