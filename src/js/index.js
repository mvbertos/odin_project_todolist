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

function display() {
  ui.todolistDivEl.innerHTML = "";
  //populate todolist
  for (let i = 0; i < todoListArray.length; i++) {
    const e = todoListArray[i];
    ui.todolistDivEl.appendChild(
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

  //add new todolist button
  const addTodoListButtonEl = document.createElement("button");
  addTodoListButtonEl.textContent = "Add new todolist";
  addTodoListButtonEl.className = "todoListCard add";
  ui.todolistDivEl.appendChild(addTodoListButtonEl);
  addTodoListButtonEl.addEventListener("click", (e) => {
    ui.content.appendChild(
      ui.createTodoListForm((ntdl) => {
        todoListArray.push(ntdl);
        display();
      }),
    );
  });
}

ui.createMainPage();
display();
