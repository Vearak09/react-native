import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';


export default function ExpenseForm({ onAddExpense }) {

  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Other');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addExpense = () => {
    const trimmedName = expenseName.trim();
    const trimmedAmount = expenseAmount.trim();

    setError('');
    setSuccess('');

    // 1. Validations
    if (!trimmedName || !trimmedAmount) {
      setError('Please fill in both name and amount fields.');
      return;
    }

    if (!isNaN(trimmedName)) {
      setError('Expense name must contain letters, not just numbers.');
      return;
    }

    const parsedAmount = parseFloat(trimmedAmount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid positive number for amount.');
      return;
    }

    // 2. Add to list
    onAddExpense(trimmedName, expenseCategory, parsedAmount);

    setExpenseName('');
    setExpenseAmount('');
    setExpenseCategory('Other');

    // 3. Show ONLY in-page green banner (No alerts!)
    setSuccess(`Successfully added "${trimmedName}" for $${parsedAmount.toFixed(2)}!`);

    setTimeout(() => {
      setSuccess('');
    }, 4000);
  };

  return (
    <View>

      {/* ERROR MESSAGE */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      ) : null}

      {/* SUCCESS MESSAGE */}
      {success ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>✅ {success}</Text>
        </View>
      ) : null}

      <Text style={styles.inputLabel}>Expense name</Text>

      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="e.g. Lunch"
        value={expenseName}
        onChangeText={(text) => {
          setExpenseName(text);
          if (error) setError('');
        }}
      />

      <Text style={styles.inputLabel}>Amount</Text>

      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="0.00"
        keyboardType="numeric"
        value={expenseAmount}
        onChangeText={(text) => {
          setExpenseAmount(text);
          if (error) setError('');
        }}
      />

      <Pressable style={styles.addButton} onPress={addExpense}>
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </Pressable>

    </View>
  );
}


const styles = StyleSheet.create({

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

  inputError: {
    borderColor: '#cc0000',
    backgroundColor: '#fff0f0',
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

  errorContainer: {
    backgroundColor: '#ffe6e6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },

  errorText: {
    color: '#cc0000',
    fontSize: 14,
  },

  successContainer: {
    backgroundColor: '#e6f4ea',
    borderColor: '#b7e1cd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },

  successText: {
    color: '#137333',
    fontSize: 14,
    fontWeight: '500',
  },
});
