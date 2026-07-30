import "../css/style.css";
import { Project } from "./project";
import { Task } from "./task";
import { TodoList } from "./todo_list";
import { UI } from "./ui";

const ui = new UI();

const todoListArray = [
  new TodoList("helloWorld", "Maggot", [
    new Task("td1", "hello"),
    new Task("td2", "world"),
    new Task("td3", "what?"),
  ]),
  new TodoList("helloWorld1", "Fox", [
    new Task("td1", "hello"),
    new Task("td2", "world"),
    new Task("td3", "what?"),
  ]),
  new TodoList("helloWorld2", "Devil", [
    new Task("td1", "hello"),
    new Task("td2", "world"),
    new Task("td3", "what?"),
  ]),
];

const content = document.getElementById("content");
content.className = "content";

//header
const header = document.createElement("header");
const headerLabel = document.createElement("h1");
headerLabel.textContent = "Todo List";
header.appendChild(headerLabel);

//List
const todolistDivEl = document.createElement("div");
todolistDivEl.className = "todoList";

//Footer
const footer = document.createElement("footer");
footer.textContent = "made by logout";

content.append(header, todolistDivEl, footer);

function display() {
  todolistDivEl.innerHTML = "";
  //populate todolist
  for (let i = 0; i < todoListArray.length; i++) {
    const e = todoListArray[i];
    todolistDivEl.appendChild(
      ui.createTodoList(
        e,
        (ntl) => {
          todoListArray[i] = ntl;
          display();
        },
        () => {
          todoListArray.splice(i, 1);
          display();
        },
      ),
    );
  }
  const addTodoButtonEl = ui.createAddButton("Add todolist", (_) => {
    ui.showPopup(
      ui.createForm([{ name: "Title", value: "", type: "Text" }], (v) => {
        todoListArray.push(new TodoList(v["Title"], v["Title"]));
        ui.showPopup(null);
        display();
      }),
    );
  });
  todolistDivEl.appendChild(addTodoButtonEl);
}

display();
