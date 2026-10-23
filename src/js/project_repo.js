class ProjectRepo {
  registry = {};
  constructor(registry = {}) {
    this.registry = registry;
  }
  register(project) {
    const id = crypto.randomUUID();
    this.registry.set(id, project);
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
