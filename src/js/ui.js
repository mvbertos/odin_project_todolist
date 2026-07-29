import "../css/style.css";
import { Todo } from "./todo";
import { TodoList } from "./todo_list";

class UI {
  constructor() {
    this.content = document.getElementById("content");

    //create header
    this.header = document.createElement("header");
    const headerLabel = document.createElement("h1");
    headerLabel.textContent = "Todo List";
    this.header.appendChild(headerLabel);

    this.todolistDivEl = document.createElement("div");
    this.todolistDivEl.id = "todoList";

    this.footer = document.createElement("footer");
    this.footer.textContent = "made by logout";

    this.content.append(this.header, this.todolistDivEl, this.footer);
  }

  _createTaskEditForm(task, onSubmit = (newTask) => {}) {
    //create a popup
    const popupEl = document.createElement("div");
    popupEl.id = "popup";

    //If user click outside the popup it will close it self
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
    this.todolistDivEl.innerHTML = "";
  }

  displayTodoList(todoList = new TodoList(), onChanged = (newTodoList) => {}) {
    const todoListCard = document.createElement("div");
    todoListCard.id = "todoListCard";

    const titleEl = document.createElement("h2");
    titleEl.textContent = todoList.title;

    todoListCard.append(titleEl);
    this.todolistDivEl.append(todoListCard);

    for (let i = 0; i < todoList.todoArray.length; i++) {
      todoListCard.appendChild(
        this.createTask(
          todoList.todoArray[i],
          (nt) => {
            todoList.todoArray[i] = nt;
            onChanged(todoList);
          },
          true,
          () => {
            (todoList.todoArray.splice(i, 1), onChanged(todoList));
          },
        ),
      );
    }

    const newTaskButton = this.createTask(
      new Todo("new", "Add New Task"),
      (nt) => {
        todoList.todoArray.push(nt);
        onChanged(todoList);
      },
    );
    newTaskButton.id = "newTask";

    todoListCard.appendChild(newTaskButton);
  }

  createTask(
    task = new Todo(),
    onChanged = (newTask) => {},
    removeble = false,
    onRemove = () => {},
  ) {
    const taskDivEl = document.createElement("div");
    taskDivEl.id = "taskEl";
    const taskButtonEl = document.createElement("button");
    taskButtonEl.textContent = task.title;
    taskButtonEl.addEventListener("click", (_) => {
      this._createTaskEditForm(task, (newTask) => {
        onChanged(newTask);
      });
    });
    taskDivEl.appendChild(taskButtonEl);
    if (removeble) {
      const removeButtonEl = document.createElement("button");
      removeButtonEl.id = "del";
      removeButtonEl.textContent = "X";
      removeButtonEl.addEventListener("click", (e) => {
        onRemove();
      });
      taskDivEl.appendChild(removeButtonEl);
    }
    return taskDivEl;
  }
}

export { UI };
