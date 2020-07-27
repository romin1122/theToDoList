import {Controller} from "./main/controller";
import {DataController} from "./main/dataController";
import {Priority} from "./main/priority";

import {nav} from "./dom/nav";
import {viewTodos} from "./dom/todos.js";
import {viewChecklistSection} from "./dom/checklists.js";
import {loadProjectContents} from "./dom/projectContents";
import {loadTop} from "./dom/top";

import {element, append} from "./dom/helper";

DataController.setNecessities(Controller, Priority);
Controller.setNecessities(DataController);
Priority.setNecessities(DataController);

let projectContents = element("div");
projectContents.id = "projectContents";


if (localStorage.getItem("todoListData") != null)
{
	DataController.loadData();
	loadTop(document.querySelector("#content"), nav, Controller, Priority, projectContents);
	loadProjectContents(projectContents, Controller.showProjects()[0], Controller, Priority);
}
else 
{
	let inbox = Controller.addProject("Inbox");
	inbox.addTodo("Add a new Todo", "Click on Add Todo to create a new todo and provide the necessary informations.", "", "None", "Some important note to remember.");
	inbox.addChecklistItem("Buy Notebooks");
	Priority.addPriority("None", "#000000");


	loadTop(document.querySelector("#content"), nav, Controller, Priority, projectContents);
	loadProjectContents(projectContents, Controller.showProjects()[0], Controller, Priority); 
}

/*
let inbox = Controller.addProject("Inbox");
inbox.addTodo("t", "d", "dD", "Priority 2", "note");
inbox.addTodo("task2", "", "", "", "");
inbox.addChecklistItem("buy groceries");
inbox.addChecklistItem("do the shores");
inbox.addChecklistItem("do collaboration");

Controller.addProject("Project 2");
Controller.addProject("project 3");

Priority.addPriority("Priority 1", "#0F0");
Priority.addPriority("Priority 2", "#FFF");
*/




append(document.querySelector("#content"), projectContents);


/*


SET DEFAULT ACTIONS ON STARTUP

DO THE STYLING
YAY UNLESS WE ENCOUNTER A GREAT ERROR!


*/