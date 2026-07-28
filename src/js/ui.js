import "../css/style.css";

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

    // todolist.appendChild(todolistCard);
    this.content.append(this.header, this.todolist, this.footer);
  }

  addTodoList(title = "", tasks = []) {
    const todoListCard = document.createElement("div");
    todoListCard.id = "todoListCard";

    const titleEl = document.createElement("h2");
    titleEl.textContent = title;

    todoListCard.append(titleEl);
    this.todolist.append(todoListCard);

    tasks.forEach((e) => {
      const todoEl = document.createElement("button");
      todoEl.textContent = e.title;
      todoListCard.appendChild(todoEl);
      todoEl.addEventListener("click", (_) => {
        const popupEl = document.createElement("div");
        popupEl.id = "popup";
        popupEl.addEventListener("click", (_) => {
          popupEl.remove();
        });

        const form = document.createElement("form");
        form.id = "todoEditForm";

        const titleTextEl = document.createElement("label");
        titleTextEl.textContent = "Title";
        const titleInputEl = document.createElement("input");
        titleInputEl.name = "title";
        titleInputEl.value = e.title;

        const descriptionTextEl = document.createElement("label");
        descriptionTextEl.textContent = "Description";
        const descriptionInputEl = document.createElement("input");
        descriptionInputEl.value =
          e.description.lenght > 0 ? e.description : "Empty";
        descriptionInputEl.name = "desc";

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
          const data = new FormData(e.target);
          popupEl.remove();
          //TODO: update task with the new informed values
        });

        popupEl.appendChild(form);
        this.content.append(popupEl);
      });
    });
  }
}

export { UI };
