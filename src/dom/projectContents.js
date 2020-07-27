import {append, element} from './helper';
import {viewTodos} from "./todos";
import {viewChecklistSection} from "./checklists";
import {loadTop} from "./top";


function loadProjectContents(container, givenProject, Controller, Priority)
{
	container.innerHTML = "";

	function projectOnEdit(container)
	{
		container.innerHTML = "";

		let editArea = element("input");
		editArea.value = givenProject.showName();
		editArea.id = "projectEditArea";
		editArea.placeholder = "Project Name";

		let projectNameSaver = element("button");
		projectNameSaver.innerText = "Save";
		projectNameSaver.id = "projectNameSaver";

		let projectEditCancel = element("button");
		projectEditCancel.innerText = "Cancel";
		projectEditCancel.id = "projectEditCancel";

		projectNameSaver.onclick = () => {
			if (editArea.value != "")
			{
				let result = Controller.editProjectName(givenProject.showName(), editArea.value);
				if (result == false) alert("Please try a different name.");
			}
			else 
			{
				alert("Please write something.");
			}

			projectEditSection(container);
		}

		projectEditCancel.onclick = () => projectEditSection(container);

		append(container, editArea, projectNameSaver, projectEditCancel);
	}


	function projectEditSection(container) 
	{
		let projectTitle = element("span");
		projectTitle.id = "contentProjectTitle";
		projectTitle.innerText = givenProject.showName();

		let projectEdit = element("img");
		projectEdit.src = "images/edit.svg";
		projectEdit.alt = "Edit";
		projectEdit.id = "projectEditImg";

		container.innerHTML = "";
		append(container, projectTitle, projectEdit);

		projectEdit.onclick = () =>  projectOnEdit(container);
	}

	let projectInfo = element("div");
	projectInfo.id = "projectInfo";

	let projectRenameSection = element("div");
	projectRenameSection.id = "projectRenameSection";

	projectEditSection(projectRenameSection);

	let projectDelete = element("img");
	projectDelete.src = "images/delete.svg";
	projectDelete.alt = "Delete";
	projectDelete.id = "projectDeleteImg";

	append(projectInfo, projectRenameSection, projectDelete);

	projectDelete.onclick = () => {
		let result = Controller.removeProject(givenProject.showName());
		if (result == false) alert("You need to have more than one project to delete.");
		else loadProjectContents(container, Controller.showProjects()[0], Controller, Priority);
	}

	append(projectInfo, projectRenameSection, projectDelete);

	let todoSection = element("div");
	todoSection.id = "todoSection";

	viewTodos(todoSection, givenProject, Priority);

	let checklist = viewChecklistSection(givenProject);

	append(container, projectInfo, todoSection, checklist);
}

export {loadProjectContents};