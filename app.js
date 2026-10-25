const newTaskInput = document.getElementById('new-task');
const addButton = document.querySelector('.task-row-wrapper button');
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  checkbox.type = 'checkbox';
  label.className = 'task';
  label.innerText = taskText;

  editInput.type = 'text';
  editInput.className = 'task';

  editButton.className = 'edit';
  editButton.innerText = 'Edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTaskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditing = listItem.classList.contains('editMode');

  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }
  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const moveTask = function (listItem, targetList, onCheckboxChange) {
  targetList.appendChild(listItem);
  bindTaskEvents(listItem, onCheckboxChange);
};

const taskCompleted = function () {
  moveTask(this.parentNode, completedTasksList, taskIncomplete);
};

const taskIncomplete = function () {
  moveTask(this.parentNode, incompleteTasksList, taskCompleted);
};

addButton.addEventListener('click', addTask);
const bindTaskEvents = function (taskListItem, onCheckboxChange) {
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = onCheckboxChange;
};

const bindTaskList = function (taskList, onCheckboxChange) {
  for (const listItem of taskList.children) {
    bindTaskEvents(listItem, onCheckboxChange);
  }
};

bindTaskList(incompleteTasksList, taskCompleted);
bindTaskList(completedTasksList, taskIncomplete);
