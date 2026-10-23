class TaskRepo {
  constructor(registry = new Map()) {
    this.registry = registry;
  }
  register(task) {
    const id = crypto.randomUUID();
    this.registry.set(id, task);
    try {
      localStorage.tasks = JSON.stringify(Array.from(this.registry.entries()));
      console.log("task successfully saved");
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
  update(task) {
    throw new Error("Method not implemented.");
  }
}
