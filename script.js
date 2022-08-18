let tododata = [];

// window.localStorage.setItem()
// window.localStorage.getItem()

let form = document.getElementById("inputForm");
function inputHandeler (event) {
  console.log(event.target);
  event.target.preventDefault;
  tododata.push(e.target.value);
  alert("imp handler");
console.log("1")

};

form.addEventListener("submit", inputHandeler);
console.log("1")


// {
//   //appling some classes to li
//   let li_list = document.getElementsByTagName("li");
//   let looplen = li_list.length;
//   for (let i = 0; i < looplen; i++) {
//     li_list[i].classList.add("text-center", "p-2", "m-3");
//   }
// }
