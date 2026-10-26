import { Page } from "./Page";
import { popupForm } from "./popup";
import { Task } from "./task";

class TaskPage extends Page {
  constructor(taskRepo = new TaskRepo()) {
    super();
    this.repo = taskRepo;
  }

  render() {
    const content = document.getElementById("content");
    content.setHTMLUnsafe("");

    const itemListEL = document.createElement("div");
    itemListEL.className = "itemList";
    content?.appendChild(itemListEL);

    this.repo
      .getAll()
      .values()
      .forEach((task) => {
        const cardEl = document.createElement("div");
        cardEl.className = "card";
        cardEl.addEventListener("click", (e) => {
          onCardElClicked(e, task);
        });

        const h1EL = document.createElement("h1");
        h1EL.textContent = task.name;

        cardEl.appendChild(h1EL);
        itemListEL.appendChild(cardEl);
      });

    const createNewEl = document.createElement("button");
    createNewEl.className = "add";
    createNewEl.textContent = "New Project";
    createNewEl.addEventListener("click", (e) => {
      this.onCreateNewTaskClickEvent(e);
    });

    itemListEL.appendChild(createNewEl);
  }

  onCardElClicked(e) {
    throw new Error("Method not implementede yet");
  }
  onCreateNewTaskClickEvent(e) {
    const popup = popupForm({ name: "text" });
    const form = popup.firstElementChild;

    form.addEventListener("submit", (e) => {
      const obj = Object.fromEntries(new FormData(form));
      const name = obj.name;
      this.repo.register(new Task(obj.name));
    });

    document.body.appendChild(popup);
  }
}
export { TaskPage };
