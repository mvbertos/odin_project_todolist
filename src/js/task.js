class Task {
  constructor(
    id = "",
    title = "",
    description = "",
    dueDate = "",
    priority = "",
    notes = [""],
    checklist = [""],
    done = false,
  ) {
    this._id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.done = done;
  }

  get id() {
    return this._id;
  }
}

export { Task };
