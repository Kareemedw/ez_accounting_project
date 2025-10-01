# EZ-Accounting (Mobile Wallet & Budgeting App)

A simple web-based personal finance tracker that allows users to manage salary, mandatory bills, recurring subscriptions, and additional expenses. The application calculates total expenditures, salary balance, and tracks spending in real time.

🚀 Features

Salary Input: Enter monthly salary details.

Utility Bills: Add and track expenses such as mortgage/rent, electricity, water, gas, WiFi/phone, and groceries.

Recurring Subscriptions: Manage recurring bills like Netflix, Hulu, etc.

Dynamic Expense Management: Add and remove expenses dynamically using templates.

Automatic Calculations:

Total mandatory bills

Total recurring subscriptions

Combined expenditure

Salary balance after deductions

Expense tracking for additional costs

Interactive UI: Inline forms, delete buttons, and balance tracking inputs.

🛠️ Tech Stack

HTML5 – Structure of the app

CSS3 – Styling (via index.css)

Vanilla JavaScript (ES6) – Core logic (via index.js)

📂 Project Structure
.
├── index.html # Main HTML file (UI & structure)
├── pages/
│ └── index.css # Stylesheet for layout and components
├── scripts/
│ └── index.js # JavaScript logic for calculations & interactivity
└── README.md # Project documentation

⚡ How It Works

Enter Salary – Add monthly salary in the Salary section.

Add Bills & Subscriptions – Use input fields to create expense items dynamically.

Automatic Totals – The app automatically updates total expenditures.

Salary Balance – Displays remaining salary after all deductions.

Expense Tracking – Lets you track additional expenses beyond mandatory bills.

📊 Example Flow

Input salary → $5000

Add utility bills → Electricity $200, Water $100

Add subscriptions → Netflix $15, Hulu $10

Total expenditure auto-calculated → $325

Salary balance auto-calculated → $4675

Track extra expenses (e.g., Uber $50) → New balance updates instantly.

🧩 Key JavaScript Functions

calculateTotal() → Sums all utility bills & subscriptions

addExpenseTotal() → Adds utility & subscription totals together

balance() → Calculates salary minus total expenses

calculateTotalBalance() → Subtracts additional expenses from salary balance

balanceTrack() → Updates the final tracking balance

✅ Future Improvements

Add local storage to persist data across sessions.

Implement data visualization with charts (expenses vs income).

Add authentication for multiple users.

Export reports to CSV / PDF.

👤 Author

Kareem Edwards – Software Engineer
📧 Contact: (add email/github/portfolio link here)
