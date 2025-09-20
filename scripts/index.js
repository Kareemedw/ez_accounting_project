/*const initialBills = [
  {
    name: "Electric",
    price: "$385.00",
  },
  {
    name: "water",
    price: "$72.00",
  },
  {
    name: "Gas/Heat",
    price: "$75.00",
  },
  {
    name: "Wifi/Phone",
    price: "$150.00",
  },
  {
    name: "Grocery",
    price: "$800.00",
  },
];

const initialRecurringBill = [
  {
    name: "Netflix",
    price: "$25.00",
  },
  {
    name: "Hulu",
    price: "$43.00",
  },
];*/

const salaryForm = document.querySelector("#card-form-salary");
const salaryInputInitial = document.querySelector("#salary-input-1");
const salaryBalanceForm = document.querySelector("#salary-balance");
const salarInputFinal = document.querySelector("#salary-input-2");
const totalExpenseForm = document.querySelector("#total-expense");
const totalExpenseInitial = document.querySelector("#total_input-1");
const totalExpenseFinal = document.querySelector("#total-expense-input");
const balanceTracking = document.querySelector("#balance-tracking");
const salaryBalanceInitial = document.querySelector("#balance_input");
const salaryBalanceFinal = document.querySelector("#tracking-input");
const totalUtilityBill = document.querySelector("#total-utility-bill");
const totalRecurringSubscription = document.querySelector(
  "#total-subscription"
);

salaryBalanceInitial.addEventListener("input", function () {
  salaryBalanceFinal.value = salaryBalanceInitial.value;
});

salaryInputInitial.addEventListener("input", function () {
  salarInputFinal.value = salaryInputInitial.value;
});

totalExpenseInitial.addEventListener("input", function () {
  totalExpenseFinal.value = totalExpenseInitial.value;
});

salaryBalanceInitial.addEventListener("input", function () {
  salaryBalanceFinal.value = salaryBalanceInitial.value;
});

function calculateTotal() {
  const billsInput = document.querySelectorAll("#bills-input");
  const recurringSubscription = document.querySelectorAll(
    "#subscription_input"
  );
  const totalUtilityBill = document.querySelector("#total-utility-bill");
  const totalRecurringSubscription = document.querySelector(
    "#total-subscription"
  );
  const totalExpenseInitial = document.querySelector("#total_input-1");

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

// Listen to changes on all inputs
document
  .querySelectorAll("#bills-input, #subscription_input")
  .forEach((input) => {
    input.addEventListener("input", calculateTotal);
  });

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
  const salaryBalanceFinal = document.querySelector("#balance_input");

  // Get values and convert to numbers
  const value1 = parseFloat(salary.value) || 0; // Default to 0 if empty
  const value2 = parseFloat(totalExpenseFinal.value) || 0;

  // Add them together
  const sum = value1 - value2;

  // Display the result
  salaryBalanceFinal.value = sum;
}

document.querySelector("#salary-input-2").addEventListener("input", balance);

document
  .querySelector("#total-expense-input")
  .addEventListener("input", balance);
