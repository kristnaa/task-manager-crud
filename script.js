// Array to hold all task objects
let tasks = [];


/**
 * Handle form submission to add task
 */
document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.getElementById('taskInput');
    const taskName = input.value.trim();

    if (taskName) {
        addTask(taskName);
        input.value = '';
    }
});

/**
 * Add a new task to the list
 */
function addTask(name) {
    tasks.push({ name, editing: false });
    renderTasks();
}

/**
 * Render the task list to the UI
 */
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        if (task.editing) {
            // If task is in edit mode
            const input = document.createElement('input');
            input.type = 'text';
            input.value = task.name;
            input.id = 'edit-' + idx;

            li.appendChild(input);

            const actions = document.createElement('div');
            actions.className = 'task-actions';

            // Save button
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.className = 'save';
            saveBtn.onclick = () => saveTask(idx, input.value);

            // Cancel button
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.onclick = () => cancelEdit(idx);

            actions.appendChild(saveBtn);
            actions.appendChild(cancelBtn);
            li.appendChild(actions);
        } else {
            // If task is in normal view mode
            const taskName = document.createElement('span');
            taskName.textContent = task.name;
            li.appendChild(taskName);

            const actions = document.createElement('div');
            actions.className = 'task-actions';

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => editTask(idx);

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete';
            deleteBtn.onclick = () => deleteTask(idx);

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            li.appendChild(actions);
        }

        taskList.appendChild(li);
    });
}


/**
 * Enable editing for a specific task
 */
function editTask(idx) {
    tasks[idx].editing = true;
    renderTasks();
}

/**
 * Delete a task by index
 */
function deleteTask(idx) {
    tasks.splice(idx, 1);
    renderTasks();
}

/**
 * Save changes to a task
 */
function saveTask(idx, newName) {
    if (newName.trim()) {
        tasks[idx].name = newName.trim();
        tasks[idx].editing = false;
        renderTasks();
    }
}

/**
 * Cancel editing mode
 */
function cancelEdit(idx) {
    tasks[idx].editing = false;
    renderTasks();
}

// Initial render
renderTasks();
