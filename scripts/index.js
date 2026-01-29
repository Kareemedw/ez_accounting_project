import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import ExpandableCard from "../components/expandableCard.js";

import Calculator from "../components/calculator.js";

import { initialCardsAll } from "../data/initialData.js";
// import budgetApp from "../components/budgetApp.js";

const ui = {
  salaryForm: document.querySelector("#card-form-salary"),
  salaryInputInitial: document.querySelector("#salary-input-1"),
  salaryBalanceForm: document.querySelector("#salary-balance"),
  salarInputFinal: document.querySelector("#salary-input-2"),
  totalExpenseForm: document.querySelector("#total-expense"),
  totalExpenseInitial: document.querySelector(".total_input-1"),
  totalExpenseFinal: document.querySelector("#total-expense-input"),
  balanceTracking: document.querySelector("#balance-tracking"),
  salaryBalanceInitial: document.querySelector("#balance_input"),
  salaryBalanceFinal: document.querySelector("#tracking-inputs"),
  otherExpenses: document.querySelector("#tracking-input"),
  totalUtilityBill: document.querySelector("#total-utility-bill"),
  totalRecurringSubscription: document.querySelector("#total-subscription"),

  billDeleteBtn: document.querySelector(".bill__delete-btn"),

  additionalBillsName: document.querySelector("#bills_input-add"),
  additionalBillsPrice: document.querySelector("#bills_input_add"),
  additionalRecurringSubName: document.querySelector("#bills_input_add1"),
  additionalRecurringSubPrice: document.querySelector("#bills_input_add2"),
  additionalExpenseName: document.querySelector("#tracking_balance-add"),
  additionalExpensePrice: document.querySelector("#tracking_balance_add"),

  cardsList: document.querySelector(".card__list"),
  cardLists: document.querySelector(".card__lists"),
  cardsList1: document.querySelector(".card__list1"),
  cardForm: document.querySelectorAll(".card__form_utility_bill"),

  //const toggleBtn = document.querySelector("#toggleBudgetCard");
  //card: document.querySelector("#add-budget-form"),
  //body: document.querySelector("#budgetCardBody"),
  //toggleBtn: document.querySelector("#toggleBudgetCard"),
};

const templates = {
  cardTemplate: document
    .querySelector("#card-template")
    .content.querySelector(".utilityBills"),
  cardTemplates: document
    .querySelector("#card-templates")
    .content.querySelector(".recurringBills"),
  cardTemplate1: document
    .querySelector("#card-template1")
    .content.querySelector(".balanceBill"),
  /* cardTemplate2: document
    .querySelector("#budget-card-template")
    .content.querySelector(".budget__item"),*/
};

const cardElement = templates["cardTemplate"].cloneNode(true);
const cardElements = templates["cardTemplates"].cloneNode(true);
const cardElement1 = templates["cardTemplate1"].cloneNode(true);
//const cardElement2 = templates["cardTemplate2"].cloneNode(true);

const allCardTemplate = [
  templates["cardTemplate"],
  templates["cardTemplates"],
  templates["cardTemplate1"],
];

const addBudgetBtn = document.querySelector(".add__budget-btn");
// or your “Add New Budget” button

const modal = document.querySelector("#add-budget-modal");
const form = document.querySelector("#add-budget-form");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function getCardElements(data) {
  const cardElements = allCardTemplate[1].cloneNode(true);
  const cardLabel = cardElements.querySelector(".recurringBill");
  const cardInput = cardElements.querySelector(".card__input_utility_bill");

  const cardDeleteBtn = cardElements.querySelector(".bill__delete-icon");
  cardDeleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cardElements.remove();
    calculateTotal();
  });

  cardLabel.textContent = data.name;
  cardInput.value = data.price;

  cardInput.addEventListener("input", calc.calculateTotals);

  return cardElements;
}

const recurringElement = cardElements.querySelector(".recurringBill");
recurringElement.textContent = ui["additionalRecurringSubName"].value;
const addCardBtn2 = document.querySelector("#addBtn2");
addCardBtn2.addEventListener("click", (e) => {
  e.stopPropagation();
  const cardElements = templates["cardTemplates"].cloneNode(true);

  const recurringSubName = ui["additionalRecurringSubName"].value.trim();
  const recurringSubPrice = ui["additionalRecurringSubPrice"].value.trim();
  if (!recurringSubName) return;
  if (!recurringSubPrice) return;
  const id = uuidv4();

  const dataObjects = {
    name: recurringSubName,
    price: recurringSubPrice,
    id,
  };

  const newCards = getCardElements(dataObjects);

  ui["cardLists"].appendChild(newCards);

  ui["additionalRecurringSubName"].value = "";
  newCards.querySelectorAll(".subscription-input").forEach((input) => {
    input.addEventListener("input", calc._calculateTotals);
  });

  ui["additionalRecurringSubPrice"].value = "";
  newCards.querySelectorAll(".subscription-input").forEach((input) => {
    input.addEventListener("input", calc._calculateTotals);
  });

  calc._calculateTotals();
});

function getCardElement(data) {
  const cardElement = allCardTemplate[0].cloneNode(true);
  const cardLabel = cardElement.querySelector("#utilityBills");
  const cardInput = cardElement.querySelector("#bills-input");

  const cardDeleteBtn = cardElement.querySelector(".bill__delete-icon");
  cardDeleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cardElement.remove();
    calculateTotal();
  });

  cardLabel.textContent = data.name;
  cardInput.value = data.price;

  cardInput.addEventListener("input", calc.calculateTotals);

  return cardElement;
}

const billElement = cardElement.querySelector(".utilityBill");
billElement.textContent = ui["additionalBillsName"];
const addCardBtn1 = document.querySelector("#addBtn1");
addCardBtn1.addEventListener("click", (e) => {
  e.stopPropagation();
  const cardElement = templates["cardTemplate"].cloneNode(true);

  const billName = ui["additionalBillsName"].value.trim();
  const billPrice = ui["additionalBillsPrice"].value.trim();
  if (!billName) return;
  if (!billPrice) return;
  const id = uuidv4();

  const dataObject = {
    name: billName,
    price: billPrice,
    id,
  };

  const newCard = getCardElement(dataObject);

  ui["cardsList"].appendChild(newCard);
  ui["additionalBillsName"].value = "";
  newCard.querySelectorAll(".bills-input").forEach((input) => {
    input.addEventListener("input", calc._calculateTotals);
  });
  ui["additionalBillsPrice"].value = "";
  newCard.querySelectorAll(".bills-input").forEach((input) => {
    input.addEventListener("input", calc._calculateTotals);
  });

  calc._calculateTotals();
});

function getCardElement1(data) {
  const cardElement1 = allCardTemplate[2].cloneNode(true);
  const cardLabel = cardElement1.querySelector(".balanceBill");
  const cardInput = cardElement1.querySelector(".balance__input");

  const cardDeleteBtn = cardElement1.querySelector(".bill__delete-icon");
  cardDeleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cardElement1.remove();
    calculateTotalBalance();
  });

  cardLabel.textContent = data.name;
  cardInput.value = data.price;

  cardInput.addEventListener("input", calc._calculateTotalBalance);

  return cardElement1;
}

function handleEscape(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function handleDeleteCard(evt) {
  openModal(deleteModal);
}

ui["salaryBalanceInitial"].addEventListener("input", function () {
  salaryBalanceFinal.value = salaryBalanceInitial.value;
});

const editBudgetNameBtn = document.querySelector("#budget-name");
const editBudgetNameModal = document.querySelector("#edit-budget-name-modal");
const editBudgetNameInput = document.querySelector("#budget-name-input");
const editBudgetName = document.querySelector(".budget__name");
const editBudgetTypeBtn = document.querySelector("#salary-input1");
const editBudgetTypeModal = document.querySelector(
  "#edit-type-of-budget-modal",
);
const editBudgetTypeInput = document.querySelector("#budget-type-input");
const editBudgetType = document.querySelector(".budget__type");

editBudgetTypeBtn.addEventListener("click", function () {
  editBudgetTypeInput.value = editBudgetType.textContent;
  openModal(editBudgetTypeModal);
});

editBudgetNameBtn.addEventListener("click", function (e) {
  editBudgetNameInput.value = editBudgetName.textContent;
  openModal(editBudgetNameModal);
  e.stopPropagation();
});

const billElement1 = cardElement1.querySelector(".balanceBill");
billElement1.textContent = ui["additionalExpenseName"];
const addCardBtn3 = document.querySelector("#addBtn3");
addCardBtn3.addEventListener("click", (e) => {
  e.stopPropagation();
  const cardElement1 = templates["cardTemplate1"].cloneNode(true);

  const expenseName = ui["additionalExpenseName"].value.trim();
  const expensePrice = ui["additionalExpensePrice"].value.trim();
  if (!expenseName) return;
  if (!expensePrice) return;
  const id = uuidv4();

  const dataObject1 = {
    name: expenseName,
    price: expensePrice,
    id,
  };

  const newCard1 = getCardElement1(dataObject1);

  ui["cardsList1"].appendChild(newCard1);
  ui["additionalExpenseName"].value = "";
  newCard1.querySelectorAll(".balance-input").forEach((input) => {
    input.addEventListener("input", calculateTotalBalance);
  });

  ui["additionalExpensePrice"].value = "";
  newCard1.querySelectorAll(".balance-input").forEach((input) => {
    input.addEventListener("input", calculateTotalBalance);
  });

  calc._calculateTotalBalance();
});

ui["salaryBalanceInitial"].addEventListener("input", function () {
  ui["salaryBalanceFinal"].value = ui["salaryBalanceInitial"].value;
});

ui["salaryInputInitial"].addEventListener("input", function () {
  ui["salarInputFinal"].value = ui["salaryInputInitial"].value;
});

ui["totalExpenseInitial"].addEventListener("input", function () {
  totalExpenseFinal.value = totalExpenseInitial.value;
});

const card = document.querySelector("#add-budget-form");
const body = document.querySelector("#budgetCardBody");
const toggleBtn = document.querySelector("#toggleBudgetCard");

const expandableCard = new ExpandableCard({
  card,
  toggleBtn,
  body,
});

expandableCard._init();

const calc = new Calculator({
  root: body,
});

calc.bind();

document
  .querySelector("#tracking-input, #balance_input")
  .addEventListener("input", calc.balanceTrack);

initialCardsAll[0].forEach(function (item) {
  const cardElement = getCardElement(item);
  ui["cardsList"].append(cardElement);
});

initialCardsAll[1].forEach(function (item) {
  const cardElements = getCardElements(item);
  ui["cardLists"].append(cardElements);
});

initialCardsAll[2].forEach(function (item) {
  const cardElements = getCardElements(item);
  ui["cardLists"].append(cardElements);
});
