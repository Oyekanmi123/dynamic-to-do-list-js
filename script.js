document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    function addTask(taskText, saveToLocal = true) {
      if (!taskText) {
        alert("Please enter a task.");
        return;
      }
  
      // Create a new task element
      const li = document.createElement("li");
      li.textContent = taskText;
  
      // Create a remove button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");
      removeButton.onclick = function () {
        taskList.removeChild(li); // Remove task from DOM
        removeTaskFromLocalStorage(taskText); // Remove from Local Storage
      };
  
      // Append button to task
      li.appendChild(removeButton);
      taskList.appendChild(li);
  
      // Save to Local Storage if required
      if (saveToLocal) {
        saveTaskToLocalStorage(taskText);
      }
  
      // Clear input field
      taskInput.value = "";
    }
  
    // Add task on button click
    addButton.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      addTask(taskText);
    });
  
    // Add task on pressing Enter
    taskInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        const taskText = taskInput.value.trim();
        addTask(taskText);
      }
    });
  
    // New code for Local Storage functionality
    function loadTasksFromLocalStorage() {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.forEach((taskText) => addTask(taskText, false)); // Load tasks without saving duplicates
    }
  
    function saveTaskToLocalStorage(taskText) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  
    function removeTaskFromLocalStorage(taskText) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = storedTasks.filter((task) => task !== taskText);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  
    // Load tasks when the page loads
    loadTasksFromLocalStorage();
  });