import { Project } from "./project";
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

  createForm(
    fields = [{}],
    submit = (d) => {},
    canDelete = false,
    remove = (e) => {},
  ) {
    const formEl = document.createElement("form");
    fields.forEach((v) => {
      const labelEl = document.createElement("label");
      labelEl.textContent = v["name"];
      formEl.appendChild(labelEl);

      if (v["type"] == "select" && Object.hasOwn(v, "options")) {
        const selectEl = document.createElement("select");
        selectEl.name = v["name"];
        selectEl.innerHTML = v["options"]
          .map((opt) => "<option value=" + opt + ">" + opt + "</option>")
          .join("");
        formEl.appendChild(selectEl);
      } else {
        const inputEl = document.createElement("input");
        inputEl.value = v["value"];
        inputEl.name = v["name"];
        inputEl.type = v["type"];
        formEl.appendChild(inputEl);
      }
    });

    const footerDivEl = document.createElement("footer");
    if (canDelete) {
      const deleteButtonEl = document.createElement("button");
      deleteButtonEl.className = "del";
      deleteButtonEl.textContent = "Delete";
      deleteButtonEl.addEventListener("click", (e) => {
        e.preventDefault();
        remove(e);
      });
      footerDivEl.appendChild(deleteButtonEl);
    }
    const saveButtonEl = document.createElement("button");
    saveButtonEl.className = "add";
    saveButtonEl.type = "submit";
    saveButtonEl.textContent = "Save";
    footerDivEl.appendChild(saveButtonEl);
    formEl.appendChild(footerDivEl);

    formEl.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      submit(formData);
    });

    return formEl;
  }

  createProjectCard(title = "", click = (e) => {}, remove = (e) => {}) {
    const projCard = document.createElement("div");
    projCard.className = "projectCard";

    const removeButtonEl = document.createElement("button");
    removeButtonEl.addEventListener("click", (_) => {
      remove(e);
    });

    const titleEl = document.createElement("h2");
    titleEl.textContent = title;
    projCard.appendChild(titleEl);
    projCard.addEventListener("click", (e) => {
      click(e);
    });
    return projCard;
  }

  createTodoListCard(
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
          (_) => {
            todoList.todoArray.splice(i, 1);
            changed(todoList);
          },
        ),
      );
    }

    const addTaskButtonEl = this.createAddButton("Add task", (_) => {
      this.showPopup(
        this.createTaskForm(
          new Task(),
          (t) => {
            todoList.todoArray.push(t);
            changed(todoList);
          },
          false,
        ),
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

  createTask(task = new Task(), change = (newTask) => {}, remove = (e) => {}) {
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
    const titleEl = document.createElement("p");
    titleEl.textContent = task.title;
    const dueEl = document.createElement("p");
    dueEl.textContent = task.dueDate.toString();
    dueEl.className = "subtext";
    taskButtonEl.append(titleEl, dueEl);
    taskButtonEl.addEventListener("click", (_) => {
      this.showPopup(this.createTaskForm(task, change, true, remove));
    });
    taskDivEl.appendChild(taskButtonEl);
    return taskDivEl;
  }

  createTaskForm(
    value,
    change = (t) => {},
    removable = true,
    remove = (e) => {},
  ) {
    return this.createForm(
      [
        {
          name: "Title",
          value: value.title,
          type: "text",
        },
        {
          name: "Description",
          value: value.description,
          type: "text",
        },
        {
          name: "DueDate",
          value: value.dueDate,
          type: "date",
        },
        {
          name: "Priority",
          value: value.priority,
          type: "select",
          options: ["low", "medium", "high"],
        },
      ],
      (e) => {
        change(
          new Task(e["Title"], e["Title"], e["Description"], e["DueDate"]),
        );
        this.showPopup(null);
        // change(new Task(e[]));
      },
      removable,
      (e) => {
        remove(e);
        this.showPopup(null);
      },
    );
  }
}

export { UI };
