class Todo {
  constructor(
    id = "",
    title = "",
    description = "",
    dueDate = "",
    priority = "",
    notes = [""],
    checklist = [""],
  ) {
    this._id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
  }

  get id() {
    return this._id;
  }
}

export { Todo };
