import {element, append} from "./helper";
import {loadProjectContents} from "./projectContents";


function nav(container, Controller, Priority, projectContentContainer) {
	function projectsLister(container)
	{
		container.innerHTML = "";

 		for (let project of Controller.showProjects())
 		{
 			let projectNode = element("span");
 			projectNode.classList.add("project");

 			projectNode.innerText = project.showName();
 			append(container, projectNode);

 			projectNode.onclick = () => {
 				loadProjectContents(projectContentContainer, project, Controller, Priority);
 				closeImage.click();
 			}
 		}

	}

	function prioritiesLister(container)
	{
		container.innerHTML = "";

 		for (let priority of Priority.showPriorities())
 		{
 			let priorityNode = element("div");
 			priorityNode.classList.add("priorityContainer");

 			append(container, priorityNode);

 			let eachPriorityInit = () => {
 				priorityNode.innerHTML = "";

 				let priorityColor = element("div");
 				priorityColor.classList.add("priorityColor");
 				priorityColor.style.backgroundColor = priority.showColor();

 				let priorityText = element("span");
 				priorityText.classList.add("priorityText");
 				priorityText.innerText = priority.showName();

 				let priorityEdit = element("img");
 				priorityEdit.alt = "Edit";
 				priorityEdit.src = "images/edit.svg";
 				priorityEdit.classList.add("priorityEdit");

 				let priorityDelete = element("img");
 				priorityDelete.alt = "Delete";
 				priorityDelete.src = "images/delete.svg";
 				priorityDelete.classList.add("priorityDelete");


 				append(priorityNode, priorityColor, priorityText, priorityEdit, priorityDelete);

 				priorityEdit.onclick = () => {
 					priorityNode.innerHTML = "";

 					priorityNode.classList.add("priorityOnEdit");

 					let priorityEditInput = element("input");
 					priorityEditInput.classList.add("priorityEditInput");
 					priorityEditInput.value = priority.showName();
 					priorityEditInput.placeholder = "Priority Name";

 					let priorityEditColorInput = element("input");
 					priorityEditColorInput.type = "color";
 					priorityEditColorInput.classList.add("priorityEditColorInput");
 					priorityEditColorInput.value = priority.showColor();

 					let priorityEditSaveButton = element("button");
 					priorityEditSaveButton.innerText = "Save";
 					priorityEditSaveButton.classList.add("priorityEditSaveButton");

 					let priorityEditCancelButton = element("button");
 					priorityEditCancelButton.innerText = "Cancel";
 					priorityEditCancelButton.classList.add("priorityEditCancelButton");

 					append(priorityNode, priorityEditInput, element("br"), priorityEditColorInput, element("br"), priorityEditSaveButton, priorityEditCancelButton);

 					priorityEditCancelButton.onclick = () => {
 						priorityNode.classList.remove("priorityOnEdit");
 						eachPriorityInit();
 					}

 					priorityEditSaveButton.onclick = () => {
 						if (priorityEditInput.value == "")
 						{
 							alert("Name cannot be empty!");
 						}
 						else
 						{
 							priorityNode.classList.remove("priorityOnEdit");

 							Priority.editColor(priority.showName(), priorityEditColorInput.value);
 							Priority.editName(priority.showName(), priorityEditInput.value);
 							eachPriorityInit();
 							prioritiesLister(container);
 						}
 						
 					}

 				}

 				priorityDelete.onclick = () => {
 					let result = Priority.removePriority(priority.showName());
 					if (result == false) alert("You need to keep at least one priority.");
 					else prioritiesLister(container);
 				}
 			}


 			eachPriorityInit();
 		}
	}



	let blackBackground = element("div");
	blackBackground.id = "blackBackground";




	let navContainer = element("div");
	navContainer.id = "navContainer";

	let closeImage = element("img");
	closeImage.id = "closeImage";
	closeImage.src = "images/close.svg";
	closeImage.alt = "close";

	//close button function
	closeImage.onclick = () => {
		navContainer.remove();
		blackBackground.remove();
	}



	let projectSection = element("div");
	projectSection.id = "projectSection";
	
	let projectTitle = element("span");
	projectTitle.id = "navProjectTitle";
	projectTitle.innerText = "Projects";

 	let projects = element("div");
 	projects.id = "projects";


 	projectsLister(projects);
 	

	let newProjectInit = (container) => {
		container.innerHTML = "";

		let newProjectButton = element("button");
 		newProjectButton.id = "newProjectButton";
 		newProjectButton.innerText = "New Project"

 		newProjectButton.onclick = () => {
 			container.innerHTML = "";

 			//let newProjectInputContainer = element("div");
 			let projectInput = element("input");
 			projectInput.id = "projectInput";
 			projectInput.placeholder = "Project Name";

 			let projectSaveButton = element("button");
 			projectSaveButton.id = "projectSaveButton";
 			projectSaveButton.innerText = "Add";

 			let projectCancelButton = element("button");
 			projectCancelButton.id = "projectCancelButton";
 			projectCancelButton.innerText = "Cancel";

 			projectCancelButton.onclick = () => {
 				newProjectInit(container);
 			}

 			projectSaveButton.onclick = () => {
 				if (projectInput.value == "")
 				{
 					alert("Plz write something first!");
 				}
 				else 
 				{
 					let result = Controller.addProject(projectInput.value);
 					if (result == false)
 					{
 						alert("Project already exists");
 						projectCancelButton.click();
 					}
 					else
 					{
 						projectCancelButton.click();
 						projectsLister(projects);
 					}
 				}
 			}


 			append(container, projectInput, element("br"), projectSaveButton, projectCancelButton);
 		}

 		append(container, newProjectButton);
	}

	let newProjectArea = element("div");
	newProjectArea.id = "newProjectArea";

	newProjectInit(newProjectArea);

 	append(
 		projectSection, 
 		projectTitle, 
 		projects, 
 		newProjectArea
 	);






 	
 	let priorities = element("div");
 	priorities.id = "priorities";

 	let prioritySection = element("div");
	prioritySection.id = "prioritySection";
	
	let priorityTitle = element("span");
	priorityTitle.id = "navPriorityTitle";
	priorityTitle.innerText = "Priorities";


 	prioritiesLister(priorities);

 	let newPriorityArea = element("div");
 	newPriorityArea.id = "newPriorityArea";

 	let newPriorityInit = (container) => {
 		container.innerHTML = "";

 		let newPriorityButton = element("button");
 		newPriorityButton.id = "newPriorityButton";
 		newPriorityButton.innerText = "New Priority";

 		newPriorityButton.onclick = () => {
 			container.innerHTML = "";


 			let priorityInput = element("input");
 			priorityInput.id = "priorityInput";
 			priorityInput.placeholder = "Priority Name";

 			let priorityColorInput = element("input");
 			priorityColorInput.id = "priorityColorInput";
 			priorityColorInput.type = "color";
 			priorityColorInput.value = "#FFFFFF";

 			let prioritySaveButton = element("button");
 			prioritySaveButton.id = "prioritySaveButton";
 			prioritySaveButton.innerText = "Add";

 			let priorityCancelButton = element("button");
 			priorityCancelButton.id = "priorityCancelButton";
 			priorityCancelButton.innerText = "Cancel";


 			priorityCancelButton.onclick = () => {
 				newPriorityInit(container);
 			}

 			prioritySaveButton.onclick = () => {
 				if (priorityInput.value == "")
 				{
 					alert("Input cant be empty!");
 				}
 				else 
 				{
 					let result = Priority.addPriority(priorityInput.value, priorityColorInput.value);
 					prioritiesLister(priorities);

 					if (result == false) alert("Priority already exists!");
 					else newPriorityButton.click();
 				}
 			}


 			append(container, priorityInput, element("br"), priorityColorInput, element("br"), prioritySaveButton, priorityCancelButton);
 		}

 		append(container, newPriorityButton);
 	} 

 	newPriorityInit(newPriorityArea);
 	
 	

 	append(
 		prioritySection,
 		priorityTitle,
 		priorities,
 		newPriorityArea
 	);

	append(navContainer, closeImage, projectSection, prioritySection);



	blackBackground.onclick = () => {closeImage.click()}

	append(container, navContainer, blackBackground);
}

export {nav}