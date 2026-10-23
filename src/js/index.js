import "../css/style.css";
import { Project } from "./project";
import { ProjectPage } from "./project_page";
import { ProjectRepo } from "./project_repo";
//fixme: there is a problem here
let loadedProjectList = null;
try {
  loadedProjectList = new Map(JSON.parse(localStorage.projects));
} catch (e) {
  loadedProjectList = new Map();
  console.warn(
    "Couldn't load the the localstorage data, this session is starting with a new map",
  );
}
const projPage = new ProjectPage(
  new ProjectRepo(loadedProjectList == null ? new Map() : loadedProjectList),
);

projPage.render();
