import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddExpenseScreen({ navigation, onAddExpense }) {
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [error, setError] = React.useState("");

  function updateName(value) { setName(value); setError(""); }
  function updateCategory(value) { setCategory(value); setError(""); }
  function updateAmount(value) { setAmount(value); setError(""); }

  function handleSubmit() {
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();
    const parsedAmount = Number.parseFloat(amount);

    if (!trimmedName || !trimmedCategory || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Enter a name, category, and an amount greater than 0.");
      return;
    }

    onAddExpense(trimmedName, trimmedCategory, parsedAmount);
    navigation.goBack();
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Expense Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={updateName} placeholder="Example: Coffee" />
      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={updateCategory} placeholder="Example: Food" />
      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} value={amount} onChangeText={updateAmount} placeholder="Example: 3.50" keyboardType="decimal-pad" />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Save Expense" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, gap: 10, padding: 20 },
  label: { fontWeight: "600", marginTop: 8 },
  input: { borderColor: "#b8bec7", borderRadius: 8, borderWidth: 1, fontSize: 16, padding: 12 },
  error: { color: "#c62828", marginBottom: 5 },
});
