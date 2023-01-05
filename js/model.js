// to do items.
let todos = localStorage.getItem('todos');

// checked for saved data. 
if (todos != null) {
	todos = JSON.parse(todos)
} else {
	todos = [{
		title:'Get groceries', 
		dueDate: '2021-10-04',
		id: 1,
		isDone: false
	}, {
		title:'Wash car', 
		dueDate: '2021-02-03',
		id: 2,
		isDone: false
	}, {
		title:'Make dinner', 
		dueDate: '2021-03-04',
		id: 3,
		isDone: false
	}];
}

// creates a todo.
const createTodo = (title, dueDate) => {
	let todoId = new Date().getTime();
	todos.push({
		title: title, 
		dueDate: dueDate, 
		id: todoId, 
		isDone: false
	});
	saveData()
}

// remove todo.
const removeTodo = (idToDelete) => {
	todos = todos.filter(td => td.id !== parseInt(idToDelete)); 
	saveData();
}

// set the marked done state.
const setIsDone = (todoId, checked) => {
	for (let i=0; i<todos.length; i++) {
		if (todos[i].id === parseInt(todoId)) {
			todos[i].isDone = checked;
			break;
		};
	};
	render();
	saveData();
};

const saveData = () => {
	localStorage.setItem('todos', JSON.stringify(todos));
};


// sets the edit state to true.
const setEditState = todoId => {
	todos.every(todo => {
		if (todo.id === parseInt(todoId)) {
			todo.isEditing = true;
			return false;
		}
		return true;
	});
	saveData()
};

// update the todo to its new values.
const updateTodoValues = (title, dueDate, todoId) => {
	let todo = null;
	todos.every(td => {
		if (td.id === parseInt(todoId)) {
			todo = td;
			return false;
		};
		return true;
	})

	let prevDueDate = todo.dueDate;
	let prevTitle = todo.title;

	if (dueDate.trim() !== "") {
		todo.dueDate = dueDate;
	}
	if (title.trim() !== "") {
		todo.title = title;
	}
	todo.isEditing = false;
	saveData();
}