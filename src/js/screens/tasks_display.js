function display(todoListArray = [], changed = (td) => {}) {
  todolistDivEl.innerHTML = "";
  buttonReturnEl.addEventListener("click", (_) => {
    display(projectArray);
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
