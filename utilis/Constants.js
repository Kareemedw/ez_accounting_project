export const budgetTpl = document.querySelector(
  "#overall-budget-card-template",
);

export const cardSelector = budgetTpl.content.querySelector(".budget__card");
export const bodySelector = budgetTpl.content.querySelector(
  '[data-role="budget-body"]',
);
export const toggleCardBtn = budgetTpl.content.querySelector(
  '[data-role="toggleBudgetCard"]',
);
export const budgetsRoot = document.querySelector(
  '[data-role="overall-budget-body"]',
);

export const cardTemplateOverall = budgetTpl.content.cloneNode(true);

export const ui = {
  salaryForm: cardTemplateOverall.querySelector(
    '[data-role="card-form-salary"]',
  ),
  salaryInputInitial: cardTemplateOverall.querySelector(
    '[data-role="salary-input-1"]',
  ),
  salaryBalanceForm: cardTemplateOverall.querySelector(
    '[data-role="salary-balance"]',
  ),
  salarInputFinal: cardTemplateOverall.querySelector(
    '[data-role="salary-input-2"]',
  ),
  totalExpenseForm: cardTemplateOverall.querySelector(
    '[data-role="total-expense"]',
  ),
  totalExpenseInitial: cardTemplateOverall.querySelector(".total_input-1"),
  totalExpenseFinal: cardTemplateOverall.querySelector(
    '[data-role="total-expense-input"]',
  ),
  balanceTracking: cardTemplateOverall.querySelector(
    '[data-role="balance-tracking"]',
  ),
  salaryBalanceInitial: cardTemplateOverall.querySelector(
    '[data-role="balance_input"]',
  ),
  salaryBalanceFinal: cardTemplateOverall.querySelector(
    '[data-role="tracking-inputs"]',
  ),
  otherExpenses: cardTemplateOverall.querySelector(
    '[data-role="tracking-input"]',
  ),
  totalUtilityBill: cardTemplateOverall.querySelector(
    '[data-role="total-utility-bill"]',
  ),
  totalRecurringSubscription: cardTemplateOverall.querySelector(
    '[data-role="total-subscription"]',
  ),

  billDeleteBtn: cardTemplateOverall.querySelector(".bill__delete-btn"),

  additionalBillsName: cardTemplateOverall.querySelector(
    '[data-role="bills_input-add"]',
  ),
  additionalBillsPrice: cardTemplateOverall.querySelector(
    '[data-role="bills_input_add"]',
  ),
  additionalRecurringSubName: cardTemplateOverall.querySelector(
    '[data-role="bills_input_add1"]',
  ),
  additionalRecurringSubPrice: cardTemplateOverall.querySelector(
    '[data-role="bills_input_add2"]',
  ),
  additionalExpenseName: cardTemplateOverall.querySelector(
    '[data-role="tracking_balance-add"]',
  ),
  additionalExpensePrice: cardTemplateOverall.querySelector(
    '[data-role="tracking_balance_add"]',
  ),

  /*cardsList: cardTemplateOverall.querySelector(".card__list"),
  cardLists: cardTemplateOverall.querySelector(".card__lists"),
  cardsList1: cardTemplateOverall.querySelector(".card__list1"),
  cardForm: cardTemplateOverall.querySelectorAll(".card__form_utility_bill"),*/
};

export const templates = {
  cardTemplate: cardTemplateOverall.querySelector(
    '[data-role="card-template"]',
  ),
  //.content.querySelector('[data-role="utilityBills"]'),
  cardTemplates: cardTemplateOverall.querySelector(
    '[data-role="card-templates"]',
  ),
  //.content.querySelector('[data-role="recurringBills"]'),
  cardTemplate1: cardTemplateOverall.querySelector(
    '[data-role="card-template1"]',
  ),
  //.content.querySelector('[data-role="balancebill"]'),
};

export const budgetCardBtn = document.querySelector(".add__budget-btn");

export let budgetCount = 1;

export const allCardTemplate = [
  templates["cardTemplate"],
  templates["cardTemplates"],
  templates["cardTemplate1"],
];

export const editBudgetNameBtn = document.querySelector(
  '[data-role="edit-budget-name"]',
);
export const editBudgetNameModal = document.querySelector(
  "#edit-budget-name-modal",
);
export const editBudgetNameInput = document.querySelector("#budget-name-input");
export const editBudgetName = document.querySelector(".budget__name");
export const editBudgetTypeBtn = document.querySelector(
  '[data-role="edit-budget-type"]',
);
export const editBudgetTypeModal = document.querySelector(
  "#edit-type-of-budget-modal",
);
export const editBudgetTypeInput = document.querySelector("#budget-type-input");
export const editBudgetType = document.querySelector(".budget__type");
export const budgetDeleteBtn = cardTemplateOverall.querySelectorAll(
  ".budget__delete-btn",
);

export const modalSubmitBtnType = document.querySelector(
  "#modal-submit-btn-type",
);

export const modalSubmitBtnName = document.querySelector(
  "#modal-submit-btn-name",
);

export const editBudgetNameForm = document.querySelector(
  "#edit-budget-name-form",
);

export const editBudgetTypeForm = document.querySelector(
  "#edit-budget-type-form",
);

//console.log("activeCard set?", activeCard);
