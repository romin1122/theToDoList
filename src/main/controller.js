import {Project} from "./project";

let Controller = (function() {
	let allProjects = [];

	let showProjects = () => allProjects;

	let addProjectInner = () => {};

	let addProject = (...args) => {
		return addProjectInner(...args);
	};

	let setNecessities = (DataController) => {
		addProjectInner = (name, setData) => {
			for (let project of allProjects)
			{
				if (project.showName() == name) return false;
			}


			let newProject = Project(name, DataController);
			allProjects.push(newProject);
			DataController.setData();
			return newProject;
		}
	}

	let editProjectName = (prevName, givenName) => {
		for (let project of allProjects)
		{
			if (project.showName() == givenName) 
				return false;
		}

		for (let project of allProjects)
		{
			if (project.showName() == prevName)
			{
				project.editName(givenName);
			}
		}

		return true;
	}

	let removeProject = (name) => {
		if (allProjects.length == 1) return false;
		for (let i = 0; i < allProjects.length; i++)
		{
			if (allProjects[i].showName() == name)
			{
				allProjects.splice(i, 1);
				return true;
			}
		}
	}

	return {
		setNecessities,

		showProjects,
		addProject, 
		editProjectName,
		removeProject
	};
})()

export {Controller};