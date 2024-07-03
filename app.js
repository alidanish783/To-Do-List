const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
});

// Add new task
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        saveTasks();
        todoInput.value = '';
    }
});

// Function to add task to the list
function addTask(taskText, completed = false) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <input type="checkbox">
        <button class="delete-btn">Delete</button>
    `;
    if (completed) {
        li.classList.add('completed');
        li.querySelector('input').checked = true;
    }
    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
    li.addEventListener('change', () => {
        li.classList.toggle('completed');
        saveTasks();
    });
    todoList.appendChild(li);
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.querySelector('span').innerText,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
