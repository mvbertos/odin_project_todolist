import { Project } from "./project";
import { Todo } from "./todo";
import { TodoList } from "./todo_list";

console.log("hello world");

const todoList1 = new TodoList("heyList", "This is My Title", [
  new Todo("td1", "Todo1"),
  new Todo("td2", "Todo2"),
]);

const todoList2 = new TodoList("heylist2", "This is My Title Second", [
  new Todo("td1", "Todo1"),
  new Todo("td2", "Todo2"),
]);
const proj = new Project("hello world", "just testing mate", [
  todoList1,
  todoList2,
]);

function printArray() {
  console.log(`Project: ${proj.title}`);
  console.log(
    "#################### Printing the whole todo list right here! ####################",
  );
  proj._todoListArray.forEach((el) => {
    console.log(el);
  });
  console.log(
    "##################################################################################",
  );
}

//Removing
printArray();
proj.removeTodoList("heyList");
printArray();

//Editing
const idx = proj.getTodoListById("heylist2");
proj._todoListArray[idx].title = "HEYYY OHHHH!!!!!!!!!!!";
printArray();

//Add new TodoList
proj.todoListArray.push(new TodoList("bob","booob"))
printArray();

const a = proj._todoListArray[proj.getTodoListById("heylist2")];
const b =proj._todoListArray[proj.getTodoListById("bob")];
proj.moveTask(a,b,"td1");
printArray();