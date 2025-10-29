"use strict";
(function () {
  function createTodoItemElements() {
    const newLi = document.createElement("li");
    newLi.className = "d-flex overflow-auto pb-2";
    const newInputValue = document.getElementById("newInput").value;
    const node = document.createTextNode(newInputValue);
    const list = document.querySelector(".todoList");
    return { newLi, node, list };
  }

  function createCheckbox() {
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.className = "form-check-input mx-2";
    return newCheckbox;
  }

  function createRemoveButton() {
    const newCloseButton = document.createElement("button");
    newCloseButton.className = "btn-close ms-auto mx-2";
    return newCloseButton;
  }

  function appendElements(elements, checkbox, button) {
    elements.newLi.appendChild(elements.node);
    elements.newLi.insertBefore(checkbox, elements.newLi.firstChild);
    elements.newLi.appendChild(button);
    elements.list.appendChild(elements.newLi);
  }

  function addNewTask() {
    const elements = createTodoItemElements();
    if (!elements.node.nodeValue.trim()) return;
    const checkbox = createCheckbox();
    const button = createRemoveButton();
    appendElements(elements, checkbox, button);
    document.getElementById("newInput").value = "";
  }

  function handleRemoveClick(target) {
    target.parentElement.remove();
  }

  function handleCheckboxChange(target) {
    const listItem = target.parentElement;
    listItem.classList.toggle("done", target.checked);
  }

  function handleNewListItemClicks(event) {
    const target = event.target;
    if (target.classList.contains("btn-close")) {
      handleRemoveClick(target);
    } else if (target.classList.contains("form-check-input")) {
      handleCheckboxChange(target);
    }
  }

  function setListEventListener() {
    const todoList = document.querySelector(".todoList");
    todoList.addEventListener("click", handleNewListItemClicks);
  }

  function setAddButtonEventListener() {
    const addButton = document.querySelector("#addButton");
    addButton.addEventListener("click", addNewTask);
  }

  function setEnterKeyEventListener() {
    const input = document.querySelector("#newInput");
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        addNewTask();
      }
    });
  }

  function initializeTodoList() {
    setListEventListener();
    setAddButtonEventListener();
    setEnterKeyEventListener();
  }

  initializeTodoList();
})();
