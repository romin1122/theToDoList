function Checklist()
{
	let list = [];
	let id = 0;

	let showItems = () => {
		return list;
	}

	let addItem = (value) => {
		list.push({
			id: id,
			value: value
		});
		id++;
	}

	let editItem = (itemId, value) => {
		for (let item of list)
		{
			if (item.id == itemId)
			{
				item.value = value;
			}
		}
	}

	let removeItem = (itemId) => {
		for (let i = 0; i < list.length; i++)
		{
			let item = list[i];
			if (item.id == itemId)
			{
				list.splice(i, 1);
			}
		}
	}

	return {
		showItems,
		addItem,
		editItem, 
		removeItem
	};
}


export {Checklist};