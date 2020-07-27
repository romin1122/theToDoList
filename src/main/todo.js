function Todo() 
{
	let todos = [];
	let id = 0;

	let showTodos = () => todos;

	let getTodo = (givenId) => {
		for (let todo of todos)
		{
			if (todo.id == givenId)
			{
				return todo;
			}
		}
	}

	let addTodo = (title, description, dueDate, priority, notes) => {
		todos.push({
			id,
			title,
			description,
			dueDate,
			priority,
			notes
		});

		id++;
	}

	let editTodo = (itemId, title, description, dueDate, priority, notes) => {
		for (let i = 0; i < todos.length; i++)
		{
			let todo = todos[i];
			if (todo.id == itemId)
			{
				todos.splice(i, 1, {

					id: itemId,

					title,
					description,
					dueDate,
					priority,
					notes
				})
			}
		}
	}

	let removeTodo = (itemId) => {
		for (let i = 0; i < todos.length; i++)
		{
			let todo = todos[i];
			
			if (todo.id == itemId)
			{
				todos.splice(i, 1);
			}
		}
	}

	return {
		showTodos,
		addTodo,
		editTodo,
		removeTodo,
		getTodo
	}
}

export {Todo};