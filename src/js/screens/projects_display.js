function display(projectArray = []) {
  //Clear the whole page
  todolistDivEl.innerHTML = "";
  buttonReturnEl.hidden = true;
  headerLabelEl.textContent = "Projects";

  for (let i = 0; i < projectArray.length; i++) {
    const proj = projectArray[i]; //get a project
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
          display(projectArray);
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
          display(projectArray);
        },
      ),
    );
  });
  todolistDivEl.appendChild(addProjectButtonEl);
}

function createProjectCard(title = "", click = (e) => {}, remove = (e) => {}) {
  const projCardEl = document.createElement("div");
  projCardEl.className = "projectCard";

  const titleEl = document.createElement("h2");
  titleEl.textContent = title;
  projCardEl.appendChild(titleEl);
  projCardEl.addEventListener("click", (e) => {
    click(e);
  });

  const removeButtonEl = document.createElement("button");
  removeButtonEl.addEventListener("click", (e) => {
    e.stopPropagation();
    remove(e);
  });
  removeButtonEl.textContent = "X";
  removeButtonEl.className = "del";
  projCardEl.appendChild(removeButtonEl);

  return projCardEl;
}
