import {append, element} from "./helper";

function viewChecklistSection(Project)
{
	let mainChecklistContainer = element("div");
	mainChecklistContainer.id = "mainChecklistContainer";

	let checklistTitle = element("span");
	checklistTitle.id = "checklistTitle";
	checklistTitle.innerText = "Checklist";

	let allChecklists = element("div");
	allChecklists.id = "allChecklists";

	

	//let createItemEditArea = () => {};

	function createItemInputArea(container, item)
	{
		container.innerHTML = "";

		let itemNameInput = element("input");
		itemNameInput.placeholder = "Item Name";
		itemNameInput.value = item.value;
		itemNameInput.classList.add("itemNameEditInput");

		let itemEditSaveBtn = element("button");
		itemEditSaveBtn.classList.add("itemEditSaveBtn");
		itemEditSaveBtn.innerText = "Save";
		itemEditSaveBtn.onclick = () => {
			if (itemNameInput.value == "") alert("field cannot be empty");
			else {
				Project.editChecklistItem(item.id, itemNameInput.value);
				createItemEditArea(container, item);
			}
		}

		let itemEditCancelBtn = element("button");
		itemEditCancelBtn.classList.add("itemEditCancelBtn");
		itemEditCancelBtn.innerText = "Cancel";
		itemEditCancelBtn.onclick = () => {
			createItemEditArea(container, item);
		}

		append(container, itemNameInput, itemEditSaveBtn, itemEditCancelBtn);

	}

	function createItemEditArea(container, item)
	{
		container.innerHTML = "";

		let itemValue = element("span");
		itemValue.classList.add("itemValue");
		itemValue.innerText = item.value;

		let itemEditButton = element("img");
		itemEditButton.classList.add("itemEditButton");
		itemEditButton.alt = "Edit";
		itemEditButton.src = "images/edit2.svg";

		append(container, itemValue, itemEditButton);

		itemEditButton.onclick = () => createItemInputArea(container, item);
	}

	function showNewItemInput(container)
	{
		container.innerHTML = "";

		let newItemInput = element("input");
		newItemInput.id = "newItemInput";
		newItemInput.placeholder = "Item Name";

		let newItemSave = element("button");
		newItemSave.id = "newItemSave";
		newItemSave.innerText = "Add";

		let newItemCancel = element("button");
		newItemCancel.id = "newItemCancel";
		newItemCancel.innerText = "Cancel";

		append(container, newItemInput, newItemSave, newItemCancel);

		newItemSave.onclick = () => {
			if (newItemInput.value == "") alert("Item field cant be empty");
			else {
				Project.addChecklistItem(newItemInput.value);
				showNewItemBtn(container);
				populateAllChecklists();
			}
		}

		newItemCancel.onclick = () => {
			showNewItemBtn(container);
		}
	}

	function showNewItemBtn(container)
	{
		container.innerHTML = "";
		let newItemButton = element("button");
		newItemButton.id = "newItemButton";
		newItemButton.innerText = "Add Item";

		append(container, newItemButton);

		newItemButton.onclick = () => {
			showNewItemInput(container);
		}
	}	


	function populateAllChecklists()
	{
		allChecklists.innerHTML = "";
		let items = Project.showChecklistItems();

		for (let item of items)
		{
			let itemContainer = element("div");
			itemContainer.classList.add("checklistItemContainer");

			let itemCheck = element("img");
			itemCheck.alt = "item check";
			itemCheck.classList.add("itemCheck");
			itemCheck.src = "images/boxTick.svg";

			let itemEditArea = element("div");
			itemEditArea.id = "itemEditArea";

			createItemEditArea(itemEditArea, item);

			append(itemContainer, itemCheck, itemEditArea);

			append(allChecklists, itemContainer);

			itemCheck.onclick = () => {
				Project.removeChecklistItem(item.id);
				itemContainer.remove();
			}
		}
	}

	populateAllChecklists();


	let newItemArea = element("div");
	newItemArea.id = "newItemArea";

	showNewItemBtn(newItemArea);

	append(mainChecklistContainer, checklistTitle, allChecklists, newItemArea);

	return mainChecklistContainer;
}

export {viewChecklistSection};