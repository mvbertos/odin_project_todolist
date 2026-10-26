class ProjectRepo {
  constructor(registry = new Map()) {
    this.registry = registry;
  }
  register(project) {
    const id = crypto.randomUUID();
    this.registry.set(id, project);
    try {
      localStorage.projects = JSON.stringify(
        Array.from(this.registry.entries()),
      );
      console.log("project successfully saved");
    } catch (e) {
      throw new Error(e);
    }
    return id;
  }
  remove(id) {
    throw new Error("Method not implemented.");
  }
  getAll() {
    return this.registry;
  }
  getByID(id) {
    let loadedProjectList = null;
    try {
      loadedProjectList = new Map(JSON.parse(localStorage.projects));
      if (loadedProjectList.has(id)) {
        return loadedProjectList.get(id);
      } else {
        return null;
      }
    } catch (e) {
      loadedProjectList = new Map();
      console.warn(
        "Couldn't load the the localstorage data, this session is starting with a new map",
      );
    }
    return null;
  }
  update(id, project) {
    try {
      if (this.registry.has(id)) {
        this.registry.set(id, project);
        localStorage.projects = JSON.stringify(
          Array.from(this.registry.entries()),
        );
        console.log("project with name successfully updated");
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
export { ProjectRepo };
