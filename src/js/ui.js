import { Task } from "./task";
import { TodoList } from "./todo_list";

//This class only responsibility is to help the user to create new interfaces
class UI {
  showPopup(element) {
    const content = document.getElementById("content");

    let popupEl = document.getElementById("popup");
    if (popupEl) {
      popupEl.remove();
    }

    if (element) {
      //create a popup
      popupEl = document.createElement("div");
      popupEl.id = "popup";
      popupEl.className = "popup";

      //If user click outside the popup it will close it self
      popupEl.addEventListener("click", (_) => {
        popupEl.remove();
      });

      popupEl.appendChild(element);
      content.appendChild(popupEl);
    }
  }

  createTaskForm(task, submit = (newTask) => {}) {
    //here start the formulary
    const formEl = document.createElement("form");
    // formEl.className = "todoEditForm";

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
    const footerDivEl = document.createElement("footer");
    const saveButtonEl = document.createElement("button");
    saveButtonEl.className = "add";
    saveButtonEl.type = "submit";
    saveButtonEl.textContent = "Save";
    footerDivEl.appendChild(saveButtonEl);
    formEl.append(
      titleTextEl,
      titleInputEl,
      descriptionTextEl,
      descriptionInputEl,
      footerDivEl,
    );

    formEl.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      const newTask = new Task(
        task.className,
        formData["title"],
        formData["desc"],
      );
      submit(newTask);
    });

    return formEl;
  }

  createTodoListForm(submit = (newTodoList) => {}) {
    //here start the formulary
    const formEl = document.createElement("form");
    // formEl.className = "todoEditForm";

    const titleTextEl = document.createElement("label");
    titleTextEl.textContent = "Title";
    const titleInputEl = document.createElement("input");
    titleInputEl.name = "title";
    titleInputEl.placeholder = "Title";

    const footerDivEl = document.createElement("footer");
    const saveButtonEl = document.createElement("button");
    saveButtonEl.type = "submit";
    saveButtonEl.textContent = "Save";
    saveButtonEl.className = "add";

    footerDivEl.appendChild(saveButtonEl);

    formEl.append(titleTextEl, titleInputEl, footerDivEl);

    formEl.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      const newTodoList = new TodoList(Date.UTC.toString(), formData["title"]);
      submit(newTodoList);
    });
    return formEl;
  }

  createTodoList(
    todoList = new TodoList(),
    changed = (newTodoList) => {},
    remove = () => {},
  ) {
    const todoListCard = document.createElement("div");
    todoListCard.className = "todoListCard";

    const headerDivEl = document.createElement("header");
    const removeButtonEl = document.createElement("button");
    removeButtonEl.textContent = "X";
    removeButtonEl.className = "del";
    removeButtonEl.addEventListener("click", (e) => {
      remove();
    });
    const titleEl = document.createElement("h2");
    titleEl.textContent = todoList.title;

    headerDivEl.append(titleEl, removeButtonEl);
    todoListCard.append(headerDivEl);

    for (let i = 0; i < todoList.todoArray.length; i++) {
      todoListCard.appendChild(
        this.createTask(
          todoList.todoArray[i],
          (nt) => {
            todoList.todoArray[i] = nt;
            changed(todoList);
          },
          () => {
            (todoList.todoArray.splice(i, 1), changed(todoList));
          },
        ),
      );
    }

    const addTaskButtonEl = this.createAddButton("Add task", (_) => {
      this.showPopup(
        this.createTaskForm(new Task(), (t) => {
          todoList.todoArray.push(t);
          changed(todoList);
          this.showPopup(null);
        }),
      );
    });

    todoListCard.appendChild(addTaskButtonEl);
    return todoListCard;
  }

  createAddButton(textContent = "Add Something", click = (e) => {}) {
    const button = document.createElement("button");
    button.className = "add";
    button.textContent = textContent;
    button.addEventListener("click", click);
    return button;
  }

  createTask(task = new Task(), change = (newTask) => {}, remove = () => {}) {
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
      document.getElementById("content").appendChild(
        this.createTaskForm(task, (newTask) => {
          change(newTask);
        }),
      );
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
