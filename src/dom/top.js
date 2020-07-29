import {element, append} from "./helper";
import {nav} from "./nav";


let loadTop = (container, nav, ...args) => {
	container.innerHTML = "";

	let top = element("div");
	top.id = "top";

	let menuIcon = element("img");
	menuIcon.src = "images/menuIcon.svg";
	menuIcon.id = "menuIcon";

	let logo = element("span");
	logo.id = "logo";
	logo.innerText = "The ToDo List";

	append(top, menuIcon, logo);

	append(container, top);


	menuIcon.onclick = () => {
		if (document.querySelector("#navContainer") == null)
			nav(container, ...args);
		else 
		{
			document.querySelector("#closeButton").click();
			nav(container, ...args);
		}
		setTimeout(() => document.querySelector("#navContainer").classList.toggle("visible"), 10);
	}
}

export {loadTop}