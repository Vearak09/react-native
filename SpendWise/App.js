import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';

import ScreenHeader from './components/ScreenHeader';
import TotalCard from './components/TotalCard';
import ExpenseItem from './components/ExpenseItem';

export default function App() {
  const [expenses, setExpenses] = useState([
    { id: '1', name: 'Lunch', category: 'Food', amount: '-$4.50' },
    { id: '2', name: 'Grab', category: 'Transport', amount: '-$3.25' },
    { id: '3', name: 'Coffee', category: 'Food', amount: '-$2.00' },
    { id: '4', name: 'Mobile Data', category: 'Utilities', amount: '-$5.00' },
    { id: '5', name: 'Stationery', category: 'Education', amount: '-$9.00' },
  ]);

  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Other');

  const [error, setError] = useState('');
  

  // Calculate total spending
  const total = expenses.reduce((sum, expense) => {
    return sum + parseFloat(expense.amount.replace('$', '').replace('-', ''));
  }, 0);

  console.log('Total spending:', total);

  // Delete function moved inside App component
  const handleDeleteExpense = (idToDelete) => {
    setExpenses(expenses.filter((item) => item.id !== idToDelete));
  };
  const addExpense = () => {
  // Check 1: Missing fields
  if (!expenseName.trim() || !expenseAmount.trim()) {
    setError('Please fill in both name and amount fields.');
    return;
  }

  // Check 2: Expense Name cannot be purely numeric
  if (!isNaN(expenseName.trim())) {
    setError('Expense name must contain letters, not just numbers.');
    return;
  }

  // Check 3: Amount must be a valid positive number
  const parsedAmount = parseFloat(expenseAmount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    setError('Please enter a valid positive number for amount.');
    return;
  }

  // Success path
  const newExpense = {
    id: Date.now().toString(),
    name: expenseName,
    category: expenseCategory,
    amount: `-$${parsedAmount.toFixed(2)}`,
  };

  setExpenses([newExpense, ...expenses]);
  setExpenseName('');
  setExpenseAmount('');
  setExpenseCategory('Other');
  setError(''); // Clear error on success
};

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <ScreenHeader />

        <Text style={styles.sectionTitle}>Monthly Summary</Text>

        <TotalCard label="Spent this month" amount={`$${Math.abs(total).toFixed(2)}`} />
        <TotalCard label="Budget left" amount="$157.50" />
        <TotalCard label="Daily average" amount="$11.42" />
        <TotalCard label="Savings" amount="$75.00" />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        {/* Expenses List with id and onDelete props passed down */}
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            id={expense.id}
            name={expense.name}
            category={expense.category}
            amount={expense.amount}
            onDelete={handleDeleteExpense}
          />
        ))}
        <TotalCard label="Total expenses" amount={total} />

        <Text style={styles.sectionTitle}>Quick Add Expense</Text>
            

        <Text style={styles.inputLabel}>Expense name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. Lunch"
          value={expenseName}
          onChangeText={setExpenseName}
        />

        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput 
          style={styles.input} 
          placeholder="0.00" 
          keyboardType="numeric"
          value={expenseAmount}
          onChangeText={setExpenseAmount}
        />

        <Pressable style={styles.addButton} onPress={addExpense}>
          <Text style={styles.addButtonText}>+ Add Expense</Text>
        </Pressable>

        <Text style={styles.footerText}>
          Track your spending. Build better habits.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    color: '#666',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 7,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#222222',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 28,
  },
});