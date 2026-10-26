const newTaskInput = document.getElementById('new-task');
const addButton = document.querySelector('.todo__add');
const incompleteTasksList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');

const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  listItem.className = 'todo__item';

  checkbox.type = 'checkbox';
  checkbox.className = 'todo__item-toggle';

  label.className = 'todo__item-title';
  label.innerText = taskText;

  editInput.type = 'text';
  editInput.className = 'todo__item-input';

  editButton.type = 'button';
  editButton.className = 'todo__item-edit';
  editButton.innerText = 'Edit';

  deleteButton.type = 'button';
  deleteButton.className = 'todo__item-delete';
  deleteIcon.className = 'todo__delete-icon';
  deleteIcon.src = './remove.svg';
  deleteIcon.alt = 'Delete';
  deleteButton.appendChild(deleteIcon);

  listItem.append(checkbox, label, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, completedTask);

  newTaskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.todo__item-edit');
  const isEditing = listItem.classList.contains('todo__item-editing');

  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }
  listItem.classList.toggle('todo__item-editing');
};

const deleteTask = function () {
  this.parentNode.remove();
};

const moveTask = function (listItem, targetList, onCheckboxChange) {
  targetList.appendChild(listItem);
  bindTaskEvents(listItem, onCheckboxChange);
};

const completedTask = function () {
  moveTask(this.parentNode, completedTasksList, incompleteTask);
};

const incompleteTask = function () {
  moveTask(this.parentNode, incompleteTasksList, completedTask);
};

addButton.addEventListener('click', addTask);
const bindTaskEvents = function (taskListItem, onCheckboxChange) {
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('.todo__item-edit');
  const deleteButton = taskListItem.querySelector('.todo__item-delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = onCheckboxChange;
};

const bindTaskList = function (taskList, onCheckboxChange) {
  for (const listItem of taskList.children) {
    bindTaskEvents(listItem, onCheckboxChange);
  }
};

bindTaskList(incompleteTasksList, completedTask);
bindTaskList(completedTasksList, incompleteTask);
