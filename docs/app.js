const modeChange = document.getElementById('mode').addEventListener('click', changeImg);
const lists = document.getElementById('todos');
const input = document.getElementById('taskValue');
const div = document.getElementById('div');
const add = document.getElementById('addTodo').addEventListener('click', addtask);
const dateElement = document.getElementById('date');


// class names 
const check = "fa-check-circle";
const unCheck = "fa-circle";
const strike = "line-through";
const checkBg = "bg-gradient-to-r";
const startColor = "from-blue-gradient-start";
const endColor = "to-blue-gradient-end";

// variables 
let LIST, id ;

// get todo from localStorage
let data = localStorage.getItem('TODO');

if(data === null){
  // if data is empty 
  LIST = [];
  id  = 0;
  
}
else{
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
}

// load d list to d user interface
function loadList(array){
  array.forEach((task) => {
    addTodo(task.name, task.id, task.done, task.trash)
  });
}

// show today's date
const options = {weekday : 'long', month: 'short', day:'numeric'}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

function changeImg(){
  let img = document.getElementById('mode-img');
  let nav_bg = document.querySelector('.nav-img');
  let desktopNavBg = document.getElementById('desktop-bg');

  // if(img.src.match('../images/icon-moon.svg'))
  img.src.match('./images/icon-moon.svg')
    ? (document.documentElement.classList.add('dark'), img.src='./images/icon-sun.svg', desktopNavBg.src='./images/bg-desktop-dark.jpg', nav_bg.src='./images/bg-mobile-dark.jpg')
    : (document.documentElement.classList.remove('dark'), img.src='./images/icon-moon.svg', desktopNavBg.src='./images/bg-desktop-light.jpg', nav_bg.src='./images/bg-mobile-light.jpg')
    
}

if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
  document.documentElement.classList.add('dark');
}
else{
  document.documentElement.classList.remove('dark');
}

function addTodo(toDo, id, done, trash){
  if(trash){
    return; 
  }
  else{
      const DONE = done ? check : unCheck ;
      const background = done ? checkBg : "";
      const start = done ? startColor : "";
      const end = done ? endColor : "";
      const LINE = done ? strike : "";
      const text = `
        <li class="flex justify-between w-full pt-2 px-3.5 pb-1.5"> 
          <div class="text-sm check">
              <i class="far ${DONE} ${background} ${start} ${end} fa-lg text-gray-400 complete cursor-pointer" id="${id}"></i>
              <span class="text break-all ml-2 ${LINE}">${toDo}</span>
          </div>
          
          <svg id="${id}" class="delete cursor-pointer" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;">
            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#9394a5"><path d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"></path></g></g>
          </svg>
        </li> 
        
        `
      const position = "beforeend";

      lists.insertAdjacentHTML(position, text)

      div.innerHTML= `
              <p class=""> <span id="noOfItemsLeft"></span><!-- Add dynamic number --> item(s) left</p>
              <div class="flex justify-between text-base hidden font-semibold lg:flex xl:text-xl">
                  <p><a href="" class="cursor-pointer px-2">All</a></p>
                  <p><a href="" class="cursor-pointer px-2">Active</a></p>
                  <p><a href="" class="cursor-pointer px-2">Completed</a></p>
              </div>
              <p><a href="#" class="cursor-pointer" id="clear"> Clear Completed</a></p>
    `;
      const clearCompletedTodos = document.getElementById('clear').addEventListener("click", clear)
      // console.log(clearCompletedTodos)

    lists.appendChild(div)
  }
      
}
// addTodo("todo", 1, false, false)

// add a todo with d enter key 
document.addEventListener('keyup', function(event){
  if(event.keyCode == 13 ){
    const toDo = input.value;
    // if d input isn't empty
    if(toDo){
      addTodo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

    // add todo to localStorage
    localStorage.setItem('TODO', JSON.stringify(LIST));

      id++;
    }
    input.value = '';
  }
})
function addtask(){
  const toDo = input.value;
    // if d input isn't empty
    if(toDo){
      addTodo(toDo)
    }
    input.value = '';
}

// complete toDo
function completeTodo(task){
  task.classList.toggle(check);
  task.classList.toggle(unCheck);
  task.classList.toggle(checkBg);
  task.classList.toggle(startColor);
  task.classList.toggle(endColor);
  task.parentNode.querySelector('.text').classList.toggle(strike);

  LIST[task.id].done = LIST[task.id].done ? false : true;
}

// remove todo
function removeTodo(task){
  if(confirm('Are you sure ?')){
    task.parentNode.parentNode.removeChild(task.parentNode);
  }

  LIST[task.id].trash = true;
}


// target d list created dynamically
lists.addEventListener('click', function(event){
  const task = event.target;
  const taskJob = task.classList;

  if(taskJob.contains('complete')){
    completeTodo(task);
  }else if(taskJob.contains('delete')){
    removeTodo(task);
  }

  // add todo to localStorage
  localStorage.setItem('TODO', JSON.stringify(LIST))
})

// clear completed todos
function clear(){
  for(let i = 0; i < lists.childNodes.length; i++){
    const completed = lists.childNodes;
    console.log(completed)
    
  }
}
//   let completed = document.getElementsByClassName('strike');
//   console.log(completed);

//   LIST[task.id].done = LIST[task.id].done ? false : true;
  // if(completed.parentNode)
  // cnsole.log(completed)
  // const completed = event.target;
  // console.log(completed.parentNode.parentNode.parentNode.children)
  // const struckList = document.
  // const target = completed.parentNode.parentNode.parentNode.children;
  
  // if(event.target.parentNode.parentNode.parentNode.children.getAttribute('job')){
  //   console.log(event.target)
  // }
// }

// function clear(){
//   console.log(434657)
  // const completed = document.querySelector('.complete')
  // console.log(completed)
  // if(completed === 'complete'){
  //   if(confirm('Are you sure ?')){
  //     // console.log(document.attributes.job.value)
  //     // completed.parentNode.remove();
  //   }
  // }
// }
















// // mode toggler
// const modeChange = document.getElementById('mode').addEventListener('click', changeImg);
// // checkBox
// // const inputChecked = document.getElementById('add');
// // tasklists
// // const ul = document.getElementById('todos');
// // input value 
// // const input = document.getElementById('taskValue');
// // const div = document.getElementById('div');

// // load all event listeners
// // loadEventListeners();

// // load all event listeners 
// function loadEventListeners(){
//    // getTasks
//    document.addEventListener('DOMContentLoaded', getTasks);
//   // add task event 
//   inputChecked.addEventListener('click', addTask);
//   // remove task event 
//   ul.addEventListener('click', removeTask);
 
// }

// function getTasks(e){
//   let todos;
//   let completedTodos;
//   if(localStorage.getItem('todos') === null){
//     todos = [];
//   }
//   else if(localStorage.getItem('completedTodos') === null){
//     completedTodos = [];
//   }
//   else{
//     todos = JSON.parse(localStorage.getItem('todos'))
//     completedTodos = JSON.parse(localStorage.getItem('completedTodos'))
//   }

//     todos.forEach((todo) => {
//       // create li element 
//       const li = document.createElement('li');
//       // styling the list element 
//       li.style.padding = '.5rem .8rem .3rem .9rem';
//       li.style.borderBottom = '1px solid hsl(236, 9%, 61%)';
//       // giving a classname to d li element
//       li.className = 'task flex justify-between';
      
//       // container holding checkbox and textnode
//       const checkBoxAndTextNode = document.createElement('div');
//       // giving a classname 
//       checkBoxAndTextNode.className = 'flex justify-between';
//       // create checkbox div 
//       const check = document.createElement('div');
//       // giving a classname to  d checkbox
//       check.className = 'flex items-center check';

//       // adding elements to the checkbox div
//       check.innerHTML = `
//           <input type="checkbox" id="add" name="A3-confirmation" class="listCheck opacity-0 absolute h-8 w-8 cursor-pointer" />
//           <div id="checkbox" class="border-2 rounded-xl border-gray-300 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 mt-0 focus-within:border-blue-500 lg:w-7 lg:h-7">
//               <svg class="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
//               <g fill="none" fill-rule="evenodd">
//                   <g transform="translate(-9 -11)" fill="#fff" fill-rule="nonzero">
//                   <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
//                   </g>
//               </g>
//               </svg>
//           </div>
//       `;
//       checkBoxAndTextNode.appendChild(check);
//       checkBoxAndTextNode.appendChild(document.createTextNode(todo));
      
//       // create delete icon 
//       const deleteIcon = document.createElement('a');
//       // give deleteIcon a classname 
//       deleteIcon.className = 'delete-item justify-self-end cursor-pointer';
//       // add d delete icon 
//       deleteIcon.innerHTML = `
//         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172"style=" fill:#000000;">
//           <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#9394a5"><path d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"></path></g></g>
//         </svg>
//       `;

//       // append checkbox and textnode to list element
//       li.appendChild(checkBoxAndTextNode);
//       // append deleteicon to d list element 
//       li.appendChild(deleteIcon);
//       // append d list element to d unordered list element
//       ul.appendChild(li);

//     });

//     completedTodos.forEach((completedTodo) => {
      
//     });
//     // completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
//     // completedTasks.forEach((completedTask) => {
//     //   for(const listCheck of listItemCompleted){
//     //     // add an event listener 
//     //     listCheck.addEventListener('change', function(e){
//     //     // if d checkbox is checked
//     //       let checkBoxNextSibling = e.target.parentElement.nextElementSibling;
//     //       if(e.target.checked){
//     //         checkBoxNextSibling.classList.add('line-through');
//     //       }
//     //       // if d checkbox is unchecked
//     //       else{
//     //         checkBoxNextSibling.classList.remove('line-through');
//     //       }
//     //     })
//     //   }
//     // })

//   div.innerHTML = `
//           <p class=""> <span id="noOfItemsLeft"></span><!-- Add dynamic number --> item(s) left</p>
//           <div class="flex justify-between text-base hidden font-semibold lg:flex xl:text-xl">
//               <p><a href="" class="cursor-pointer px-2">All</a></p>
//               <p><a href="" class="cursor-pointer px-2">Active</a></p>
//               <p><a href="" class="cursor-pointer px-2">Completed</a></p>
//           </div>
//           <p><a href="#" class="cursor-pointer clearCompletedTasks"> Clear Completed</a></p>
//       `;
//     //   const listItemCompleted = document.querySelectorAll('.listCheck');
//     //   for(const listCheck of listItemCompleted){
//     //     // add an event listener 
//     //     listCheck.addEventListener('change', function(e){
//     //     // if d checkbox is checked
//     //     let checkBoxNextSibling = e.target.parentElement.nextElementSibling;
//     //     if(e.target.checked){
//     //       checkBoxNextSibling.classList.add('line-through');
//     //     }
//     //     // if d checkbox is unchecked
//     //     else{
//     //       checkBoxNextSibling.classList.remove('line-through');
//     //     }
//     //   })

//     // };

//     // append d div to d ul element
//     ul.appendChild(div);
//   e.preventDefault();
// } 



// function changeImg(){
//   let img = document.getElementById('mode-img');
//   let nav_bg = document.querySelector('.nav-img');
//   let desktopNavBg = document.getElementById('desktop-bg');

//   // if(img.src.match('../images/icon-moon.svg'))
//   img.src.match('../images/icon-moon.svg')
//     ? (document.documentElement.classList.add('dark'), img.src='../images/icon-sun.svg', desktopNavBg.src='../images/bg-desktop-dark.jpg', nav_bg.src='../images/bg-mobile-dark.jpg')
//     : (document.documentElement.classList.remove('dark'), img.src='../images/icon-moon.svg', desktopNavBg.src='../images/bg-desktop-light.jpg', nav_bg.src='../images/bg-mobile-light.jpg')
    
// }



// if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
//   document.documentElement.classList.add('dark');
//   // console.log(242567);
// }
// else{
//   document.documentElement.classList.remove('dark');
// }



// function addTask(e){
//   if(input.value === ''){
//     alert('Add a task');
//     document.querySelector('svg').style.display = 'none';
//     document.getElementById('checkbox').style.background = 'transparent';
//     document.getElementById('checkbox').style.border = '2px solid rgba(209, 213, 219,.8)';
//   }
//   else{
//     document.querySelector('svg').style.display = 'block';
//     document.getElementById('checkbox').style.background = 'linear-gradient(to right, #57ddff, #c058f3)';
//     document.getElementById('checkbox').style.border = 'transparent';

//     // create li element 
//     const li = document.createElement('li');
//     // styling the list element 
//     li.style.padding = '.5rem .8rem .3rem .9rem';
//     li.style.borderBottom = '1px solid hsl(236, 9%, 61%)';
//     // giving a classname to d li element
//     li.className = 'task flex justify-between';
    
//     // container holding checkbox and textnode
//     const checkBoxAndTextNode = document.createElement('div');
//     // giving a classname 
//     checkBoxAndTextNode.className = 'flex justify-between';
//     // create checkbox div 
//     const check = document.createElement('div');
//     // giving a classname to  d checkbox
//     check.className = 'flex items-center check';

//     // adding elements to the checkbox div
//     check.innerHTML = `
//         <input type="checkbox" id="add" name="A3-confirmation" class="listCheck opacity-0 absolute h-8 w-8 cursor-pointer" />
//         <div id="checkbox" class="border-2 rounded-xl border-gray-300 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 mt-0 focus-within:border-blue-500 lg:w-7 lg:h-7">
//             <svg class="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
//             <g fill="none" fill-rule="evenodd">
//                 <g transform="translate(-9 -11)" fill="#fff" fill-rule="nonzero">
//                 <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
//                 </g>
//             </g>
//             </svg>
//         </div>
//     `;
    
//     // list item
//     let listItem = document.createElement('span');
//     listItem.innerText = input.value;
//     listItem.className = 'span break-all';
//     // let listItem = document.createTextNode(input.value);
//     checkBoxAndTextNode.appendChild(check);
//     checkBoxAndTextNode.appendChild(listItem);
    
//     // create delete icon 
//     const deleteIcon = document.createElement('a');
//     // give deleteIcon a classname 
//     deleteIcon.className = 'delete-item justify-self-end cursor-pointer';
//     // add d delete icon 
//     deleteIcon.innerHTML = `
//       <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172"style=" fill:#000000;">
//         <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#9394a5"><path d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"></path></g></g>
//       </svg>
//     `;

//     // append checkbox and textnode to list element
//     li.appendChild(checkBoxAndTextNode);
//     // append deleteicon to d list element 
//     li.appendChild(deleteIcon);
//     // append d list element to d unordered list element
//     ul.appendChild(li);
//     // store in localStorage 
//     // storeTaskInLocalStorage(input.value);

//     const listItemCompleted = document.querySelectorAll('.listCheck');
//     for(const listCheck of listItemCompleted){
//       // add an event listener 
//       listCheck.addEventListener('change', function(e){
//       // if d checkbox is checked
//         let checkBoxNextSibling = e.target.parentElement.nextElementSibling;
//         if(e.target.checked){
//           checkBoxNextSibling.classList.add('line-through');
//           // console.log(checkBoxNextSibling)
//           // storeCompletedTaskInLocalStorage(checkBoxNextSibling.value);

//         }
//         // if d checkbox is unchecked
//         else{
//           checkBoxNextSibling.classList.remove('line-through');
//         }
//       });
//     }
    
    
//     // console.log(ul);
//   }
//   div.innerHTML = `
//         <p class=""> <span id="noOfItemsLeft"></span><!-- Add dynamic number --> item(s) left</p>
//         <div class="flex justify-between text-base hidden font-semibold lg:flex xl:text-xl">
//             <p><a href="" class="cursor-pointer px-2">All</a></p>
//             <p><a href="" class="cursor-pointer px-2">Active</a></p>
//             <p><a href="" class="cursor-pointer px-2">Completed</a></p>
//         </div>
//         <p><a href="#" class="cursor-pointer clearCompletedTasks"> Clear Completed</a></p>
//     `;
//       // clear completed button 
//       const clearCompleted = document.querySelector('.clearCompletedTasks')
//       // clear completed tasks event
//       clearCompleted.addEventListener('click', () => {
//         let allSpanElem = document.querySelectorAll('span');
  
//         for(const span of allSpanElem){
//           if(span.classList.contains('line-through')) {
//             span.parentElement.parentElement.remove();
//           }
//         }
//       })

//     // append d div to d ul element
//     ul.appendChild(div);
//     // clear inputted todo after adding to d ul 
//     input.value = '';
//     document.querySelector('svg').style.display = 'none';
//     document.getElementById('checkbox').style.background = 'transparent';
//     document.getElementById('checkbox').style.border = '2px solid rgba(209, 213, 219,.8)';
//     e.preventDefault();
// }

// // function storeTaskInLocalStorage(todo){
// //     let todos;
// //     if(localStorage.getItem('todos') === null){
// //       todos = [];
// //     }
// //     else{
// //       todos = JSON.parse(localStorage.getItem('todos'))
// //     }
// //     todos.push(todo);
// //     localStorage.setItem('todos', JSON.stringify(todos));
// // }

// // function storeCompletedTaskInLocalStorage(completedTodo){
// //   let completedTodos;
// //   if(localStorage.getItem('completedTodos')){
// //     completedTodos = [];
// //   }
// //   else{
// //     completedTodos = JSON.parse(localStorage.getItem('completedTodos'))
// //   }
// //   completedTodos.push(completedTodo);
// //   localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
// // }


// // remove task 
// function removeTask(e){
//   if(e.target.parentElement.classList.contains('delete-item')){
//     if(confirm('Are you sure ?')){
//       e.target.parentElement.parentElement.remove();
//       removeTaskFromLocalStorage();
//     }
//   }
// }
// // function removeTaskFromLocalStorage(taskItem){
// //   let todos;
// //   if(localStorage.getItem('todos') === null){
// //     todos = [];
// //   }
// //   else{
// //     todos = JSON.parse(localStorage.getItem('todos'))
// //   }
// //   todos.forEach((todo, index) =>{
// //     if(taskItem.textContent === todo){
// //       todos.splice(index, 1)
// //     }
// //   })
// //   localStorage.setItem('todos', JSON.stringify(todos));

// // }

