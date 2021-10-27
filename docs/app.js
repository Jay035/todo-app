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

// todo lists Container 
const listContainer = document.querySelector('.todos');
// todo input 
const todoInput = document.getElementById('taskValue');
// add icon 
const addIcon = document.getElementById('addTodo');

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
  img.src.match('./images/icon-sun.svg')
    ? (document.documentElement.classList.add('dark'), img.src='./images/icon-moon.svg', desktopNavBg.src='./images/bg-desktop-light.jpg', nav_bg.src='./images/bg-mobile-light.jpg')
    : (document.documentElement.classList.remove('dark'), img.src='./images/icon-sun.svg', desktopNavBg.src='./images/bg-desktop-dark.jpg', nav_bg.src='./images/bg-mobile-dark.jpg')
    
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
        checkbox.classList.add('todo-checkbox', 'before:empty-content', 'before:bg-check-before', 'before:h-6', 'before:w-7', 'before:rounded-lg', 'w-7', 'flex', 'justify-center', 'items-center', 'cursor-pointer', 'mr-1.5', 'rounded-full', 'h-6', 'bg-checkboxBg', 'hover:bg-gradient-to-r', 'hover:from-blue-gradient-start', 'hover:to-blue-gradient-end');
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
      checkbox.classList.add('todo-checkbox', 'before:empty-content', 'before:bg-check-before', 'before:h-6', 'before:w-7', 'before:rounded-lg', 'w-7', 'flex', 'justify-center', 'items-center', 'cursor-pointer', 'mr-1.5', 'rounded-full', 'h-6', 'bg-checkboxBg', 'hover:bg-gradient-to-r', 'hover:from-blue-gradient-start', 'hover:to-blue-gradient-end');
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
      // console.log(li)
     
      // remove todo event
      delBtn.addEventListener('click', removeTodo, false);

      // get d number of todos left
      todoCount();
  }
  let index = JSON.parse(localStorage.getItem('CompletedTodos') || '[]');
  for(let i = 0; i < index.length; i++){
    [...listContainer.children][index[i]].children[0].classList.add('todo-completed');
    [...listContainer.children][index[i]].classList.add('line-through');
    [...listContainer.children][index[i]].classList.add('text-listColor');
  }
  
}

// remove todo event
function removeTodo(e){
  let lists = listContainer.getElementsByTagName('li'),
  index = [...lists].indexOf(e.target.parentNode.parentNode)
  if(confirm('Are you sure?')) {
    // console.log(e.target.parentNode.parentNode.parentNode)
    e.target.parentNode.parentNode.parentNode.remove();
  }
  // update local storage
  updateLocalStorage();
  // count the number of todos left
  todoCount();
      
}

// todoCount function
function todoCount(){
  let lists = document.getElementsByTagName('li');
  let lastIndex = [...lists].length;
  
  let noOfItems = document.getElementById('noOfItemsLeft')
  noOfItems.textContent = lastIndex;
}

// update completedTodos index
function updateCompletedTodos(){
  let list = [];
  localStorage.removeItem('CompletedTodos');
  localStorage.setItem('CompletedTodos', JSON.stringify(list));
}

listContainer.addEventListener('click', (e) => {
  const target = e.target;
  console.log(target)
  const targetClass = e.target.classList;
  if(targetClass.contains('todo-checkbox')) {
    targetClass.remove('todo-checkbox', 'before:empty-content', 'before:bg-check-before', 'before:h-6', 'before:w-7', 'before:rounded-lg', 'flex', 'justify-center', 'items-center', 'bg-checkboxBg', 'hover:bg-gradient-to-r', 'hover:from-blue-gradient-start', 'hover:to-blue-gradient-end');
    targetClass.add('todo-completed', 'bg-gradient-to-r', 'from-blue-gradient-start', 'to-blue-gradient-end', 'flex', 'justify-center', 'items-center', 'after:empty-content', 'after:my-1.5', 'after:bg-contain', 'after:bg-no-repeat','after:bg-checkbox','after:h-6', 'after:w-7');
    target.parentNode.classList.add("line-through");
    target.parentNode.classList.add("text-listColor");
    updateCompletedTodos();
  }else if(targetClass.contains('todo-completed')){
    targetClass.remove('todo-completed', 'bg-gradient-to-r', 'from-blue-gradient-start', 'to-blue-gradient-end', 'flex', 'justify-center', 'items-center', 'after:empty-content', 'after:my-1.5', 'after:bg-contain', 'after:bg-no-repeat','after:bg-checkbox','after:h-6', 'after:w-7');
    targetClass.add('todo-checkbox', 'before:empty-content', 'before:bg-check-before', 'before:h-6', 'before:w-7', 'before:rounded-lg', 'flex', 'justify-center', 'items-center', 'bg-checkboxBg', 'hover:bg-gradient-to-r', 'hover:from-blue-gradient-start', 'hover:to-blue-gradient-end');
    target.parentNode.classList.remove("line-through");
    target.parentNode.classList.remove("text-listColor");
    
    updateCompletedTodos();
  }
})

//get index of completed todos
function getIndex(){
  let index = [];
  for(let i = 0; i < [...listContainer.children].length; i++){
    [...listContainer.children][i].children[0].classList.contains('todo-completed')
    ? index.push(i) : null
    console.log([...listContainer.children][i])
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
  let list = listContainer.getElementsByTagName('li');
  let length = [...list].length;
  console.log(length)
  let c = 0;
  for (let i = 0; i < length; i++) {
    if(list[0 + c].children[0].classList.contains('todo-completed')){
      console.log(list[0 + c])
      list[0 + c].remove();
    }else{
      c++;
    }
    todoCount();
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
  // set d aria current attribute to 'all' button to give it a bright blue color 
  document.querySelector('.all').classList.add('text-activeLinkColor');
  document.querySelector('.all-mobile').classList.add('text-activeLinkColor')
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
  // set d aria current attribute to 'active' button to give it a bright blue text color 
  document.querySelector('.active').setAttribute('aria-current', 'page')
  document.querySelector('.active-mobile').setAttribute('aria-current', 'page')

}

// display only completed todos 
function filterCompleted(){
  // reset styles 
  filterAll();
  // filter active todos
  let active = document.getElementsByClassName('todo-checkbox');
  for(let i in [...active]) active[i].parentNode.classList.add('hidden');
  // console.log(active[i])

  // set d aria current attribute to 'completed' button to give it a bright blue color 
  document.querySelector('.active').setAttribute('aria-current', 'page')
  document.querySelector('.active-mobile').setAttribute('aria-current', 'page')

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

