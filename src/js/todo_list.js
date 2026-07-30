import { Todo } from "./todo";

class TodoList {
  constructor(id = "", title = "", todo_array = []) {
    this._id = id;
    this.title = title;
    this.todoArray = todo_array;
  }

  get id() {
    return this._id;
  }

  addTodo(newTodo) {
    if (newTodo instanceof Todo) {
      this._todoArray.push(newTodo);
    } else {
      console.error(
        `tried to insert a ${typeof newTodo} in a array of type Todo`,
      );
    }
  }

  /** 
    call this method inserting the index or the id of the desired Todo Object
  */
  removeTodo(value) {
    if (Number.isInteger(value)) {
      if (value < -1) {
        console.error("invalid index");
      }
      this._todoArray.splice(value, 1);
    } else {
      const index = this.findItem(value);
      this._todoArray.splice(index, 1);
    }
  }

  findItem(id) {
    for (let index = 0; index < this.todoArray.length; index++) {
      const element = this.todoArray[index];
      if (element.id == id) {
        return index;
      }
    }
    return -1;
  }
}

export { TodoList };
