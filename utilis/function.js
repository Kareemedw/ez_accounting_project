import { initialCardsAll } from "../data/initialData.js";

import {
  allCardTemplate,
  editBudgetNameModal,
  editBudgetNameInput,
  editBudgetTypeModal,
  editBudgetTypeInput,
} from "../utilis/Constants.js";

export function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

export function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

export function getCardElements(data, calc) {
  const cardElements = allCardTemplate[1].content.cloneNode(true);
  const cardLabel = cardElements.querySelector(".recurringBill");
  const cardInput = cardElements.querySelector(".card__input_utility_bill");

  const cardDeleteBtn = cardElements.querySelector(".bill__delete-icon");
  cardDeleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!cardDeleteBtn) return;

    const row = cardDeleteBtn.closest("li");
    if (!row) return;

    row.remove();

    calc._calculateTotals();
  });

  cardLabel.textContent = data.name;
  cardInput.value = data.price;

  return cardElements;
}

export function getCardElement(data, calc) {
  const cardElement = allCardTemplate[0].content.cloneNode(true);
  const cardLabel = cardElement.querySelector('[data-role="utility-bill1"]');
  const cardInput = cardElement.querySelector('[data-role="bills-input"]');

  const cardDeleteBtn = cardElement.querySelector(".bill__delete-icon");
  cardDeleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!cardDeleteBtn) return;

    const row = cardDeleteBtn.closest("li");
    if (!row) return;

    row.remove();
    calc._calculateTotals();
  });

  cardLabel.textContent = data.name;
  cardInput.value = data.price;

  return cardElement;
}

export function getCardElement1(data, calc) {
  const cardElement1 = allCardTemplate[2].content.cloneNode(true);
  const cardLabel = cardElement1.querySelector(".balanceBills");
  const cardInput = cardElement1.querySelector(`[data-role="balance-input1"]`);

  const cardDeleteBtn = cardElement1.querySelector(".bill__delete-icon");
  cardDeleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!cardDeleteBtn) return;

    const row = cardDeleteBtn.closest("li");
    if (!row) return;

    row.remove();
    calc._calculateTotalBalance();
  });

  cardLabel.textContent = data.name;
  cardInput.value = data.price;

  return cardElement1;
}

export function seedInitialLists(card, calc) {
  const utilityList = card.querySelector(".card__list");
  const subList = card.querySelector(".card__lists");
  const balanceList = card.querySelector(".card__list1");

  initialCardsAll[0].forEach((item) =>
    utilityList.append(getCardElement(item, calc)),
  );
  initialCardsAll[1].forEach((item) =>
    subList.append(getCardElements(item, calc)),
  );
  initialCardsAll[2].forEach((item) =>
    balanceList.append(getCardElement1(item, calc)),
  );

  calc._calculateTotals();
  calc._calculateTotalBalance();
}

export function wireAddButtons(card, calc) {
  const addBtn1 = card.querySelector('[data-role="addBtn1"]');
  const addBtn2 = card.querySelector('[data-role="addBtn2"]');
  const addBtn3 = card.querySelector('[data-role="addBtn3"]');

  const utilityList = card.querySelector(".card__list");
  const subList = card.querySelector(".card__lists");
  const balanceList = card.querySelector(".card__list1");

  const billsName = card.querySelector('[data-role="bills_input-add"]');
  const billsPrice = card.querySelector('[data-role="bills_input_add"]');

  const subName = card.querySelector('[data-role="bills_input_add1"]');
  const subPrice = card.querySelector('[data-role="bills_input_add2"]');

  const expName = card.querySelector('[data-role="tracking_balance-add"]');
  const expPrice = card.querySelector('[data-role="tracking_balance_add"]');

  addBtn1.addEventListener("click", (e) => {
    e.stopPropagation();

    const name = billsName.value.trim();
    const price = billsPrice.value.trim();
    if (!name || !price) return;

    const newCard = getCardElement({ name, price }, calc);
    utilityList.append(newCard);

    billsName.value = "";
    billsPrice.value = "";
    calc._calculateTotals();
  });

  addBtn2.addEventListener("click", (e) => {
    e.stopPropagation();

    const name = subName.value.trim();
    const price = subPrice.value.trim();
    if (!name || !price) return;

    const newCard = getCardElements({ name, price }, calc);
    subList.append(newCard);

    subName.value = "";
    subPrice.value = "";
    calc._calculateTotals();
  });

  addBtn3.addEventListener("click", (e) => {
    e.stopPropagation();

    const name = expName.value.trim();
    const price = expPrice.value.trim();
    if (!name || !price) return;

    const newCard = getCardElement1({ name, price }, calc);
    balanceList.append(newCard);

    expName.value = "";
    expPrice.value = "";
    calc._calculateTotalBalance();
  });
}

export function handleEscape(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

export let activeCard = null;

export function setupCardEventListeners(card) {
  // Edit budget name button
  const editNameBtn = card.querySelector('[data-role="edit-budget-name"]');
  editNameBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setActiveCard(card);
    const nameEl = activeCard.querySelector(".budget__name");
    editBudgetNameInput.value = nameEl.textContent.trim();
    openModal(editBudgetNameModal);
  });

  // Edit budget type button
  const editTypeBtn = card.querySelector('[data-role="edit-budget-type"]');
  editTypeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    activeCard = card;
    const typeEl = activeCard.querySelector(".budget__type");
    editBudgetTypeInput.value = typeEl.textContent.trim();
    openModal(editBudgetTypeModal);
  });

  // Delete budget button
  const deleteBtn = card.querySelector(".budget__delete-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this budget?")) {
      card.remove();
    }
  });
}

export function setActiveCard(card) {
  activeCard = card;
}
