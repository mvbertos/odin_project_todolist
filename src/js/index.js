import "../css/style.css";
import { Project } from "./project";
import { Task } from "./task";
import { TodoList } from "./todo_list";
import { UI } from "./ui";
import { save, load } from "./storeData";

const ui = new UI();

const content = document.getElementById("content");
content.className = "content";

//header
const header = document.createElement("header");
const headerLabelEl = document.createElement("h1");
headerLabelEl.textContent = "Todo List";
const buttonReturnEl = document.createElement("button");
buttonReturnEl.textContent = "<-";
header.append(buttonReturnEl, headerLabelEl);
buttonReturnEl.hidden = true;

//List
const todolistDivEl = document.createElement("div");
todolistDivEl.className = "todoList";

//Footer
const footer = document.createElement("footer");
footer.textContent = "made by logout";

content.append(header, todolistDivEl, footer);

function displayTodoList(todoListArray = [], changed = (td) => {}) {
  todolistDivEl.innerHTML = "";
  buttonReturnEl.addEventListener("click", (_) => {
    displayProject(projectArray);
  });
  //populate todolist
  for (let i = 0; i < todoListArray.length; i++) {
    const e = todoListArray[i];
    todolistDivEl.appendChild(
      ui.createTodoListCard(
        e,
        (ntl) => {
          todoListArray[i] = ntl;
          changed(todoListArray);
        },
        (_) => {
          todoListArray.splice(i, 1);
          changed(todoListArray);
        },
      ),
    );
  }
  const addTodoButtonEl = ui.createAddButton("Add todolist", (_) => {
    ui.showPopup(
      ui.createForm([{ name: "Title", value: "", type: "Text" }], (v) => {
        ui.showPopup(null);
        todoListArray.push(new TodoList(v["Title"], v["Title"]));
        changed(todoListArray);
      }),
    );
  });
  todolistDivEl.appendChild(addTodoButtonEl);
}

function displayProject(projectArray = []) {
  todolistDivEl.innerHTML = "";
  buttonReturnEl.hidden = true;
  headerLabelEl.textContent = "Projects";
  for (let i = 0; i < projectArray.length; i++) {
    const proj = projectArray[i];
    todolistDivEl.appendChild(
      ui.createProjectCard(
        proj.title,
        (_) => {
          buttonReturnEl.hidden = false;
          headerLabelEl.textContent = proj.title;
          displayTodoList(proj.todoListArray, (td) => {
            proj.todoListArray = td;
            projectArray[i] = proj;
            displayTodoList(proj.todoListArray);
            save("Projects", JSON.stringify(projectArray));
          });
        },
        (_) => {
          projectArray.splice(i, 1);
          displayProject(projectArray);
          save("Projects", JSON.stringify(projectArray));
        },
      ),
    );
  }
  const addProjectButtonEl = ui.createAddButton("New Project", (_) => {
    ui.showPopup(
      ui.createForm(
        [
          {
            name: "Title",
            value: "",
            type: "Text",
          },
        ],
        (v) => {
          projectArray.push(new Project(v["Title"]));
          save("Projects", JSON.stringify(projectArray));
          displayProject(projectArray);
        },
      ),
    );
  });
  todolistDivEl.appendChild(addProjectButtonEl);
}

let loadedData = load("Projects");
const projectArray = loadedData == null ? [] : loadedData;
displayProject(projectArray);
