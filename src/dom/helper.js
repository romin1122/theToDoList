function element(type)
{
	return document.createElement(type);
}

function append(element, ...args)
{
	for (let child of args)
	{
		element.appendChild(child);
	}
}

export {
	element,
	append
};
