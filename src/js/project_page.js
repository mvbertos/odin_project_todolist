import { Page } from "./Page";
import { ProjectRepo } from "./project_repo";

class ProjectPage extends Page {
  constructor(projectRepo = new ProjectRepo()) {
    super();
    this.projectRepo = projectRepo;
  }
  render() {
    const itemListEL = document.createElement("div");
    itemListEL.className = "itemList";
    content?.appendChild(itemListEL);
    Object.values(this.projectRepo.getAll()).forEach((proj) => {
      const cardEl = document.createElement("div");
      cardEl.className = "card";
      const h1EL = document.createElement("h1");
      h1EL.textContent = proj.name;
      cardEl.appendChild(h1EL);
      itemListEL.appendChild(cardEl);
    });
  }
}
export { ProjectPage };
