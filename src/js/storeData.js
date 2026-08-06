function save(name, data) {
  let storage;
  storage = window["localStorage"];
  storage.setItem(name, data);
}

function load(name) {
  const storage = window["localStorage"];
  try {
    var values = storage.getItem(name);
    return JSON.parse(values);
  } catch (e) {
    storage.setItem(name, null);
    return null;
  }
}

export { save, load };
