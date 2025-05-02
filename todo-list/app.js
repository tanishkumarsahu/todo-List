const input = document.querySelector("#input");
const addBtn = document.querySelector(".addButton");
const list = document.querySelector("#list");
const emptyMessage = document.querySelector("#empty-message");

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
  updateEmptyMessage();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = Array.from(list.children).map(li => ({
    text: li.querySelector("span").textContent,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateEmptyMessage();
}

// Add task to DOM
function addTaskToDOM(text, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete">Delete</button>
  `;
  list.appendChild(li);
}

// Update empty message visibility
function updateEmptyMessage() {
  emptyMessage.style.display = list.children.length === 0 ? "block" : "none";
}

// Add task
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) {
    alert("Please enter a task!");
    return;
  }
  addTaskToDOM(text);
  input.value = "";
  saveTasks();
});

// Handle Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Handle task deletion and completion
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.target.classList.contains("delete")) {
    li.remove();
    saveTasks();
  } else {
    li.classList.toggle("completed");
    saveTasks();
  }
});

// Initialize
loadTasks();