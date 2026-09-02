# Lab 4 — Refactor SpendWise into Reusable Components

**ICT 304 · Mobile App Cross-platform Development II**  
**Session 4 · Core React Native Components & Modular UI**  
**Duration:** 60 minutes  
**Work:** Individual

---

## Lab Goal

You are given a working SpendWise screen where most of the UI is written directly inside `App.js`.

Your task is to refactor the screen into smaller, reusable UI components.

By the end of this lab, your project should include:

```text
SpendWise/
├── App.js
└── components/
    ├── ScreenHeader.js
    ├── TotalCard.js
    └── ExpenseItem.js
```

Your final `App.js` should focus on **assembling the screen**, rather than containing all of the detailed JSX.

---

## Starting Point

Use the base code provided by your lecturer.

Before changing anything:

1. Run the app.
2. Confirm the SpendWise screen renders correctly.
3. Read through `App.js`.
4. Identify repeated or meaningful sections of the interface.

Do not redesign the screen yet.

Your job is to improve the **code structure** while keeping the visible result approximately the same.

---

# Task 1 — Identify Component Boundaries

Look at the existing `App.js`.

Identify which JSX belongs to:

### `ScreenHeader`

```text
SpendWise
Good morning!
Avatar
```

### `TotalCard`

```text
Spent this month
$342.50
```

The same structure is also used for:

```text
Budget left
$157.50
```

and:

```text
Daily average
$11.42
```

### `ExpenseItem`

```text
Lunch
Food
-$4.50
```

The same structure is repeated for several expenses.

Before coding, your component tree should look roughly like:

```text
App
│
├── ScreenHeader
│
├── TotalCard
├── TotalCard
├── TotalCard
│
├── ExpenseItem
├── ExpenseItem
├── ExpenseItem
└── ExpenseItem
```

---

# Task 2 — Create the `components` Folder

Inside your project, create:

```text
components/
```

Your project should now look like:

```text
SpendWise/
├── App.js
├── components/
├── assets/
├── app.json
└── package.json
```

Inside `components/`, create:

```text
ScreenHeader.js
TotalCard.js
ExpenseItem.js
```

---

# Task 3 — Build `ScreenHeader`

Move the header UI from `App.js` into:

```text
components/ScreenHeader.js
```

Your component should contain:

- the SpendWise app name;
- the greeting;
- the avatar.

Start with:

```jsx
import { View, Text, StyleSheet } from 'react-native';

export default function ScreenHeader() {
  return (
    <View>
      {/* Move the header JSX here */}
    </View>
  );
}
```

Move the relevant header styles into the same file.

Your `ScreenHeader.js` should be responsible for its own styling.

Then import it into `App.js`:

```jsx
import ScreenHeader from './components/ScreenHeader';
```

Use it:

```jsx
<ScreenHeader />
```

### Checkpoint 1

The header should still look approximately the same as before.

Your `App.js` should no longer contain the detailed header JSX.

---

# Task 4 — Build `TotalCard`

The Monthly Summary currently repeats this structure:

```jsx
<View style={styles.summaryCard}>
  <Text style={styles.summaryLabel}>
    Spent this month
  </Text>

  <Text style={styles.summaryAmount}>
    $342.50
  </Text>
</View>
```

Create:

```text
components/TotalCard.js
```

The component should receive:

```text
label
amount
```

as props.

Start with:

```jsx
import { View, Text, StyleSheet } from 'react-native';

export default function TotalCard({ label, amount }) {
  return (
    <View>
      {/* Build the card here */}
    </View>
  );
}
```

Inside the component, use:

```jsx
{label}
```

and:

```jsx
{amount}
```

instead of hardcoding the text.

Move the summary-card styles from `App.js` into `TotalCard.js`.

---

## Use `TotalCard` in `App.js`

Import it:

```jsx
import TotalCard from './components/TotalCard';
```

Replace the three repeated summary-card blocks with:

```jsx
<TotalCard
  label="Spent this month"
  amount="$342.50"
/>

<TotalCard
  label="Budget left"
  amount="$157.50"
/>

<TotalCard
  label="Daily average"
  amount="$11.42"
/>
```

### Checkpoint 2

Your Monthly Summary should still show all three values.

But now all three use the **same component**.

---

## Challenge 1 — Add One More Card

Add another summary card without copying the original JSX.

Choose one:

```text
Savings
$75.00
```

or:

```text
Income
$500.00
```

or create your own.

You should only need another:

```jsx
<TotalCard ... />
```

---

# Task 5 — Build `ExpenseItem`

Now look at the Recent Expenses section.

The same structure is repeated several times:

```jsx
<View style={styles.expenseItem}>
  <View>
    <Text style={styles.expenseName}>Lunch</Text>
    <Text style={styles.expenseCategory}>Food</Text>
  </View>

  <Text style={styles.expenseAmount}>-$4.50</Text>
</View>
```

Create:

```text
components/ExpenseItem.js
```

Your component should receive:

```text
name
category
amount
```

as props.

Start with:

```jsx
import { View, Text, StyleSheet } from 'react-native';

export default function ExpenseItem({
  name,
  category,
  amount,
}) {
  return (
    <View>
      {/* Build the expense row here */}
    </View>
  );
}
```

Use:

```jsx
{name}
```

```jsx
{category}
```

```jsx
{amount}
```

inside your JSX.

Move the related styles into `ExpenseItem.js`.

---

# Task 6 — Replace the Repeated Expense JSX

Import your new component into `App.js`:

```jsx
import ExpenseItem from './components/ExpenseItem';
```

Replace the repeated expense blocks with:

```jsx
<ExpenseItem
  name="Lunch"
  category="Food"
  amount="-$4.50"
/>

<ExpenseItem
  name="Grab"
  category="Transport"
  amount="-$3.25"
/>

<ExpenseItem
  name="Coffee"
  category="Food"
  amount="-$2.00"
/>

<ExpenseItem
  name="Mobile Data"
  category="Utilities"
  amount="-$5.00"
/>
```

### Checkpoint 3

The Recent Expenses section should look approximately the same as before.

Your `App.js` should no longer contain the detailed `expenseItem` layout.

---

## Challenge 2 — Add Your Own Expense

Add one new expense using `ExpenseItem`.

Choose your own:

- name;
- category;
- amount.

For example:

```jsx
<ExpenseItem
  name="Books"
  category="Education"
  amount="-$12.00"
/>
```

Do not copy this example exactly.

---

# Task 7 — Refactor `App.js`

At this point, review `App.js`.

It should now be much easier to read.

The main UI should look closer to:

```jsx
<ScrollView style={styles.screen}>
  <View style={styles.container}>
    <ScreenHeader />

    <Text style={styles.sectionTitle}>
      Monthly Summary
    </Text>

    <TotalCard ... />
    <TotalCard ... />
    <TotalCard ... />

    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        Recent Expenses
      </Text>

      <Text style={styles.seeAll}>
        See All
      </Text>
    </View>

    <ExpenseItem ... />
    <ExpenseItem ... />
    <ExpenseItem ... />
    <ExpenseItem ... />

    {/* Quick Add Expense remains here */}
  </View>
</ScrollView>
```

You do not need to extract every part of the screen.

The goal is to identify **meaningful UI units**, not to create a component for every `Text` or `View`.

---

# Task 8 — Keep Component Styles with the Component

Review your `StyleSheet` in `App.js`.

Styles that belong only to:

```text
ScreenHeader
```

should live in:

```text
ScreenHeader.js
```

Styles that belong only to:

```text
TotalCard
```

should live in:

```text
TotalCard.js
```

Styles that belong only to:

```text
ExpenseItem
```

should live in:

```text
ExpenseItem.js
```

`App.js` should keep only styles that belong to the overall screen, such as:

```text
screen
container
sectionHeader
sectionTitle
seeAll
input
inputLabel
addButton
addButtonText
footerText
```

---

# Challenge 3 — Render Expenses from an Array

Your current code still repeats:

```jsx
<ExpenseItem ... />
<ExpenseItem ... />
<ExpenseItem ... />
```

Let's make the data easier to manage.

Above `App`, create:

```javascript
const expenses = [
  {
    id: '1',
    name: 'Lunch',
    category: 'Food',
    amount: '-$4.50',
  },
  {
    id: '2',
    name: 'Grab',
    category: 'Transport',
    amount: '-$3.25',
  },
  {
    id: '3',
    name: 'Coffee',
    category: 'Food',
    amount: '-$2.00',
  },
  {
    id: '4',
    name: 'Mobile Data',
    category: 'Utilities',
    amount: '-$5.00',
  },
];
```

Then replace the repeated `ExpenseItem` components with:

```jsx
{expenses.map((expense) => (
  <ExpenseItem
    key={expense.id}
    name={expense.name}
    category={expense.category}
    amount={expense.amount}
  />
))}
```

### What happened?

```text
expenses array
      ↓
    .map()
      ↓
one ExpenseItem for each object
      ↓
screen
```

`key` gives React a unique identity for each row:

```jsx
key={expense.id}
```

---

# Challenge 4 — Add Another Expense to the Array

Do not add another `<ExpenseItem />`.

Instead, add another object to:

```javascript
expenses
```

For example:

```javascript
{
  id: '5',
  name: 'Books',
  category: 'Education',
  amount: '-$12.00',
}
```

Save the file.

Your new expense should appear automatically because `.map()` turns every object in the array into an `ExpenseItem`.

---

# Final Project Structure

By the end of the lab, your project should look approximately like:

```text
SpendWise/
├── App.js
│
├── components/
│   ├── ScreenHeader.js
│   ├── TotalCard.js
│   └── ExpenseItem.js
│
├── assets/
├── app.json
└── package.json
```

---

# Final Check

Before submitting, confirm:

- [ ] The app still runs without errors.
- [ ] `ScreenHeader` is in its own file.
- [ ] `TotalCard` is in its own file.
- [ ] `ExpenseItem` is in its own file.
- [ ] `TotalCard` uses props.
- [ ] `ExpenseItem` uses props.
- [ ] Repeated expense data is stored in an array.
- [ ] `.map()` renders the expense rows.
- [ ] Each rendered expense has a unique `key`.
- [ ] Component-specific styles have been moved out of `App.js`.
- [ ] The final screen still looks approximately like the original SpendWise screen.

---

# What to Submit

Submit:

1. **One screenshot** of the completed SpendWise screen.
2. Your project source code according to the lecturer's submission instructions.

Before submitting, make sure your project runs successfully.

You should also be able to explain:

1. Why did we create `TotalCard` instead of keeping three repeated `View` blocks?
2. What do props allow us to change?
3. Why is `ExpenseItem` reusable?
4. What does `.map()` do?
5. Why does each rendered row need a `key`?
6. Why is the new `App.js` easier to read than the original version?