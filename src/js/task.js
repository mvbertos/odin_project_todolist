class Task {
  constructor(
    id = "",
    title = "",
    description = "",
    dueDate = "",
    priority = "",
    notes = [""],
    done = false,
  ) {
    this._id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.done = done;
  }

  get id() {
    return this._id;
  }
}

export { Task };
