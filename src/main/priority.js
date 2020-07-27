let priorityConstructor = (name, color) => {
	let showName = () => name;
	let showColor = () => color;

	let editName = (newName) => name = newName;
	let editColor = (newColor) => color = newColor;

	return {
		showName, 
		showColor,
		editName,
		editColor
	};
}

let Priority = (function() {
	let priorities = [];

	let showPriorities = () => priorities;

	let setChanges = () => {};

	let showColor = (givenName) => {
		for (let priority of priorities)
		{
			if (priority.showName() == givenName)
			{
				return priority.showColor();
			}
		}
	}

	let addPriority = (name, color) => {
		for (let priority of priorities)
		{
			if (priority.showName() == name)
				return false;
		}

		let newPriority = priorityConstructor(name, color);
		priorities.push(newPriority);

		setChanges();

		return newPriority;
	} 

	let editName = (prevName, newName) => {
		for (let priority of priorities)
		{
			if (priority.showName() == newName) 
				return false;
		}

		for (let priority of priorities)
		{
			if (priority.showName() == prevName)
			{
				priority.editName(newName);
			}
		}

		setChanges();
	}


	let editColor = (givenName, color) => {
		for (let priority of priorities)
		{
			if (priority.showName() == givenName)
			{
				priority.editColor(color);
			}
		}

		setChanges();
	}

	let removePriority = (name) => {
		if (priorities.length == 1) return false;

		for (let i = 0; i < priorities.length; i++)
		{
			if (priorities[i].showName() == name)
			{
				priorities.splice(i, 1);
			}
		}

		setChanges();
	}

	let setNecessities = (DataController) => {
		setChanges = () => { DataController.setData(); };
	}

	return {
		showPriorities,
		addPriority,
		editName,
		editColor,
		showColor,
		removePriority,


		setNecessities
	}
})()


export {Priority};