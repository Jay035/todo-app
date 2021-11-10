// -----------------------------------

// VARIABLES
// todo lists Container 
const listContainer = document.querySelector('.todos');
// todo input 
const todoInput = document.getElementById('taskValue');
// add icon 
const addIcon = document.getElementById('addTodo');
// all button 
const allBtn = document.querySelector('.all');
// all button (mobile)
const allMobileBtn = document.querySelector('.all-mobile');
// active button
const activeBtn = document.querySelector('.active');
// active button (mobile)
const activeMobileBtn = document.querySelector('.active-mobile');
// completed button 
const completedBtn = document.querySelector('.completed');
// completed button (mobile)
const completedMobileBtn = document.querySelector('.completed-mobile');


// EVENT LISTENERS 
window.addEventListener('DOMContentLoaded', loadTodo);
window.addEventListener('DOMContentLoaded', todoCount);
// mode change trigger
document.getElementById('mode').addEventListener('click', changeImg);
// clear completed todos event
document.getElementById('clear').addEventListener('click', clearCompletedTodos, false);
// filter all todos event on desktops
allBtn.addEventListener('click', filterAll, false);
// filter active todos event on desktops
activeBtn.addEventListener('click', filterActive, false);
// filter completed todos event on desktops
completedBtn.addEventListener('click', filterCompleted, false);
// filter all todos event on mobile
allMobileBtn.addEventListener('click', filterAll, false);
// filter active todos event on mobile
activeMobileBtn.addEventListener('click', filterActive, false);
// filter completed todos event on mobile
completedMobileBtn.addEventListener('click', filterCompleted, false);

// toggle between light & dark mode
if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
  document.documentElement.classList.add('dark');
}
else{
  document.documentElement.classList.remove('dark');
}

// display present date
const dateElement = document.getElementById('date');
const options = {weekday : 'long', month: 'short', day:'numeric'}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// change Images according to light or dark mode 
function changeImg(){
  let img = document.getElementById('mode-img');
  // mobile nav img
  let nav_bg = document.querySelector('.nav-img');
  // desktop nav img
  let desktopNavBg = document.getElementById('desktop-bg');

  img.src.match('./images/icon-moon.svg')
    ? (document.documentElement.classList.add('dark'), img.src='./images/icon-sun.svg', desktopNavBg.src='./images/bg-desktop-dark.jpg', nav_bg.src='./images/bg-mobile-dark.jpg')
    : (document.documentElement.classList.remove('dark'), img.src='./images/icon-moon.svg', desktopNavBg.src='./images/bg-desktop-light.jpg', nav_bg.src='./images/bg-mobile-light.jpg')
    
}

// add todo function
addIcon.addEventListener('click', (addTodo) => {
  if(todoInput.value.trim() === ''){
    alert('Add a todo') ;
  }
  else{
    const li = document.createElement('li'),
      checkbox = document.createElement('label'),
      text = document.createTextNode(todoInput.value),
      span = document.createElement('span'),
      delBtn = document.createElement('button'),
      // div wrapping the textNode and delete button 
      textAndBtn = document.createElement('div');

      // add classnames
      li.classList.add('todo-li', 'flex', 'w-full', 'pt-2', 'px-3.5', 'pb-1.5', 'active', 'duration-200');
      checkbox.classList.add('inline-flex', 'justify-center', 'items-center', 'cursor-pointer', 'mr-2.5', 'rounded-full', 'h-6','hover:border-2', 'hover:border-bg-gradient-to-r', 'hover:border-from-blue-gradient-start', 'hover:border-to-blue-gradient-end');
      checkbox.innerHTML = `
        <input class="form-checkbox text-checkColor w-6 h-6 rounded-full focus-ring-blue-gradient-start focus-ring-opacity-25 border-2 border-gray-300 dark:bg-transparent dark:border-gray-300 cursor-pointer uncheck" type="checkbox" />
      `;
      // bg-gradient-to-r from-blue-gradient-start to-blue-gradient-end bg-clip-text
      span.classList.add('mr-8', 'break-all');
      delBtn.classList.add('hover:text-activeLinkColor');
      textAndBtn.classList.add('todo-li-wrap', 'flex', 'justify-between','w-full');
      
      delBtn.innerHTML = `<img src="./images/icon-cross.svg" alt="delete"/>`

      // append child elements to listContainer
      span.appendChild(text);
      textAndBtn.appendChild(span);
      textAndBtn.appendChild(delBtn);
      li.appendChild(checkbox);
      li.appendChild(textAndBtn);
      listContainer.appendChild(li);
      // console.log(listContainer)

      // remove todo event
      delBtn.addEventListener('click', removeTodo, false);
      // completeTodo
      listContainer.addEventListener('click', completeTodo, false);

      // store todo 
      storeTodo(todoInput.value);
      // clear input field after todo has been added 
      todoInput.value = '';
      // get d number of todos left
      todoCount();
  }

} , false);

// add todo also on enter key event 
todoInput.addEventListener('keydown', (e) => {
  if(e.keyCode === 13){
    addIcon.click();
  }
});

// store todo event
function storeTodo(item){
  let todos ;
  if(localStorage.getItem('TODOS') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('TODOS'));
  }
  todos.push(item);
  localStorage.setItem('TODOS', JSON.stringify(todos));
}

function loadTodo(){
  let todos ;
  if(localStorage.getItem('TODOS') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('TODOS'));

  for(let i in todos){
    const li = document.createElement('li'),
      checkbox = document.createElement('label'),
      text = document.createTextNode(todos[i]),
      span = document.createElement('span'),
      delBtn = document.createElement('button'),
      // div wrapping the textNode and delete button 
      textAndBtn = document.createElement('div');

      // add classnames
      li.classList.add('todo-li','flex', 'w-full', 'pt-2', 'px-3.5', 'pb-1.5', 'active');
      checkbox.classList.add('inline-flex', 'justify-center', 'items-center', 'cursor-pointer', 'mr-2.5', 'rounded-full', 'h-6','hover:border-2', 'hover:border-bg-gradient-to-r', 'hover:border-from-blue-gradient-start', 'hover:border-to-blue-gradient-end');
      checkbox.innerHTML = `
        <input class="form-checkbox text-checkColor w-6 h-6 rounded-full focus-ring-blue-gradient-start focus-ring-opacity-25 border-2 border-gray-300 dark:bg-transparent dark:border-gray-300 cursor-pointer uncheck" type="checkbox" />
      `;
      span.classList.add('mr-8', 'break-all');
      delBtn.classList.add('hover:text-activeLinkColor');
      textAndBtn.classList.add('todo-li-wrap', 'flex', 'justify-between','w-full');

      delBtn.innerHTML = `<img src="./images/icon-cross.svg" alt="delete"/>`

      // append child elements to listContainer
      span.appendChild(text);
      textAndBtn.appendChild(span);
      textAndBtn.appendChild(delBtn);
      li.setAttribute('draggable', 'true');
      li.appendChild(checkbox);
      li.appendChild(textAndBtn);
      listContainer.appendChild(li);

      // remove todo event
      delBtn.addEventListener('click', removeTodo, false);
      // completeTodo
      listContainer.addEventListener('click', completeTodo, false);
      //  count items left 
      todoCount();
  }
}

  let index = JSON.parse(localStorage.getItem('CompletedTodos') || '[]');
  for(let i = 0; i < index.length; i++){
    [...listContainer.children][index[i]].children[0].firstElementChild.setAttribute('checked','checked');
    [...listContainer.children][index[i]].children[0].firstElementChild.classList.add('dark:bg-current','border-current');
    [...listContainer.children][index[i]].children[0].firstElementChild.classList.remove('dark:bg-transparent', 'border-gray-300');
    [...listContainer.children][index[i]].classList.add('line-through', 'text-gray-400', 'complete');
    [...listContainer.children][index[i]].classList.remove("active");
  }

  // give d 'all' button a blue color when d page loads
  allBtn.classList.add('text-activeLinkColor');
  allMobileBtn.classList.add('text-activeLinkColor');
}

// remove todo event
function removeTodo(e){
  let lists = listContainer.getElementsByTagName('li'),
  index = [...lists].indexOf(e.target.parentNode.parentNode)
  if(confirm('You are about to delete a task')) {
    e.target.parentNode.parentNode.parentNode.remove();
  }
  // update local storage
  updateLocalStorage();
  // count the number of todos left
  todoCount();
      
}

function todoCount(){
  let lists = document.getElementsByTagName('li');
  let completedList = document.getElementsByClassName('complete')
  let lastIndex = [...lists].length - completedList.length ;
  
  let noOfItems = document.getElementById('noOfItemsLeft')
  noOfItems.textContent = lastIndex;
}

// complete a task 
function completeTodo(e){
  const target = e.target;
  if(target.checked){
    target.parentNode.parentNode.classList.add("complete", "line-through", "text-gray-400");
    target.parentNode.parentNode.classList.remove("active");
    target.classList.add('dark:bg-current', 'border-current');
    target.classList.remove('dark:bg-transparent');
    todoCount();
    updateCompletedTodos();
  }
  else{
    target.parentNode.parentNode.classList.remove("complete", "line-through", "text-gray-400");
    target.parentNode.parentNode.classList.add("active");
    target.classList.remove('dark:bg-current', 'border-current');
    target.classList.add('dark:bg-transparent');
    todoCount();
    updateCompletedTodos();
  }
}

function updateCompletedTodos(){
  let list = getIndex();
  localStorage.removeItem('CompletedTodos');
  localStorage.setItem('CompletedTodos', JSON.stringify(list));
}

//get index of completed todos
function getIndex(){
  let index = [];
  for(let i = 0; i < [...listContainer.children].length; i++){
    [...listContainer.children][i].classList.contains('complete')
    ? index.push(i) : null
    // console.log(index)

  }
  return index;
}

//get todos
function getList() {
  let list = [];
  for(let i = 0; i < [...listContainer.children].length; i++){
    list.push([...listContainer.children][i].children[1].children[0].textContent)
  }
  return list;
}

// update local Storage
function updateLocalStorage() {
  let list = getList();
  localStorage.clear();
  localStorage.setItem('TODOS', JSON.stringify(list));
  updateCompletedTodos();
}

// clear completed todos 
function clearCompletedTodos(){
  let completedTodos = document.querySelectorAll('.complete');
  if(completedTodos.length > 0 && confirm(`You are about to delete ${completedTodos.length} task(s).`)){
    for (let x of completedTodos) {
      x.remove();
      todoCount();
    }
  }else if(completedTodos.length <= 0){
    alert(`There are ${completedTodos.length} completed todos`)
  }
  updateLocalStorage()
}

// display all todos 
function filterAll(){
  let list = listContainer.getElementsByTagName('li');
  for(let i in [...list]){
    list[i].style.display = '';
  }
  
  let active = document.getElementsByClassName('active');
  // remove d hidden property of d list items 
  for(let i in [...active]) active[i].classList.remove('hidden');
  // give d 'all' button a blue color onclick
  allBtn.classList.add('text-activeLinkColor');
  allMobileBtn.classList.add('text-activeLinkColor');
  // remove d blue color of d 'active' button 
  activeBtn.classList.remove('text-activeLinkColor');
  activeMobileBtn.classList.remove('text-activeLinkColor');
  // remove d blue color of d 'completed' button 
  completedBtn.classList.remove('text-activeLinkColor');
  completedMobileBtn.classList.remove('text-activeLinkColor');

}

// display only active todos
function filterActive(){
  // reset styles 
  filterAll();
  // filter completed 
  let completed = document.getElementsByClassName('complete');
  for(let i in [...completed]) completed[i].classList.add('hidden');

  let active = document.getElementsByClassName('active');
  // remove d hidden property of d list items 
  for(let i in [...active]) active[i].classList.remove('hidden');

  // give d 'active' button a bright blue color onclick
  activeBtn.classList.add('text-activeLinkColor');
  activeMobileBtn.classList.add('text-activeLinkColor');
  // remove d blue color of d 'all' button 
  allBtn.classList.remove('text-activeLinkColor');
  allMobileBtn.classList.remove('text-activeLinkColor');
  // remove d blue color of d 'completed' button 
  completedBtn.classList.remove('text-activeLinkColor');
  completedMobileBtn.classList.remove('text-activeLinkColor');

}

// display only completed todos 
function filterCompleted(){
  // reset styles 
  filterAll();
  // filter active todos
  let active = document.getElementsByClassName('active');
  for(let i in [...active]) active[i].classList.add('hidden');
  // display d checked todos 
  let completed = document.getElementsByClassName('complete');
  for(let i in [...completed]) completed[i].classList.remove('hidden');

  // give d 'completed' button a bright blue color onclick
  completedBtn.classList.add('text-activeLinkColor');
  completedMobileBtn.classList.add('text-activeLinkColor')
  // remove d blue color of d 'all' button 
  allBtn.classList.remove('text-activeLinkColor');
  allMobileBtn.classList.remove('text-activeLinkColor');
  // remove d blue color of d 'active' button 
  activeBtn.classList.remove('text-activeLinkColor');
  activeMobileBtn.classList.remove('text-activeLinkColor');

}

let liSort =  new Sortable(listContainer, {
  animation: 150,
  ghostClass: 'sortable-ghost',
  onEnd: function (e){
    updateLocalStorage()
  },
  delayOnTouchOnly: true,
  delay: 100
})

