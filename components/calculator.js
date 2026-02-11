// calculator.js
export default class Calculator {
  constructor({
    root, // container element (budget card body or the whole card)
    selectors = {},
    onChange = null, // optional callback after each recalculation
  }) {
    if (!root) throw new Error("Calculator: root is required");

    this._root = root;
    this._onChange = onChange;

    // default selectors (override if your classes/ids change)
    this._selectors = {
      billsInputs: ".bills-input",
      subscriptionInputs: ".subscription-input",
      balanceInputs: ".balance-input1",

      totalUtilityBill: '[data-role="total-utility-bill"]',
      totalRecurringSubscription: '[data-role="total-subscription"]',
      totalExpenseInitial: '[data-role="total_input-1"]',
      totalExpenseFinal: '[data-role="total-expense-input"]',

      salaryFinal: '[data-role="salary-input-2"]',
      salaryBalanceInitial: '[data-role="balance_input"]',
      otherExpenses: '[data-role="tracking-input"]',
      salaryBalanceFinal: '[data-role="tracking-inputs"]',
      ...selectors,
    };

    // cache outputs (queried once)
    this.$totalUtilityBill = this._root.querySelector(
      this._selectors.totalUtilityBill,
    );
    this.$totalRecurringSubscription = this._root.querySelector(
      this._selectors.totalRecurringSubscription,
    );
    this.$totalExpenseInitial = this._root.querySelector(
      this._selectors.totalExpenseInitial,
    );
    this.$totalExpenseFinal = this._root.querySelector(
      this._selectors.totalExpenseFinal,
    );

    this.$salaryFinal = this._root.querySelector(this._selectors.salaryFinal);
    this.$salaryBalanceInitial = this._root.querySelector(
      this._selectors.salaryBalanceInitial,
    );

    this.$otherExpenses = this._root.querySelector(
      this._selectors.otherExpenses,
    );
    this.$salaryBalanceFinal = this._root.querySelector(
      this._selectors.salaryBalanceFinal,
    );
  }

  // ---- helpers ----
  num(value) {
    return parseFloat(value) || 0;
  }

  // ---- calculations ----
  _calculateTotals() {
    const billsInputs = this._root.querySelectorAll(
      this._selectors.billsInputs,
    );
    const subscriptionInputs = this._root.querySelectorAll(
      this._selectors.subscriptionInputs,
    );

    let section1Total = 0;
    let section2Total = 0;

    billsInputs.forEach((input) => (section1Total += this.num(input.value)));
    subscriptionInputs.forEach(
      (input) => (section2Total += this.num(input.value)),
    );

    if (this.$totalUtilityBill) this.$totalUtilityBill.value = section1Total;
    if (this.$totalRecurringSubscription)
      this.$totalRecurringSubscription.value = section2Total;

    const grandTotal = section1Total + section2Total;

    if (this.$totalExpenseInitial) this.$totalExpenseInitial.value = grandTotal;
    if (this.$totalExpenseFinal) this.$totalExpenseFinal.value = grandTotal;

    // chain
    this._balance();

    this._onChange?.();
  }

  _balance() {
    const salary = this.num(this.$salaryFinal?.value);
    const totalExpense = this.num(this.$totalExpenseFinal?.value);

    const sum = salary - totalExpense;

    if (this.$salaryBalanceInitial) this.$salaryBalanceInitial.value = sum;

    this._balanceTrack();
  }

  _balanceTrack() {
    const expenses = this.num(this.$otherExpenses?.value);
    const salaryBalance = this.num(this.$salaryBalanceInitial?.value);

    const result = salaryBalance - expenses;

    if (this.$salaryBalanceFinal) this.$salaryBalanceFinal.value = result;
  }

  _calculateTotalBalance() {
    // your "additional expenses after bills" tracker
    const balanceInputs = this._root.querySelectorAll(
      this._selectors.balanceInputs,
    );

    const initialBalance =
      this.num(this.$otherExpenses?.dataset?.initialValue) || 0;

    let remainingBalance = initialBalance;

    balanceInputs.forEach((input) => {
      const value = parseFloat(input.value);
      if (!isNaN(value) && input.value.trim() !== "") {
        remainingBalance += value; // (you were adding, not subtracting)
      }
    });

    if (this.$otherExpenses) this.$otherExpenses.value = remainingBalance;

    this._balanceTrack();
    this._onChange?.();
  }

  // ---- wiring ----
  bind() {
    // Event delegation: listen once, recalc when relevant inputs change
    this._root.addEventListener("input", (e) => {
      const t = e.target;
      if (t.matches('[data-role="salary-input-1"]')) {
        const finalSalary = this._root.querySelector(
          '[data-role="salary-input-2"]',
        );
        if (finalSalary) finalSalary.value = t.value;
      }

      if (
        t.matches(this._selectors.billsInputs) ||
        t.matches(this._selectors.subscriptionInputs) ||
        t.matches(this._selectors.totalUtilityBill) ||
        t.matches(this._selectors.totalRecurringSubscription)
      ) {
        this._calculateTotals();
      }
      if (
        t.matches(this._selectors.salaryFinal) ||
        t.matches(this._selectors.totalExpenseFinal)
      ) {
        this._balance();
      }

      if (t.matches(this._selectors.otherExpenses)) {
        this._balanceTrack();
      }

      if (t.matches(this._selectors.balanceInputs)) {
        this._calculateTotalBalance();
      }
    });

    // do an initial compute
    this._calculateTotals();
    this._calculateTotalBalance();
  }
}
