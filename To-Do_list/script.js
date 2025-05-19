"use strict";
(function () {
  function createTodoElements() {
    const newLi = document.createElement("li");
    const newInputValue = document.getElementById("newInput").value;
    const node = document.createTextNode(newInputValue);
    const list = document.querySelector(".todoList");
    return { newLi, node, list };
  }

  function createCheckbox() {
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.className = "simpleCheckbox";
    return newCheckbox;
  }

  function createRemoveButton() {
    const newCloseButton = document.createElement("button");
    newCloseButton.className = "removeButton";
    return newCloseButton;
  }

  function appendElements(elements, checkbox, button) {
    elements.newLi.appendChild(elements.node);
    elements.newLi.insertBefore(checkbox, elements.newLi.firstChild);
    elements.newLi.appendChild(button);
    elements.list.appendChild(elements.newLi);
  }

  function addNewTask() {
    const elements = createTodoElements();
    const checkbox = createCheckbox();
    const button = createRemoveButton();
    appendElements(elements, checkbox, button);
  }

  function handleRemoveClick(target) {
    target.parentElement.remove();
  }

  function handleCheckboxChange(target) {
    const listItem = target.parentElement;
    listItem.classList.toggle("done", target.checked);
  }

  function handleListClick(event) {
    const target = event.target;
    if (target.classList.contains("removeButton")) {
      handleRemoveClick(target);
    } else if (target.classList.contains("simpleCheckbox")) {
      handleCheckboxChange(target);
    }
  }

  function initializeTodoList() {
    const todoList = document.querySelector(".todoList");
    todoList.addEventListener("click", handleListClick);
  }

  initializeTodoList();

  window.addNewTask = addNewTask;
})();
