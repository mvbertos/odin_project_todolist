import "../css/style.css";
import { Todo } from "./todo";

class UI {
  constructor() {
    this.content = document.getElementById("content");

    //create header
    this.header = document.createElement("header");
    const headerLabel = document.createElement("h1");
    headerLabel.textContent = "Todo List";
    this.header.appendChild(headerLabel);

    this.todolist = document.createElement("div");
    this.todolist.id = "todoList";

    this.footer = document.createElement("footer");
    this.footer.textContent = "made by logout";

    this.content.append(this.header, this.todolist, this.footer);
  }

  _createTaskEditForm(task, onSubmit = (newTask) => {}) {
    //create a popup
    const popupEl = document.createElement("div");
    popupEl.id = "popup";
    popupEl.addEventListener("click", (_) => {
      popupEl.remove();
    });

    //here start the formulary
    const form = document.createElement("form");
    form.id = "todoEditForm";

    const titleTextEl = document.createElement("label");
    titleTextEl.textContent = "Title";
    const titleInputEl = document.createElement("input");
    titleInputEl.name = "title";
    titleInputEl.value = task.title;

    const descriptionTextEl = document.createElement("label");
    descriptionTextEl.textContent = "Description";
    const descriptionInputEl = document.createElement("input");
    descriptionInputEl.name = "desc";
    if (task.description != "") {
      descriptionInputEl.value = task.description;
    } else {
      descriptionInputEl.placeholder = "Empty";
    }

    const saveButtonEl = document.createElement("button");
    saveButtonEl.type = "submit";
    saveButtonEl.textContent = "Save";

    const cancelButtonEl = document.createElement("button");
    cancelButtonEl.addEventListener("click", (e) => {
      e.stopPropagation();
      popupEl.remove();
    });
    cancelButtonEl.textContent = "Cancel";

    form.append(
      titleTextEl,
      titleInputEl,
      descriptionTextEl,
      descriptionInputEl,
      saveButtonEl,
      cancelButtonEl,
    );

    form.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      const newTask = new Todo(task.id, formData["title"], formData["desc"]);
      onSubmit(newTask);
      popupEl.remove();
    });

    popupEl.appendChild(form);
    this.content.append(popupEl);
  }

  clearTodoList() {
    this.todolist.innerHTML = "";
  }

  drawTodoList(title = "", taskArray = [], onUpdate = (newTaskArray) => {}) {
    const todoListCard = document.createElement("div");
    todoListCard.id = "todoListCard";

    const titleEl = document.createElement("h2");
    titleEl.textContent = title;

    todoListCard.append(titleEl);
    this.todolist.append(todoListCard);

    for (let i = 0; i < taskArray.length; i++) {
      const task = taskArray[i];
      const todoEl = document.createElement("button");
      todoEl.textContent = task.title;
      todoListCard.appendChild(todoEl);
      todoEl.addEventListener("click", (_) => {
        this._createTaskEditForm(task, (newTask) => {
          taskArray[i] = newTask;
          onUpdate(taskArray);
        });
      });
    }
  }
}

export { UI };
