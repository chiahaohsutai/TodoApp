// Helpers to create buttons and update states.

// creates a delete btn.
const createDelBtn = btnId => {
	const deleteBtn = document.createElement('div');
	deleteBtn.className = 'del-btn';

	let delImg = document.createElement('img');
	delImg.className = 'del-img';
	delImg.src = 'images/remove.png';
	delImg.onclick = deleteTodo;
	delImg.id = btnId;
	deleteBtn.appendChild(delImg);

	return deleteBtn;
}

// creates a edit btn.
const createEditBtn = btnId => {
	const editBtn = document.createElement('div');
	editBtn.className = 'edit-btn';

	const editImg = document.createElement('img');
	editImg.dataset.todoId = btnId;
	editImg.onclick = setEdit;
	editImg.src = 'images/edit.png';
	editImg.className = 'edit-img';
	editBtn.appendChild(editImg);

	return editBtn;
}

// creates a checkbox.
const createCheckBox = (checkId, isDone) => {
	const checkBox = document.createElement('input');
	checkBox.type = 'checkbox';
	checkBox.dataset.todoId = checkId;
	checkBox.style = 'margin-right: 8px;';
	checkBox.onchange = markDone;
	checkBox.checked = isDone;

	return checkBox;
}

// creates the upddate btn.
const createUpdateBtn = (todoId, inputBoxId) => {

	// create a box for the button.
	let updateBtn = document.createElement('div');
	let updateImg = document.createElement('img');

	// add styles and place an image for the btn.
	updateBtn.className = 'update-btn';
	updateImg.className = 'update-img';
	updateImg.onclick = updateTodo;
	updateImg.src = 'images/updated.png';
	updateImg.dataset.todoId = todoId;
	updateImg.dataset.updateId = inputBoxId;
	updateBtn.appendChild(updateImg);

	return updateBtn;
}

// creates the edit state for the todo.
const renderEdit = (container, todo) => {
	let todoId = todo.id;
	let inputBox = document.createElement('input');
	let datePicker = document.createElement('input');
	
	// set up ids
	let tempId = new Date().getTime();
	inputBox.id = tempId + '-text';
	datePicker.id = tempId + '-date';

	// create the update btn.
	let updateBtn = createUpdateBtn(todoId, tempId);

	// set functionality.
	inputBox.placeholder = todo.title;
	inputBox.className = 'update-input-text';

	datePicker.type = 'date';
	datePicker.value = todo.dueDate
	datePicker.className = 'update-date';

	// add to todo list.
	container.appendChild(inputBox);
	container.appendChild(datePicker);
	container.appendChild(updateBtn);
}

// helpers for rendering.

const renderTodo = (element, todo) => {

	// set the todo title and add a checkbox.
	let textCon = document.createElement('div');
	let textTitle = document.createElement('div');
	let checkBox = createCheckBox(todo.id, todo.isDone);
	textCon.className = 'todo-title';
	textTitle.className = 'todo-text-container';

	// creating the dud date and title.
	let titleInner = document.createElement('div');
	let dateInner = document.createElement('div');
	dateInner.className = 'due-date-con'
	titleInner.innerText = todo.title;
	dateInner.innerText = todo.dueDate;

	textTitle.appendChild(titleInner);
	textTitle.appendChild(dateInner);

	textCon.prepend(checkBox);
	textCon.appendChild(textTitle);
	element.appendChild(textCon);

	// add the edit and delete btns/
	let btnsCon = document.createElement('div');
	let editBtn = createEditBtn(todo.id);
	let deleteBtn = createDelBtn(todo.id);
	btnsCon.className = 'btns-container'
	
	btnsCon.appendChild(editBtn);
	btnsCon.appendChild(deleteBtn);
	element.appendChild(btnsCon);
};

const renderOptions = () => {
	let count = todos.length;
	todos.forEach(todo => {
		if (todo.isDone) {
			count -= 1;
		}
	});

	const optionsCon = document.getElementById('remaining');
	optionsCon.innerText = `You have ${count} remaining tasks`;
};

// renders the todo list.
const render = () => {
	let todosList = document.getElementById('todo-list');
	todosList.innerHTML = "";

	todos.forEach(todo => {

		// create a container for the todo.
		const element = document.createElement('div');
		element.className = 'todo';

		if (todo.isEditing) {
			renderEdit(element, todo);
		} else {
			renderTodo(element, todo);
		};

		// append to the document.
		todosList.appendChild(element);
	});

	renderOptions();
};

render();
