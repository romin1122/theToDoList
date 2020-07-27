let DataController = (function(){
	let Priority, Controller;

	let setNecessities = (givenController, givenPriority) => {
		Priority = givenPriority;
		Controller = givenController;
	}

	let loadData = () => {
		let allData = JSON.parse(localStorage.getItem("todoListData"));

		let allProjectContainer = allData[0];
		let priorities = allData[1];

		for (let priority of priorities)
		{
			Priority.addPriority(priority[0], priority[1]);
		}

		for (let projectValues of allProjectContainer)
		{
			Controller.addProject(projectValues[0]);
			for (let project of Controller.showProjects())
			{
				if (project.showName() == projectValues[0])
				{
					for (let todo of projectValues[1])
					{
						project.addTodo(todo[0], todo[1], todo[2], todo[3], todo[4]);
					}

					for (let item of projectValues[2])
					{
						project.addChecklistItem(item);
					}


					break;
				}
			}
		}
	}

	let setData = () => {
		//localStorage.setItem("allProjects", JSON.stringify(allProjects));
		let allProjectContainer = [];
		for (let project of Controller.showProjects())
		{
			let projectValues = [project.showName()];
			let todos = [];
			for (let todo of project.showTodos())
			{
				todos.push([ 
					todo.title, 
					todo.description,
					todo.dueDate,
					todo.priority,
					todo.notes
				]);
			}


			let list = [];
			for (let item of project.showChecklistItems())
			{
				list.push(item.value);
			}

			projectValues.push(todos, list);

			allProjectContainer.push(projectValues);
		}

		let priorities = [];
		for (let priority of Priority.showPriorities())
		{
			priorities.push([priority.showName(), priority.showColor()]);
		}

		let allData = JSON.stringify([allProjectContainer, priorities]);
		localStorage.setItem("todoListData", allData);
	}

	return {
		setNecessities,
		loadData,
		setData
		};
})()

export {DataController};