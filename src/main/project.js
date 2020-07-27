import {Todo} from "./todo";
import {Checklist} from "./checklist";

function Project(name, DataController)
{
	let todoObject = Todo();
	let checklist = Checklist();

	let showName = () => name;

	let editName = (givenName) => {
		name = givenName;
		DataController.setData();
	}

	let showTodos = todoObject.showTodos;
	let addTodo = (...args) => {
		todoObject.addTodo(...args);
		DataController.setData();
	}
	let editTodo = (...args) => {
		todoObject.editTodo(...args);
		DataController.setData();
	}
	let removeTodo = (...args) => {
		todoObject.removeTodo(...args);
		DataController.setData();
	}

	let getTodo = todoObject.getTodo;

	let showChecklistItems = () => checklist.showItems();

	let addChecklistItem = (value) => {
		checklist.addItem(value);
		DataController.setData();
	}

	let editChecklistItem = (givenId, value) => {
		checklist.editItem(givenId, value);
		DataController.setData();
	}

	let removeChecklistItem = (givenId) => {
		checklist.removeItem(givenId);
		DataController.setData();
	}

	return {
		showName,
		editName,

		showChecklistItems,
		addChecklistItem,
		editChecklistItem,
		removeChecklistItem,

		showTodos,
		addTodo,
		editTodo,
		removeTodo,

		getTodo
	}

}

export {Project};