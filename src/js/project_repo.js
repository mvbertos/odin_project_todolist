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
    throw new Error("Method not implemented.");
  }
  update(project) {
    throw new Error("Method not implemented.");
  }
}
export { ProjectRepo };
