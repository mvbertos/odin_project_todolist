import { Page } from "./Page";
import { ProjectRepo } from "./project_repo";
import { popupForm } from "./popup";
import { Project } from "./project";
import { TaskPage } from "./task_page";
import { TaskRepo } from "./task_repo";

class ProjectPage extends Page {
  constructor(projectRepo = new ProjectRepo()) {
    super();
    this.repo = projectRepo;
  }

  render() {
    const content = document.getElementById("content");
    content.setHTMLUnsafe("");

    const itemListEL = document.createElement("div");
    itemListEL.className = "itemList";
    content?.appendChild(itemListEL);

    this.repo
      .getAll()
      .keys()
      .forEach((id) => {
        const proj = this.repo.getByID(id);
        const cardEl = document.createElement("div");
        cardEl.className = "card";
        cardEl.addEventListener("click", (e) => {
          this.onCardElClicked(e, proj, id);
        });

        const h1EL = document.createElement("h1");
        h1EL.textContent = proj.name;

        cardEl.appendChild(h1EL);
        itemListEL.appendChild(cardEl);
      });

    const createNewEl = document.createElement("button");
    createNewEl.className = "add";
    createNewEl.textContent = "New Project";
    createNewEl.addEventListener("click", (e) => {
      this.onCreateNewProjectClickEvent(e);
    });

    itemListEL.appendChild(createNewEl);
  }

  onCardElClicked(e, project, id) {
    const tasks = new Map();
    const tasksID = project.tasksID;
    let loadedTaskMap = null;
    try {
      loadedTaskMap = new Map(JSON.parse(localStorage.tasks));
      tasksID.forEach((element) => {
        if (loadedTaskMap.has(element)) {
          const object = loadedTaskMap.get(element);
          tasks.set(element, object);
        }
      });
    } catch (e) {
      loadedTaskMap = new Map();
      console.warn(
        "No tasks found on storage, if this project had any task attached to it, it will be ignored for now on.",
      );
    }

    const taskPage = new TaskPage(
      new TaskRepo(tasks, (taskID, task) => {
        //onTaskRegistered
        project.tasksID.push(taskID);
        this.repo.update(id, project);
      }),
    );

    taskPage.render();
  }

  onCreateNewProjectClickEvent(e) {
    const popup = popupForm({ name: "text" });
    const form = popup.firstElementChild;

    form.addEventListener("submit", (e) => {
      const obj = Object.fromEntries(new FormData(form));
      const name = obj.name;
      this.repo.register(new Project(obj.name));
    });

    document.body.appendChild(popup);
  }
}
export { ProjectPage };
