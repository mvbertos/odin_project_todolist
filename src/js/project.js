import { Todo } from "./task";
import { TodoList } from "./todo_list";

class Project {
  constructor(title = "", desc = "", todoListArray = []) {
    this.title = title;
    this.todoListArray = todoListArray;
  }

  moveTask(a, b, taID) {
    const idx = a.findItem(taID);
    if (idx != -1) {
      b.todoArray.push(a.todoArray[idx]);
      a.todoArray.splice(idx, 1);
    } else {
      throw "Tried to move an invalid task";
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
