import {append, element} from "./helper";
import {differenceInDays, parse, format} from "date-fns"

function viewTodos(todoSection, Project, Priority)
{
	todoSection.innerHTML = "";

	function removeClasses(el)
	{
		for (let each of el.classList)
			el.classList.remove(each);
	}


	let editTodoInfo = (container, todo) => {
		container.innerHTML = "";
		removeClasses(container);
		container.classList.add("todoContainerOnEdit");

		let titleEditArea = element("input");
		titleEditArea.value = todo.title;
		titleEditArea.classList.add("titleEditArea");
		titleEditArea.placeholder = "Title";

		let descriptionEditArea = element("textarea");
		descriptionEditArea.value = todo.description;
		descriptionEditArea.classList.add("descriptionEditArea");
		descriptionEditArea.placeholder = "Description";
		descriptionEditArea.rows = 4;

		let noteEditArea = element("input");
		noteEditArea.value = todo.notes;
		noteEditArea.classList.add("noteEditArea");
		noteEditArea.placeholder = "Notes";


		let dueDateEditArea = element("div");
		dueDateEditArea.classList.add("dueDateEditArea");

		let dueDateEditTitle = element("span");
		dueDateEditTitle.classList.add("dueDateEditTitle");
		dueDateEditTitle.innerText = "Due Date: ";

		let dueDateEditInput = element("input");
		dueDateEditInput.classList.add("dueDateEditInput");
		dueDateEditInput.type = "date";
		dueDateEditInput.value = todo.dueDate;

		append(dueDateEditArea, dueDateEditTitle, dueDateEditInput);


		let priorityEditArea = element("div");
		priorityEditArea.classList.add("priorityEditArea");

		let priorityEditTitle = element("span");
		priorityEditTitle.classList.add("priorityEditTitle");
		priorityEditTitle.innerText = "Priority: ";

		let prioritySelectArea = element("select");
		let i = 0, selectedIndex;
		for (let priority of Priority.showPriorities())
		{
			let priorityOption = element("option");
			priorityOption.innerText = priority.showName();
			priorityOption.value = priority.showName();
			append(prioritySelectArea, priorityOption);
			if (todo.priority == priority.showName()){
				prioritySelectArea.selectedIndex = i;
			}
			i++;

		}


		append(priorityEditArea, priorityEditTitle, prioritySelectArea);



		let todoSaveButton = element("button");
		todoSaveButton.classList.add("todoSaveButton");
		todoSaveButton.innerText = "Save";

		let todoCancelButton = element("button");
		todoCancelButton.classList.add("todoCancelButton");
		todoCancelButton.innerText = "Cancel";

		append(container, titleEditArea, todoSaveButton, descriptionEditArea, 
			todoCancelButton, noteEditArea, dueDateEditArea, priorityEditArea);

		todoSaveButton.onclick = () => {
			if (titleEditArea == "")
			{
				alert("Title cannot be empty!");
			}
			else 
			{
				Project.editTodo(todo.id, titleEditArea.value, descriptionEditArea.value, dueDateEditInput.value, prioritySelectArea.options[prioritySelectArea.selectedIndex].value, noteEditArea.value);
				basicTodoInfo(container, Project.getTodo(todo.id));
			}
		}

		todoCancelButton.onclick = () => {
			basicTodoInfo(container, todo);
		}


		for (let priority of Priority.showPriorities())
		{
			if (todo.priority == priority.showName() && priority.showColor() != "#FFFFFF"){
				container.style.borderColor = priority.showColor(); 
				break;
			}
		}
	}


	let fullTodoInfo = (container, todo) => {
		container.innerHTML = "";

		removeClasses(container);
		container.classList.add("todoContainer");

		let doneSign = element("img");
		doneSign.alt = "done";
		doneSign.classList.add("doneSign");
		doneSign.src = "images/circleDone.svg";

		let fullInfoContainer = element("div");
		fullInfoContainer.classList.add("todoFullInfo");

		let todoTitle = element("span");
		todoTitle.classList.add("todoTitle");
		todoTitle.innerText = todo.title;

		let edit = element("img");
		edit.src = "images/edit2.svg";
		edit.alt = "edit";
		edit.classList.add("editSign");

		let reduce = element("img");
		reduce.src = "images/upArrow.svg";
		reduce.alt = "reduce";
		reduce.classList.add("reduceSign");


		let todoDescription = element("span");
		todoDescription.classList.add("todoDescription");
		todoDescription.innerText = todo.description;

		let todoNote = element("span");
		todoNote.classList.add("todoNote");
		todoNote.innerText = todo.notes;

		let todoPriorityContainer = element("div");
		todoPriorityContainer.classList.add("todoPriorityContainer");

		let todoPriorityColor = element("div");
		todoPriorityColor.classList.add("todoPriorityColor");
		todoPriorityColor.style.backgroundColor = Priority.showColor(todo.priority);

		let todoPriorityText = element("span");
		todoPriorityText.classList.add("todoPriorityText");
		todoPriorityText.innerText = todo.priority;
		
		append(todoPriorityContainer, todoPriorityColor, todoPriorityText);

		let dueDateContent = "", daysLeft;
		if (todo.dueDate != "")
		{
			daysLeft = differenceInDays(parse(todo.dueDate, "yyyy-mm-dd", new Date()), new Date());
			
			if (daysLeft == -182)
				dueDateContent = "Today";
			else if (daysLeft == -181)
				dueDateContent = "Tomorrow";
			else if (daysLeft == -183)
				dueDateContent = "Yesterday";
			else
				dueDateContent = format(parse(todo.dueDate, "yyyy-mm-dd", new Date()), "dd LLL yyyy");
		}
		console.log(daysLeft);

		let dueDateContainer = element("span");
		dueDateContainer.classList.add("dueDateContainer");
		if (dueDateContent != "")
		{
			dueDateContainer.innerText = dueDateContent;
			if (daysLeft < -182)
				dueDateContainer.style.borderColor = "red";
			else if (daysLeft == -182)
				dueDateContainer.style.borderColor = "orange";
			else dueDateContainer.style.borderColor = "lightgreen";
		}

		
		if (todo.description == "" & todo.notes == "")
		{
			append(fullInfoContainer, todoTitle, todoPriorityContainer);
		}
		else if (todo.description == "")
		{
			append(fullInfoContainer, todoTitle, todoNote, todoPriorityContainer);
		}
		else if (todo.notes == "")
		{
			append(fullInfoContainer, todoTitle, todoDescription, todoPriorityContainer);
		}
		else{
			append(fullInfoContainer, todoTitle, todoDescription, todoNote, todoPriorityContainer);
		}

		if (dueDateContent != "")
			append(fullInfoContainer, dueDateContainer);

		

		append(
			container,
			doneSign, 
			fullInfoContainer,
			edit,
			reduce
		);

		reduce.onclick = () => {
			basicTodoInfo(container, todo);
		}

		edit.onclick = () => {
			editTodoInfo(container, todo);
		}

		doneSign.onclick = () => {
			container.remove();
			Project.removeTodo(todo.id);
		}



		for (let priority of Priority.showPriorities())
		{
			if (todo.priority == priority.showName() && priority.showColor() != "#FFFFFF"){
				container.style.borderColor = priority.showColor(); 
				break;
			}
		}
	}

	let basicTodoInfo = (container, todo) => {
		container.innerHTML = "";

		removeClasses(container);
		container.classList.add("todoContainer");

		let doneSign = element("img");
		doneSign.alt = "done";
		doneSign.classList.add("doneSign");
		doneSign.src = "images/circleDone.svg";

		let todoTitle = element("span");
		todoTitle.classList.add("todoTitle");
		todoTitle.innerText = todo.title;

		let edit = element("img");
		edit.src = "images/edit2.svg";
		edit.alt = "edit";
		edit.classList.add("editSign");

		let expand = element("img");
		expand.src = "images/downArrow.svg";
		expand.alt = "expand";
		expand.classList.add("expandSign");


		append(
			container, 
			doneSign,
			todoTitle,
			edit,
			expand
		);

		expand.onclick = () => {
			fullTodoInfo(container, todo);
		}

		edit.onclick = () => {
			editTodoInfo(container, todo);
		}

		doneSign.onclick = () => {
			container.remove();
			Project.removeTodo(todo.id);
		}



		for (let priority of Priority.showPriorities())
		{
			if (todo.priority == priority.showName() && priority.showColor() != "#FFFFFF"){
				container.style.borderColor = priority.showColor(); 
				break;
			}
		}
	}

	function populateAllTodoContainer()
	{
		todoSection.innerHTML = "";

		let allTodos = Project.showTodos();

		let allTodoContainer = element("div");
		allTodoContainer.id = "allTodoContainer";

		for (let todo of allTodos)
		{
			let todoContainer = element("div");
			todoContainer.classList.add("todoContainer");

			basicTodoInfo(todoContainer, todo);

			append(allTodoContainer, todoContainer);
			
		}

		let newTodoSection = element("div");
		newTodoSection.id = "newTodoSection";

		append(todoSection, allTodoContainer, newTodoSection);


		let newTodoButtonFunc = () => {
			newTodoSection.style.display = "none";

			let newTodoButton = element("button");
			newTodoButton.id = "newTodoButton";
			newTodoButton.innerText = "Add Todo";

			append(todoSection, newTodoButton);

			newTodoButton.onclick = () => {
				newTodoButton.remove();

				newTodoSection.innerHTML = "";

				newTodoSection.style.display = "grid";

				let newTodoTitleEditArea = element("input");
				newTodoTitleEditArea.id = "newTodoTitleEditArea";
				newTodoTitleEditArea.placeholder = "Title";

				let newTodoDescriptionEditArea = element("textarea");
				newTodoDescriptionEditArea.id = "newTodoDescriptionEditArea";
				newTodoDescriptionEditArea.placeholder = "Description";
				newTodoDescriptionEditArea.cols = 4;

				let newTodoNoteEditArea = element("input");
				newTodoNoteEditArea.id = "newTodoNoteEditArea";
				newTodoNoteEditArea.placeholder = "Notes";


				let newTodoDueDateEditArea = element("div");
				newTodoDueDateEditArea.id = "dueDateEditArea";

				let newTodoDueDateEditTitle = element("span");
				newTodoDueDateEditTitle.id = "newTodoDueDateEditTitle";
				newTodoDueDateEditTitle.innerText = "Due Date: ";

				let newTodoDueDateEditInput = element("input");
				newTodoDueDateEditInput.id = "newTodoDueDateEditInput";
				newTodoDueDateEditInput.type = "date";

				append(newTodoDueDateEditArea, newTodoDueDateEditTitle, newTodoDueDateEditInput);


				let newTodoPriorityEditArea = element("div");
				newTodoPriorityEditArea.id = "newTodoPriorityEditArea";

				let newTodoPriorityEditTitle = element("span");
				newTodoPriorityEditTitle.id = "newTodoPriorityEditTitle";
				newTodoPriorityEditTitle.innerText = "Priority: ";

				let newTodoPrioritySelectArea = element("select");
				for (let priority of Priority.showPriorities())
				{
					let priorityOption = element("option");
					priorityOption.innerText = priority.showName();
					priorityOption.value = priority.showName();

					append(newTodoPrioritySelectArea, priorityOption);
				}


				append(newTodoPriorityEditArea, newTodoPriorityEditTitle, newTodoPrioritySelectArea);


				let newTodoSaveButton = element("button");
				newTodoSaveButton.id = "newTodoSaveButton";
				newTodoSaveButton.innerText = "Add";

				let newTodoCancelButton = element("button");
				newTodoCancelButton.id = "newTodoCancelButton";
				newTodoCancelButton.innerText = "Cancel";


				append(newTodoSection, newTodoTitleEditArea, newTodoDescriptionEditArea, newTodoNoteEditArea, 
					newTodoDueDateEditArea, newTodoPriorityEditArea, newTodoSaveButton, newTodoCancelButton);

				newTodoSaveButton.onclick = () => {
					if (newTodoTitleEditArea == "")
					{
						alert("Title cannot be empty!");
					}
					else 
					{
						console.log(newTodoTitleEditArea.value == "");
						Project.addTodo(newTodoTitleEditArea.value, newTodoDescriptionEditArea.value, newTodoDueDateEditInput.value, newTodoPrioritySelectArea.options[newTodoPrioritySelectArea.selectedIndex].value, newTodoNoteEditArea.value);
						populateAllTodoContainer();
					}
				}

				newTodoCancelButton.onclick = () => {
					newTodoButtonFunc();
				}
			}

		}

		newTodoButtonFunc();
 	}

	populateAllTodoContainer();
}

export {viewTodos};