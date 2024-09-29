// Select the form, input field, and todo list elements from the DOM
const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

// Initialize the todo list by retrieving existing todos from local storage
let allTodos = getTodos();
updateTodoList();

// Add an event listener to the form to handle new todo submissions
todoForm.addEventListener("submit", function (e) {
  // Prevent the default form submission behavior
  e.preventDefault();
  // Call the addTodo function to process the new todo
  addTodo();
});

// Function to add a new todo item
function addTodo() {
  // Get the text from the input field and trim any whitespace
  const todoText = todoInput.value.trim();
  // Check if the input field is not empty
  if (todoText.length > 0) {
    // Create a new todo object with the input text and a completed status of false
    const todoObject = {
      text: todoText,
      completed: false,
    };
    // Add the new todo object to the allTodos array
    allTodos.push(todoObject);
    // Update the todo list display
    updateTodoList();
    // Save the updated todo list to local storage
    saveTodos();
    // Clear the input field
    todoInput.value = "";
  }
}

// Function to update the todo list display
function updateTodoList() {
  // Clear the existing todo list
  todoListUL.innerHTML = "";
  // Loop through each todo item in the allTodos array
  allTodos.forEach((todo, todoIndex) => {
    // Create a new todo item element
    const todoItem = createTodoItem(todo, todoIndex);
    // Add the todo item element to the todo list
    todoListUL.append(todoItem);
  });
}

// Function to create a new todo item element
function createTodoItem(todo, todoIndex) {
  // Create a unique ID for the todo item
  const todoId = "todo-" + todoIndex;
  // Create a new list item element
  const todoLI = document.createElement("li");
  // Get the text from the todo object
  const todoText = todo.text;
  // Set the class name of the list item element to "todo"
  todoLI.className = "todo";
  // Set the inner HTML of the list item element to the todo item template
  todoLI.innerHTML = `
  <input type="checkbox" id="${todoId}" />
          <label for="${todoId}" class="custom-checkbox">
            <svg
              fill="transparent"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label for="${todoId}" class="todo-text"
            >${todoText}</label
          >
          <button
            type="button"
            class="delete-button"
            title="delete-button"
            label=""
          >
            <svg
              fill="var(--secondary-color)"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
  `;

  // Get the delete button element
  const deleteButton = todoLI.querySelector(".delete-button");
  // Add an event listener to the delete button to handle deletion
  deleteButton.addEventListener("click", () => {
    // Call the deleteTodoItem function to delete the todo item
    deleteTodoItem(todoIndex);
  });
  // Get the checkbox element
  const checkbox = todoLI.querySelector("input");
  // Add an event listener to the checkbox to handle completion status changes
  checkbox.addEventListener("change", () => {
    // Update the completed status of the todo item
    allTodos[todoIndex].completed = checkbox.checked;
    // Save the updated todo list to local storage
    saveTodos();
  });
  // Set the checked status of the checkbox to match the completed status of the todo item
  checkbox.checked = todo.completed;
  // Return the todo item element
  return todoLI;
}

// Function to delete a todo item
function deleteTodoItem(todoIndex) {
  // Remove the todo item from the allTodos array
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  // Save the updated todo list to local storage
  saveTodos();
  // Update the todo list display
  updateTodoList();
}

// Function to save the todo list to local storage
function saveTodos() {
  // Convert the allTodos array to a JSON string
  const todosJson = JSON.stringify(allTodos);
  // Save the JSON string to local storage
  localStorage.setItem("todos", todosJson);
}

// Function to retrieve the todo list from local storage
function getTodos() {
  // Get the JSON string from local storage
  const todos = localStorage.getItem("todos") || "[]";
  // Convert the JSON string to an array
  return JSON.parse(todos);
}
