class TaskRepo {
  constructor(registry = new Map(), onTaskRegistered = (id, tasks) => {}) {
    this.registry = registry;
    this.onTaskRegistered = onTaskRegistered;
  }
  register(task) {
    try {
      const id = crypto.randomUUID();
      this.registry.set(id, task);
      localStorage.tasks = JSON.stringify(Array.from(this.registry.entries()));
      this.onTaskRegistered(id, task);
      console.log("task successfully saved");
      return id;
    } catch (e) {
      throw new Error(e);
    }
    return -1;
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
export { TaskRepo };
