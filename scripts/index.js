import { seedInitialLists } from "../utilis/function.js";

import { wireAddButtons } from "../utilis/function.js";

import ExpandableCard from "../components/expandableCard.js";

import {
  ui,
  budgetCardBtn,
  budgetsRoot,
  budgetTpl,
  editBudgetNameModal,
  editBudgetTypeModal,
  editBudgetNameInput,
  editBudgetTypeInput,
  modalSubmitBtnName,
  modalSubmitBtnType,
} from "../utilis/Constants.js";

import {
  closeModal,
  activeCard,
  setupCardEventListeners,
  setActiveCard,
} from "../utilis/function.js";

import Calculator from "../components/calculator.js";

const modal = document.querySelector("#add-budget-modal");

addBudgetCard("New Budget");

budgetCardBtn.addEventListener("click", () => addBudgetCard("New Budget"));

function addBudgetCard(name) {
  // 1) clone a fresh card
  const frag = budgetTpl.content.cloneNode(true);
  const card = frag.querySelector('[data-role="add-budget-form"]');
  const calcByCard = new WeakMap();

  // 2) set name
  card.querySelector(".budget__name").textContent = name;

  // 3) calculator root must be INSIDE THIS card
  const body = card.querySelector('[data-role="budget-body"]');

  const calc = new Calculator({ root: card }); // or { root: body } either is fine
  calc.bind();

  calcByCard.set(card, calc);

  // 4) render initial lists INSIDE THIS card (not using global ui)
  seedInitialLists(card, calc);

  // 5) wire add buttons INSIDE THIS card only
  wireAddButtons(card, calc);

  setupCardEventListeners(card);

  // 6) append to DOM
  budgetsRoot.append(card);
}

const expandableCard = new ExpandableCard({
  rootEl: budgetsRoot,
  toggleSelector: '[data-role="toggleBudgetCard"]',
  openClass: "budget__card--open",
});
expandableCard._init();

ui["salaryBalanceInitial"].addEventListener("input", function () {
  ui["salaryBalanceFinal"].value = ui["salaryBalanceInitial"].value;
});

/*close modal event listeners - event delegation*/
document.addEventListener("click", (e) => {
  const closeBtn = e.target.closest(".modal__close-btn");
  if (!closeBtn) return;

  const modalEl = closeBtn.closest(".modal");
  if (!modalEl) return;

  closeModal(modalEl);
});

if (modalSubmitBtnName) {
  modalSubmitBtnName.addEventListener("click", (e) => {
    const form = e.currentTarget.closest("#edit-budget-name-form");
    if (!form) return;
    if (form) {
      // Manually trigger form validation and submission
      if (form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        if (
          activeCard &&
          editBudgetNameInput &&
          editBudgetNameInput.value.trim()
        ) {
          const nameEl = activeCard.querySelector(".budget__name");
          nameEl.textContent = editBudgetNameInput.value.trim();

          closeModal(editBudgetNameModal);
          editBudgetNameInput.value = "";
          setActiveCard(null);
        }
      }
    }
  });
}

if (modalSubmitBtnType) {
  modalSubmitBtnType.addEventListener("click", (e) => {
    const form = e.currentTarget.closest("#edit-budget-type-form");
    if (!form) return;
    if (form) {
      // Manually trigger form validation and submission
      if (form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();

        if (
          activeCard &&
          editBudgetTypeInput &&
          editBudgetTypeInput.value.trim()
        ) {
          const typeEl = activeCard.querySelector(".budget__type");
          typeEl.textContent = editBudgetTypeInput.value.trim();

          closeModal(editBudgetTypeModal);
          editBudgetTypeInput.value = "";
          setActiveCard(null);
        }
      }
    }
  });
}

ui["salaryBalanceInitial"].addEventListener("input", function () {
  ui["salaryBalanceFinal"].value = ui["salaryBalanceInitial"].value;
});

ui["salaryInputInitial"].addEventListener("input", function () {
  ui["salarInputFinal"].value = ui["salaryInputInitial"].value;
});

ui["totalExpenseInitial"].addEventListener("input", function () {
  totalExpenseFinal.value = totalExpenseInitial.value;
});
