const initialBills = [
  {
    name: "Electric",
    price: "",
  },
  {
    name: "Water",
    price: "",
  },
  {
    name: "Gas/Heat",
    price: "",
  },
  {
    name: "Wifi/Phone",
    price: "",
  },
  {
    name: "Grocery",
    price: "",
  },
];

const initialRecurringBill = [
  {
    name: "Netflix",
    price: "",
  },
  {
    name: "Hulu",
    price: "",
  },
];

const initialAdditionalBills = [
  /*{
    name: "Uber",
    price: "",
  },
  {
    name: "Lyft",
    price: "",
  },
  {
    name: "Doordash",
    price: "",
  },*/
];

const salaryForm = document.querySelector("#card-form-salary");
const salaryInputInitial = document.querySelector("#salary-input-1");
const salaryBalanceForm = document.querySelector("#salary-balance");
const salarInputFinal = document.querySelector("#salary-input-2");
const totalExpenseForm = document.querySelector("#total-expense");
const totalExpenseInitial = document.querySelector(".total_input-1");
const totalExpenseFinal = document.querySelector("#total-expense-input");
const balanceTracking = document.querySelector("#balance-tracking");
const salaryBalanceInitial = document.querySelector("#balance_input");
const salaryBalanceFinal = document.querySelector("#tracking-inputs");
const otherExpenses = document.querySelector("#tracking-input");
const totalUtilityBill = document.querySelector("#total-utility-bill");
const totalRecurringSubscription = document.querySelector(
  "#total-subscription"
);

const billDeleteBtn = document.querySelector(".bill__delete-btn");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".utilityBills");

const cardTemplates = document
  .querySelector("#card-templates")
  .content.querySelector(".recurringBills");

const cardTemplate1 = document
  .querySelector("#card-template1")
  .content.querySelector(".balanceBill");

const cardElement = cardTemplate.cloneNode(true);
const cardElements = cardTemplates.cloneNode(true);
const cardElement1 = cardTemplate1.cloneNode(true);
const additionalBillsName = document.querySelector("#bills_input-add");
const additionalBillsPrice = document.querySelector("#bills_input_add");
const additionalRecurringSubName = document.querySelector("#bills_input_add1");
const additionalRecurringSubPrice = document.querySelector("#bills_input_add2");
const additionalExpenseName = document.querySelector("#tracking_balance-add");
const additionalExpensePrice = document.querySelector("#tracking_balance_add");

const cardsList = document.querySelector(".card__list");
const cardLists = document.querySelector(".card__lists");
const cardsList1 = document.querySelector(".card__list1");
const cardForm = document.querySelectorAll(".card__form_utility_bill");

function getCardElements(data) {
  const cardElements = cardTemplates.cloneNode(true);
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

  cardInput.addEventListener("input", calculateTotal);

  return cardElements;
}

const recurringElement = cardElements.querySelector(".recurringBill");
recurringElement.textContent = additionalRecurringSubName;
const addCardBtn2 = document.querySelector("#addBtn2");
addCardBtn2.addEventListener("click", (e) => {
  e.stopPropagation();
  const cardElements = cardTemplates.cloneNode(true);

  const recurringSubName = additionalRecurringSubName.value.trim();
  const recurringSubPrice = additionalRecurringSubPrice.value.trim();
  if (!recurringSubName) return;
  if (!recurringSubPrice) return;

  const dataObjects = {
    name: recurringSubName,
    price: recurringSubPrice,
  };

  const newCards = getCardElements(dataObjects);

  cardLists.appendChild(newCards);

  additionalRecurringSubName.value = "";
  newCards.querySelectorAll(".subscription-input").forEach((input) => {
    input.addEventListener("input", calculateTotal);
  });

  additionalRecurringSubPrice.value = "";
  newCards.querySelectorAll(".subscription-input").forEach((input) => {
    input.addEventListener("input", calculateTotal);
  });

  calculateTotal();
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardLabel = cardElement.querySelector("#utilityBills");
  const cardInput = cardElement.querySelector(".card__input_utility_bill");

  const cardDeleteBtn = cardElement.querySelector(".bill__delete-icon");
  cardDeleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cardElement.remove();
    calculateTotal();
  });

  cardLabel.textContent = data.name;
  cardInput.value = data.price;

  cardInput.addEventListener("input", calculateTotal);

  return cardElement;
}

const billElement = cardElement.querySelector(".utilityBill");
billElement.textContent = additionalBillsName;
const addCardBtn1 = document.querySelector("#addBtn1");
addCardBtn1.addEventListener("click", (e) => {
  e.stopPropagation();
  const cardElement = cardTemplate.cloneNode(true);

  const billName = additionalBillsName.value.trim();
  const billPrice = additionalBillsPrice.value.trim();
  if (!billName) return;
  if (!billPrice) return;

  const dataObject = {
    name: billName,
    price: billPrice,
  };

  const newCard = getCardElement(dataObject);

  cardsList.appendChild(newCard);
  additionalBillsName.value = "";
  newCard.querySelectorAll(".bills-input").forEach((input) => {
    input.addEventListener("input", calculateTotal);
  });
  additionalBillsPrice.value = "";
  newCard.querySelectorAll(".bills-input").forEach((input) => {
    input.addEventListener("input", calculateTotal);
  });

  calculateTotal();
});

function getCardElement1(data) {
  const cardElement1 = cardTemplate1.cloneNode(true);
  const cardLabel = cardElement1.querySelector(".balanceBill");
  const cardInput = cardElement1.querySelector(".balance__input");

  const cardDeleteBtn = cardElement1.querySelector(".bill__delete-icon");
  cardDeleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cardElement1.remove();
    calculateTotal();
  });

  cardLabel.textContent = data.name;
  cardInput.value = data.price;

  cardInput.addEventListener("input", calculateTotalBalance);

  return cardElement1;
}

salaryBalanceInitial.addEventListener("input", function () {
  salaryBalanceFinal.value = salaryBalanceInitial.value;
});

const billElement1 = cardElement1.querySelector(".balanceBill");
billElement1.textContent = additionalExpenseName;
const addCardBtn3 = document.querySelector("#addBtn3");
addCardBtn3.addEventListener("click", (e) => {
  e.stopPropagation();
  const cardElement1 = cardTemplate1.cloneNode(true);

  const expenseName = additionalExpenseName.value.trim();
  const expensePrice = additionalExpensePrice.value.trim();
  if (!expenseName) return;
  if (!expensePrice) return;

  const dataObject1 = {
    name: expenseName,
    price: expensePrice,
  };

  const newCard1 = getCardElement1(dataObject1);

  cardsList1.appendChild(newCard1);
  additionalExpenseName.value = "";
  newCard1.querySelectorAll(".balance-input").forEach((input) => {
    input.addEventListener("input", calculateTotalBalance);
  });

  additionalExpensePrice.value = "";
  newCard1.querySelectorAll(".balance-input").forEach((input) => {
    input.addEventListener("input", calculateTotalBalance);
  });

  calculateTotalBalance();
});

salaryBalanceInitial.addEventListener("input", function () {
  salaryBalanceFinal.value = salaryBalanceInitial.value;
});

salaryInputInitial.addEventListener("input", function () {
  salarInputFinal.value = salaryInputInitial.value;
});

totalExpenseInitial.addEventListener("input", function () {
  totalExpenseFinal.value = totalExpenseInitial.value;
});

function calculateTotal() {
  const billsInput = document.querySelectorAll(".bills-input");
  const recurringSubscription = document.querySelectorAll(
    ".subscription-input"
  );

  let section1Total = 0;
  let section2Total = 0;

  billsInput.forEach((input) => {
    const value = parseFloat(input.value) || 0;
    section1Total += value;
  });

  recurringSubscription.forEach((input) => {
    const value = parseFloat(input.value) || 0;
    section2Total += value;
  });

  totalUtilityBill.value = section1Total;
  totalRecurringSubscription.value = section2Total;
  const totalExpenseFinal = document.querySelector("#total-expense-input");
  const grandTotal = section1Total + section2Total;
  totalExpenseInitial.value = grandTotal;
  totalExpenseFinal.value = grandTotal;

  balance();
}

function calculateTotalBalance() {
  const balanceInput = document.querySelectorAll(".balance-input1");

  // Start with the initial salary/balance
  const initialBalance = parseFloat(otherExpenses.dataset.initialValue) || 0;
  let remainingBalance = initialBalance;

  // Loop through all bill inputs
  balanceInput.forEach((input) => {
    const value = parseFloat(input.value);

    // Only subtract if the input has a real number
    if (!isNaN(value) && input.value.trim() !== "") {
      remainingBalance += value;
    }
  });

  // Update the final balance
  otherExpenses.value = remainingBalance;

  balanceTrack();
}

function addExpenseTotal() {
  const totalUtilityBill = document.querySelector("#total-utility-bill");
  const totalRecurringSubscription = document.querySelector(
    "#total-subscription"
  );
  const totalExpenseInitial = document.querySelector("#total_input-1");

  // Get values and convert to numbers
  const value1 = parseFloat(totalUtilityBill.value) || 0; // Default to 0 if empty
  const value2 = parseFloat(totalRecurringSubscription.value) || 0;

  // Add them together
  const sum = value1 + value2;

  // Display the result
  totalExpenseInitial.value = sum;
}

document
  .querySelector("#total-utility-bill")
  .addEventListener("input", addExpenseTotal);

document
  .querySelector("#total-subscription")
  .addEventListener("input", addExpenseTotal);

function balance() {
  const salary = document.querySelector("#salary-input-2");
  const totalExpenseFinal = document.querySelector("#total-expense-input");
  //const salaryBalanceInitial = document.querySelector("#balance_input");

  // Get values and convert to numbers
  const value1 = parseFloat(salary.value) || 0; // Default to 0 if empty
  const value2 = parseFloat(totalExpenseFinal.value) || 0;

  // Add them together
  const sum = value1 - value2;

  // Display the result
  salaryBalanceInitial.value = sum;

  balanceTrack();
}

document.querySelector("#salary-input-2").addEventListener("input", balance);

document
  .querySelector("#total-expense-input")
  .addEventListener("input", balance);

function balanceTrack() {
  const expenses = document.querySelector("#tracking-input");

  // Get values and convert to numbers
  const values1 = parseFloat(expenses.value) || 0; // Default to 0 if empty
  const values2 = parseFloat(salaryBalanceInitial.value) || 0;

  // Add them together
  const sums = values2 - values1;

  // Display the result
  salaryBalanceFinal.value = sums;
}

document
  .querySelector("#tracking-input, #balance_input")
  .addEventListener("input", balanceTrack);

initialBills.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

initialRecurringBill.forEach(function (item) {
  const cardElements = getCardElements(item);
  cardLists.append(cardElements);
});

initialAdditionalBills.forEach(function (item) {
  const cardElement1 = getCardElement1(item);
  cardsList1.append(cardElement1);
});
