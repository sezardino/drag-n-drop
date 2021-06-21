class DnD {
  constructor({
    wrapper,
    itemSelector,
    placeholderSelector,
    hoverClass,
    hideClass,
    draggableClass,
  }) {
    this.wrapper = document.querySelector(wrapper);
    this.items = this.wrapper.querySelectorAll(itemSelector);
    this.placeholders = this.wrapper.querySelectorAll(placeholderSelector);
    this.hoverClass = hoverClass;
    this.hideClass = hideClass;
    this.draggableClass = draggableClass;

    this.currentDrag = null;

    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragendHandler = this.dragendHandler.bind(this);
    this.dragoverHandler = this.dragoverHandler.bind(this);
    this.dragleaveHandler = this.dragleaveHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
    this.dragenterHandler = this.dragenterHandler.bind(this);

    this.init();
  }

  dragStartHandler(evt) {
    const target = evt.target;
    this.currentDrag = target;
    target.classList.add(this.draggableClass);
    setTimeout(() => target.classList.add(this.hideClass), 0);
  }

  dragendHandler(evt) {
    const target = evt.target;
    this.currentDrag = null;
    target.classList.remove(this.hideClass);
    target.classList.remove(this.draggableClass);
  }

  dragoverHandler(evt) {
    evt.preventDefault();
  }

  dragleaveHandler(evt) {
    evt.target.classList.remove(this.hoverClass);
  }

  dropHandler(evt) {
    console.log(evt.target);
    evt.target.append(this.currentDrag);
    evt.target.classList.remove(this.hoverClass);
  }

  dragenterHandler(evt) {
    evt.target.classList.add(this.hoverClass);
  }

  addListeners() {
    this.items.forEach((item) => {
      item.addEventListener("dragstart", this.dragStartHandler);
      item.addEventListener("dragend", this.dragendHandler);
    });

    this.placeholders.forEach((item) => {
      item.addEventListener("dragover", this.dragoverHandler);
      item.addEventListener("dragenter", this.dragenterHandler);
      item.addEventListener("dragleave", this.dragleaveHandler);
      item.addEventListener("drop", (evt) => {
        const target = evt.target;
        if (target !== item) {
          return;
        }
        target.append(this.currentDrag);
        target.classList.remove(this.hoverClass);
      });
    });
  }

  init() {
    this.addListeners();
  }
}

new DnD({
  wrapper: ".wrapper",
  itemSelector: ".item",
  placeholderSelector: ".placeholder",
  hoverClass: "hovered",
  hideClass: "hide",
  draggableClass: "draggable",
});
