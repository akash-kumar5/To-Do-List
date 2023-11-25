document.addEventListener('DOMContentLoaded', function () {
    // Load tasks from local storage
    loadTasks();
});

function addTask() {
    // Get the task input value
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    // Check if the input is not empty
    if (taskText !== '') {
        // Create a new task object
        const task = {
            id: new Date().getTime(),
            text: taskText,
            completed: false
        };

        // Add the task to the task list
        addTaskToList(task);

        // Save tasks to local storage
        saveTasks();

        // Clear the input field
        taskInput.value = '';
    }
}

function addTaskToList(task) {
    // Get the task list ul element
    const taskList = document.getElementById('taskList');

    // Create a new li element for the task
    const taskElement = document.createElement('li');
    taskElement.classList.add('list-group-item');

    // Add the task text to the li element
    taskElement.innerHTML = `
        <div class="checkbox-container">
            <input type="checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${task.id})">
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        </div>
        <button class="btn btn-danger delete" onclick="deleteTask(${task.id})"><i class="fas fa-trash"></i></button>
    `;

    // Append the li element to the task list
    taskList.appendChild(taskElement);
}


function toggleTaskCompletion(taskId) {
    // Find the task in the tasks array
    const taskList = document.getElementById('taskList');
    const taskElement = Array.from(taskList.children).find(child => child.querySelector('input').onclick === toggleTaskCompletion);

    // Toggle the completed status of the task
    const completed = !taskElement.querySelector('input').checked;
    taskElement.querySelector('span').classList.toggle('completed', completed);

    // Save tasks to local storage
    saveTasks();
}

function deleteTask(taskId) {
    // Find and remove the task from the task list
    const taskList = document.getElementById('taskList');
    const taskElement = Array.from(taskList.children).find(child => child.querySelector('input').dataset.taskId == taskId);

    if (taskElement) {
        taskList.removeChild(taskElement);

        // Save tasks to local storage
        saveTasks();
    }
}


function saveTasks() {
    // Get all tasks from the task list
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children).map(taskElement => {
        return {
            id: new Date().getTime(),
            text: taskElement.querySelector('span').innerText,
            completed: taskElement.querySelector('input').checked
        };
    });

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    // Get tasks from local storage
    const storedTasks = localStorage.getItem('tasks');

    // Check if there are tasks in local storage
    if (storedTasks) {
        // Parse the stored tasks and add them to the task list
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => addTaskToList(task));
    }
}
