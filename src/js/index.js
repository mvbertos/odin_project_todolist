import { Project } from "./project";
import { Todo } from "./todo";

console.log("hello world");

const proj = new Project("hello world", "just testing mate");
proj.addTodo(new Todo("heyy-ohh", "Heyy Ohhh!", "just sayin' hey"));
proj.addTodo(new Todo("steven", "steven!", "just sayin' hey"));
proj.addTodo(
  new Todo(
    "my name is jeff",
    "My name is jeff movie",
    "I guess no one remembers this movie anymore",
  ),
);

function printArray() {
  console.log(`Project: ${proj.title}`);
  console.log(
    "#################### Printing the whole todo list right here! ####################",
  );
  proj.todoArray.forEach((el) => {
    console.log(el);
  });
  console.log(
    "##################################################################################",
  );
}

printArray();
proj.removeTodo("steven");
proj.removeTodo(0);
printArray();
proj.editTodo(
  0,
  new Todo(
    "hello_world",
    "hello World",
    "It's funny to see you here isn't it?",
  ),
);
printArray();
proj.title = "hey jerry!";
printArray();
