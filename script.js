document.addEventListener('DOMContentLoaded', () => {

     // Select DOM elements
     const addButton = document.getElementById('add-task-btn');
     const taskInput = document.getElementById('task-input');
     const taskList = document.getElementById('task-list');

      // Function to add a new task
    function addTask(){
        // Get and trim the task input value
        const taskText = taskInput.value.trim();

        // Check if the input is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

         // Create a new list item (li) for the task
         const taskItem = document.createElement('li');
         taskItem.textContent = taskText;

         // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add functionality to remove the task when the button is clicked
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
        };

         // Append the remove button to the task item
         taskItem.appendChild(removeButton);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Clear the task input field
        taskInput.value = "";

    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for pressing "Enter" in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter'){
            addTask();
        }
    })
});
