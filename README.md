# The ToDo List

This is one of my best looking project I have done so far. I learned a lot along the way and went through a lot. But I successfully completed it.

The project contains the following functionalities:
	- Multiple project to contian your todos
	- Priorities to set the importance of each todos
	- Each todo has a title, description, note, due date and priority
	- Each project also has a checklist with only its content
	- All of the content of this Todo List is editable
	- All of the user data is saved in local storage so it remains after being refreshed too

I tried my best to follow the Single Responsibility principle and also tried making the core objects loosely held. But I now realize that I need a Controller type of thing in order to make the objects actually loosely held and communicate with each other. And I tried to make the new DOM elements dynamically appending. Used webpack to organize my code by using ES6 modules. The whole project was done with vanilla JavaScript and all html content were rendered by JavaScript as well.