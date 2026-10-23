import { Page } from "./Page";
import { ProjectRepo } from "./project_repo";
import { popupForm } from "./popup";
import { Project } from "./project";

class ProjectPage extends Page {
  constructor(projectRepo = new ProjectRepo()) {
    super();
    this.projectRepo = projectRepo;
  }

  render() {
    const content = document.getElementById("content");
    content.setHTMLUnsafe("");

    const itemListEL = document.createElement("div");
    itemListEL.className = "itemList";
    content?.appendChild(itemListEL);

    this.projectRepo
      .getAll()
      .values()
      .forEach((proj) => {
        const cardEl = document.createElement("div");
        cardEl.className = "card";
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

  onCreateNewProjectClickEvent(e) {
    const popup = popupForm({ name: "text" });
    const form = popup.firstElementChild;

    form.addEventListener("submit", (e) => {
      const obj = Object.fromEntries(new FormData(form));
      const name = obj.name;
      this.projectRepo.register(new Project(obj.name));
    });

    document.body.appendChild(popup);
  }
}
export { ProjectPage };
