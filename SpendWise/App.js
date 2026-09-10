import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AddExpenseScreen from "./screens/AddExpenseScreen";
import ExpenseDetailScreen from "./screens/ExpenseDetailScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [expenses, setExpenses] = React.useState([
    { id: "1", name: "Lunch", category: "Food", amount: 4.5 },
    { id: "2", name: "Grab", category: "Transport", amount: 3.25 },
    { id: "3", name: "Coffee", category: "Food", amount: 2 },
    { id: "4", name: "Mobile Data", category: "Utilities", amount: 5 },
    { id: "5", name: "Stationery", category: "Education", amount: 9 },
  ]);

  function addExpense(name, category, amount) {
    const newExpense = {
      id: Date.now().toString(),
      name,
      category,
      amount,
    };

    setExpenses((currentExpenses) => [...currentExpenses, newExpense]);
  }

  function deleteExpense(expenseId) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId)
    );
  }

  function updateExpense(expenseId, changes) {
    setExpenses((currentExpenses) =>
      currentExpenses.map((expense) =>
        expense.id === expenseId ? { ...expense, ...changes } : expense
      )
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(navigationProps) => (
              <HomeScreen {...navigationProps} expenses={expenses} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="AddExpense"
            options={{ title: "Add Expense", animation: "slide_from_bottom" }}
          >
            {(navigationProps) => (
              <AddExpenseScreen
                {...navigationProps}
                onAddExpense={addExpense}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="ExpenseDetail" options={{ title: "Expense Detail" }}>
            {(navigationProps) => (
              <ExpenseDetailScreen
                {...navigationProps}
                expenses={expenses}
                onDeleteExpense={deleteExpense}
                onUpdateExpense={updateExpense}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
