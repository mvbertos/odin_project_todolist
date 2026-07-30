import "../css/style.css";
import { Todo } from "./todo";
import { TodoList } from "./todo_list";

class UI {
  constructor() {
    this.content = document.getElementById("content");
    this.content.className = "content";

    //create header
    this.header = document.createElement("header");
    const headerLabel = document.createElement("h1");
    headerLabel.textContent = "Todo List";
    this.header.appendChild(headerLabel);

    this.todolistDivEl = document.createElement("div");
    this.todolistDivEl.className = "todoList";

    this.footer = document.createElement("footer");
    this.footer.textContent = "made by logout";

    this.content.append(this.header, this.todolistDivEl, this.footer);
  }

  createTaskEditForm(task, submit = (newTask) => {}) {
    //create a popup
    const popupEl = document.createElement("div");
    popupEl.className = "popup";

    //If user click outside the popup it will close it self
    popupEl.addEventListener("click", (_) => {
      popupEl.remove();
    });

    //here start the formulary
    const form = document.createElement("form");
    form.className = "todoEditForm";

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
      const newTask = new Todo(
        task.className,
        formData["title"],
        formData["desc"],
      );
      submit(newTask);
      popupEl.remove();
    });

    popupEl.appendChild(form);
    this.content.append(popupEl);
  }

  createTodoListForm(submit = (newTodoList) => {}) {
    //create a popup
    const popupEl = document.createElement("div");
    popupEl.className = "popup";

    //If user click outside the popup it will close it self
    popupEl.addEventListener("click", (_) => {
      popupEl.remove();
    });

    //here start the formulary
    const form = document.createElement("form");
    form.className = "todoEditForm";

    const titleTextEl = document.createElement("label");
    titleTextEl.textContent = "Title";
    const titleInputEl = document.createElement("input");
    titleInputEl.name = "title";
    titleInputEl.placeholder = "Title";

    const footerDivEl = document.createElement("div");
    const saveButtonEl = document.createElement("button");
    saveButtonEl.type = "submit";
    saveButtonEl.textContent = "Save";

    const cancelButtonEl = document.createElement("button");
    cancelButtonEl.addEventListener("click", (e) => {
      e.stopPropagation();
      popupEl.remove();
    });
    cancelButtonEl.textContent = "Cancel";

    footerDivEl.append(saveButtonEl, cancelButtonEl);

    form.append(titleTextEl, titleInputEl, footerDivEl);

    form.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      const newTodoList = new TodoList(Date.UTC.toString(), formData["title"]);
      submit(newTodoList);
      popupEl.remove();
    });

    popupEl.appendChild(form);
    this.content.append(popupEl);
  }

  clearTodoList() {
    this.todolistDivEl.innerHTML = "";
  }

  createTodoList(todoList = new TodoList(), onChanged = (newTodoList) => {}) {
    const todoListCard = document.createElement("div");
    todoListCard.className = "todoListCard";

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
          () => {
            (todoList.todoArray.splice(i, 1), onChanged(todoList));
          },
        ),
      );
    }

    const addTaskButtonEl = document.createElement("button");
    addTaskButtonEl.className = "newTask";
    addTaskButtonEl.textContent = "Add new Task";
    addTaskButtonEl.addEventListener("click", (e) => {
      this.createTaskEditForm(new Todo(), (t) => {
        todoList.todoArray.push(t);
        onChanged(todoList);
      });
    });

    todoListCard.appendChild(addTaskButtonEl);
  }

  createTask(task = new Todo(), change = (newTask) => {}, remove = () => {}) {
    const taskDivEl = document.createElement("div");
    taskDivEl.className = "taskEl";

    const checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.checked = task.done;
    checkBoxEl.addEventListener("change", (e) => {
      task.done = checkBoxEl.checked;
      change(task);
    });
    taskDivEl.appendChild(checkBoxEl);

    const taskButtonEl = document.createElement("button");
    if (task.done) {
      taskButtonEl.className += "dashed";
    }
    taskButtonEl.textContent = task.title;
    taskButtonEl.addEventListener("click", (_) => {
      this.createTaskEditForm(task, (newTask) => {
        change(newTask);
      });
    });
    taskDivEl.appendChild(taskButtonEl);

    const removeButtonEl = document.createElement("button");
    removeButtonEl.className = "del";
    removeButtonEl.textContent = "X";
    removeButtonEl.addEventListener("click", (e) => {
      remove();
    });
    taskDivEl.appendChild(removeButtonEl);
    return taskDivEl;
  }
}

export { UI };
