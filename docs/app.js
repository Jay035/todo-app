// EVENT LISTENERS 
window.addEventListener('DOMContentLoaded', loadTodo);
window.addEventListener('DOMContentLoaded', todoCount);
// mode change trigger
document.getElementById('mode').addEventListener('click', changeImg);
// clear completed todos event
document.getElementById('clear').addEventListener('click', clearCompletedTodos, false);
// filter all todos event on desktops
document.querySelector('.all').addEventListener('click', filterAll, false);
// filter active todos event on desktops
document.querySelector('.active').addEventListener('click', filterActive, false);
// filter completed todos event on desktops
document.querySelector('.completed').addEventListener('click', filterCompleted, false);
// filter all todos event on mobile
document.querySelector('.all-mobile').addEventListener('click', filterAll, false);
// filter active todos event on mobile
document.querySelector('.active-mobile').addEventListener('click', filterActive, false);
// filter completed todos event on mobile
document.querySelector('.completed-mobile').addEventListener('click', filterCompleted, false);

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

  // if(img.src.match('../images/icon-moon.svg'))
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
      checkbox = document.createElement('div'),
      text = document.createTextNode(todoInput.value),
      span = document.createElement('span'),
      delBtn = document.createElement('button'),
      // div wrapping the textNode and delete button 
      textAndBtn = document.createElement('div');

      // add classnames
      li.classList.add('todo-li', 'flex', 'w-full', 'pt-2', 'px-3.5', 'pb-1.5');
      checkbox.classList.add('todo-checkbox', 'before:empty-content', 'before:bg-check-before', 'before:h-6', 'before:w-6', 'before:rounded-lg', 'w-6', 'flex', 'justify-center', 'items-center', 'cursor-pointer', 'mr-2.5', 'rounded-full', 'h-6', 'bg-transparent', 'border-2', 'border-gray-300', 'dark:border-gray-400', 'hover:border-bg-gradient-to-r', 'hover:border-from-blue-gradient-start', 'hover:border-to-blue-gradient-end');
      span.classList.add('mr-4');
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
  }

  for(let i in todos){
    const li = document.createElement('li'),
      checkbox = document.createElement('div'),
      text = document.createTextNode(todos[i]),
      span = document.createElement('span'),
      delBtn = document.createElement('button'),
      // div wrapping the textNode and delete button 
      textAndBtn = document.createElement('div');

      // add classnames
      li.classList.add('todo-li', 'flex', 'w-full', 'pt-2', 'px-3.5', 'pb-1.5');
      checkbox.classList.add('todo-checkbox', 'before:empty-content', 'before:bg-check-before', 'before:h-6', 'before:w-6', 'before:rounded-lg', 'w-6', 'flex', 'justify-center', 'items-center', 'cursor-pointer', 'mr-2.5', 'rounded-full', 'h-6', 'bg-transparent', 'border-2', 'border-gray-400', 'dark:border-gray-300', 'hover:border-bg-gradient-to-r', 'hover:border-from-blue-gradient-start', 'hover:border-to-blue-gradient-end');
      span.classList.add('mr-4');
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
      
      //  count items left 
      todoCount();
  }
  let index = JSON.parse(localStorage.getItem('CompletedTodos') || '[]');
  for(let i = 0; i < index.length; i++){
    [...listContainer.children][index[i]].children[0].classList.add('todo-completed', 'bg-gradient-to-r', 'from-blue-gradient-start', 'to-blue-gradient-end', 'flex', 'justify-center', 'items-center', 'after:empty-content', 'after:my-1.5', 'after:bg-contain', 'after:bg-no-repeat','after:bg-checkbox','after:h-6', 'after:w-7');
    [...listContainer.children][index[i]].classList.add('line-through', 'text-listColor');
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
    // console.log(e.target.parentNode.parentNode.parentNode)
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
  // console.log(completedList.length)
  let lastIndex = [...lists].length - completedList.length ;
  
  let noOfItems = document.getElementById('noOfItemsLeft')
  noOfItems.textContent = lastIndex;
}

// complete a task 
listContainer.addEventListener('click', (e) => {
  const target = e.target;
  // console.log(target)
  const targetClass = e.target.classList;
  if(targetClass.contains('todo-checkbox')) {
    targetClass.remove('todo-checkbox', 'before:empty-content', 'before:bg-check-before', 'before:h-6', 'before:w-6', 'before:rounded-lg', 'flex', 'justify-center', 'items-center', 'mr-1.5', 'bg-transparent', 'border-2', 'border-gray-300', 'border-gray-400', 'hover:bg-gradient-to-r', 'hover:from-blue-gradient-start', 'hover:to-blue-gradient-end');
    targetClass.add('todo-completed', 'before:empty-content', 'before:h-6', 'before:w-7', 'bg-gradient-to-r', 'from-blue-gradient-start', 'to-blue-gradient-end', 'flex', 'justify-center', 'items-center');
    // target.setAttribute('tw-content-h-before', '\f00c');
    // target.setAttribute('tw-content-before', '\f00c');
    target.parentNode.classList.add("complete", "line-through", "text-listColor");
    todoCount();
    updateCompletedTodos();
  }else if(targetClass.contains('todo-completed')){
    targetClass.remove('todo-completed', 'bg-gradient-to-r', 'from-blue-gradient-start', 'to-blue-gradient-end', 'flex', 'justify-center', 'items-center');
    targetClass.add('todo-checkbox', 'before:text-white', 'before:h-6', 'before:w-6', 'before:rounded-lg', 'flex', 'justify-center', 'items-center', 'mr-1.5','bg-transparent', 'border-2', 'border-gray-400', 'hover:bg-gradient-to-r', 'hover:from-blue-gradient-start', 'hover:to-blue-gradient-end');
    // hide d check mark 
    // target.children[0].classList.add('hidden');
    target.parentNode.classList.remove("complete", "line-through", "text-listColor");
    todoCount();
    updateCompletedTodos();
  }
})

function updateCompletedTodos(){
  let list = getIndex();
  localStorage.removeItem('CompletedTodos');
  localStorage.setItem('CompletedTodos', JSON.stringify(list));
}

//get index of completed todos
function getIndex(){
  let index = [];
  for(let i = 0; i < [...listContainer.children].length; i++){
    [...listContainer.children][i].children[0].classList.contains('todo-completed')
    ? index.push(i) : null
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
  let completedTodos = document.getElementsByClassName('complete');
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
    // console.log(list[i]);
  }
  
  let active = document.getElementsByClassName('todo-checkbox');
  // remove d hidden property of d list items 
  for(let i in [...active]) active[i].parentNode.classList.remove('hidden');
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
  let completed = document.getElementsByClassName('todo-completed');
  for(let i in [...completed]) completed[i].parentNode.classList.add('hidden');
  // console.log(completed[i]);

  let active = document.getElementsByClassName('todo-checkbox');
  // remove d hidden property of d list items 
  for(let i in [...active]) active[i].parentNode.classList.remove('hidden');

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
  let active = document.getElementsByClassName('todo-checkbox');
  for(let i in [...active]) active[i].parentNode.classList.add('hidden');
  // console.log(active[i])

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

