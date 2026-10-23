const popupForm = (function () {
  return function (map = {}) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.addEventListener("click", () => {
      popup.remove();
    });

    const form = document.createElement("form");
    form.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    Object.keys(map).forEach((key) => {
      const labelEl = document.createElement("label");
      labelEl.textContent = key;
      const inputEl = document.createElement("input");
      inputEl.type = map[key];
      inputEl.name = key.toLowerCase();
      form.append(labelEl, inputEl);
    });

    const submitEl = document.createElement("button");
    submitEl.type = "submit";
    submitEl.textContent = "Add";
    form.appendChild(submitEl);

    popup.appendChild(form);
    return popup;
  };
})();

export { popupForm };
