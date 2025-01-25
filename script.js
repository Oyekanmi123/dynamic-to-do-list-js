// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Load existing tasks from Local Storage
    loadTasksFromLocalStorage();

    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Add task on button click
    addButton.addEventListener("click", () => {
        addTask(taskInput.value.trim());
    });

    // Add task on Enter key press
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(taskInput.value.trim());
        }
    });
});

// Load tasks from Local Storage
function loadTasksFromLocalStorage() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false)); // Load tasks without saving again
}

// Add task function
function addTask(taskText, save = true) {
    if (taskText === "") {
        alert("Please enter a task."); // Alert if the task is empty
        return; // Exit the function if no task is provided
    }

    // Create new list item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add = "remove-btn";

    // Remove task on button click
    removeButton.onclick = () => {
        taskList.removeChild(li); // Remove from DOM
        removeTaskFromLocalStorage(taskText); // Remove from Local Storage
    };

    li.appendChild(removeButton); // Append the button to the list item
    taskList.appendChild(li); // Append the list item to the task list

    // Save to Local Storage if applicable
    if (save) {
        saveTaskToLocalStorage(taskText);
    }

    // Clear the input field
    document.getElementById("task-input").value = "";
}

// Save task to Local Storage
function saveTaskToLocalStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

// Remove task from Local Storage
function removeTaskFromLocalStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks = storedTasks.filter(task => task !== taskText); // Filter out the removed task
    localStorage.setItem("tasks", JSON.stringify(storedTasks)); // Update Local Storage
}