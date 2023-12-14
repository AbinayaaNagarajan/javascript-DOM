// SHOPPING LIST

//Used EventListener , getElementById
document.addEventListener("DOMContentLoaded", function () {
  const shoppingList = document.getElementById("shoppingList");
  const addItemInput = document.getElementById("addItemInput");
  const addItemButton = document.getElementById("addItemButton");
  const removeLastItemButton = document.getElementById("removeLastItemButton");
  const messageParagraph = document.getElementById("messageParagraph");
  const inputError = document.getElementById("inputError");
  
// Dom Event based Validation 
  addItemInput.addEventListener("input", function () {
    const inputValue = addItemInput.value.trim();
    const minLength = parseInt(addItemInput.getAttribute("minlength"), 10);

    if (inputValue.length < minLength) {
      inputError.textContent = `Minimum length should be ${minLength} characters.`;
      addItemButton.disabled = true;
    } else {
      inputError.textContent = "";
      addItemButton.disabled = false;
    }
  });

  const state = {
    items: [],
  };
//Used fragment, appendChild, BOM
  function renderShoppingList() {
    const fragment = document.createDocumentFragment();
// Used iterate, createElement, textContent
    state.items.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.classList.add(`item-${index % 3}`);
      fragment.appendChild(li);
    });

    shoppingList.innerHTML = "";
    shoppingList.appendChild(fragment);
  }

  
  function createMessageElement(message) {
    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    return paragraph;
  }
//Used Style, set Attribute
  function handleAddItem() {
    const newItem = addItemInput.value.trim();
    if (newItem) {
      state.items.push(newItem);
      renderShoppingList();

      const lastAddedItem = shoppingList.lastChild;
      lastAddedItem.setAttribute("data-added-by", "User123");

      lastAddedItem.style.backgroundColor = "lightgreen";

      const message = `Item added: ${newItem}`;
      messageParagraph.innerHTML = "";
      messageParagraph.appendChild(createMessageElement(message));
      addItemInput.value = "";
    }
  }
//Used inner HTML, appendChild, Prev Sibiling, Lastchild
  function handleRemoveLastItem() {
    if (state.items.length > 0) {
      const lastItem = shoppingList.lastChild;
      const previousSibling = lastItem.previousElementSibling;
      const removedItem = state.items.pop();
      renderShoppingList();
      const message = `Removed Item: ${removedItem}, Last Item in the list: ${previousSibling ? previousSibling.textContent : 'None'}`;
      messageParagraph.innerHTML = "";
      messageParagraph.appendChild(createMessageElement(message));
    } else {
      const message = "No items to remove.";
      messageParagraph.innerHTML = "";
      messageParagraph.appendChild(createMessageElement(message));
    }
  }

  addItemButton.addEventListener("click", handleAddItem);
  removeLastItemButton.addEventListener("click", handleRemoveLastItem);

  // Initial rendering of the shopping list
  renderShoppingList();
});
