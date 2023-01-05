// adds a todo item to the view.
const addTodo = () => {

	// get the new todo iteam and add it to the list.
	const newTodo = document.getElementById('new-todo-title'); 
	const datePicker = document.getElementById('date-picker');
	createTodo(newTodo.value, datePicker.value);
	datePicker.value = "";

	// update the visible todo list.
	render();

	// clear the input value.
	newTodo.value = "";
};

// deletes a todo from the view.
const deleteTodo = (event) => {
	const deleteBtn = event.target;
	const btnId = deleteBtn.id;

	removeTodo(btnId);
	render();
};

// marks a todo as done. 
const markDone = (event) => {
	let checkbox = event.target
	setIsDone(checkbox.dataset.todoId, checkbox.checked);
}

// sets the edititng satus to true.
const setEdit = event => {
	let btn = event.target;
	let todoId = btn.dataset.todoId;
	setEditState(todoId);
	render();
}

// update the todo item.
const updateTodo = event => {
	let btn = event.target;
	let btnId = btn.dataset.updateId;
	let todoId = btn.dataset.todoId;

	let text = document.getElementById(btnId + '-text');
	let dt = document.getElementById(btnId + '-date');

	updateTodoValues(text.value, dt.value, todoId);
	render();
};

// clear all todo items.
const clearTodos = () => {
	todos = [];
	render();
}