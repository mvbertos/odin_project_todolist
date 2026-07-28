import { Todo } from "./todo";
import { TodoList } from "./todo_list";

class Project {
  constructor(title = "", desc = "", todoListArray = [new TodoList()]) {
    this.title = title;
    this.desc = desc;
    this._todoListArray = todoListArray;
  }

  get todoListArray(){
    return this._todoListArray;
  }

  removeTodoList(value) {
    if (Number.isInteger(value)) {
      if (value < -1) {
        console.error("invalid index");
      }
      this._todoListArray.splice(value, 1);
    } else {
      const index = this.getTodoListById(value);
      this._todoListArray.splice(index, 1);
    }
  }


  getTodoListById(id) {
    for (let index = 0; index < this._todoListArray.length; index++) {
      const element = this._todoListArray[index];
      if (element.id == id) {
        return index;
      }
    }
    return -1;
  }
}

export { Project };
