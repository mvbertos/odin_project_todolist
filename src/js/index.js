import "../css/style.css";
import { Project } from "./project";
import { ProjectPage } from "./project_page";
import { ProjectRepo } from "./project_repo";
const projPage = new ProjectPage(
  new ProjectRepo({
    helo: new Project("hello world", "a test", []),
  }),
);
projPage.render();
