import React from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ExpenseDetailScreen({ navigation, route, expenses, onDeleteExpense, onUpdateExpense }) {
  const { expenseId } = route.params;
  const expense = expenses.find((item) => item.id === expenseId);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState("");
  const [editedCategory, setEditedCategory] = React.useState("");
  const [editedAmount, setEditedAmount] = React.useState("");
  const [error, setError] = React.useState("");

  if (!expense) {
    return <View style={styles.notFound}><Text style={styles.notFoundText}>Expense not found.</Text></View>;
  }

  function handleEdit() {
    setEditedName(expense.name);
    setEditedCategory(expense.category);
    setEditedAmount(expense.amount.toString());
    setError("");
    setIsEditing(true);
  }

  function handleSave() {
    const trimmedName = editedName.trim();
    const trimmedCategory = editedCategory.trim();
    const parsedAmount = Number.parseFloat(editedAmount);

    if (!trimmedName || !trimmedCategory || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Enter a name, category, and an amount greater than 0.");
      return;
    }

    onUpdateExpense(expense.id, { name: trimmedName, category: trimmedCategory, amount: parsedAmount });
    setError("");
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedName(expense.name);
    setEditedCategory(expense.category);
    setEditedAmount(expense.amount.toString());
    setError("");
    setIsEditing(false);
  }

  function handleDelete() {
    Alert.alert("Delete Expense", `Are you sure you want to delete "${expense.name}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => { onDeleteExpense(expense.id); navigation.goBack(); } },
    ]);
  }

  if (isEditing) {
    return (
      <View style={styles.screen}>
        <View style={styles.content}>
          <Text style={styles.label}>Expense Name</Text>
          <TextInput style={styles.input} value={editedName} onChangeText={(value) => { setEditedName(value); setError(""); }} placeholder="Expense name" />
          <Text style={styles.label}>Category</Text>
          <TextInput style={styles.input} value={editedCategory} onChangeText={(value) => { setEditedCategory(value); setError(""); }} placeholder="Category" />
          <Text style={styles.label}>Amount</Text>
          <TextInput style={styles.input} value={editedAmount} onChangeText={(value) => { setEditedAmount(value); setError(""); }} keyboardType="decimal-pad" placeholder="Amount" />
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
        <View style={styles.footer}>
          <Pressable style={[styles.footerButton, styles.saveButton]} onPress={handleSave}><Text style={styles.saveButtonText}>Save</Text></Pressable>
          <Pressable style={[styles.footerButton, styles.cancelButton]} onPress={handleCancel}><Text style={styles.cancelButtonText}>Cancel</Text></Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>{expense.name}</Text>
        <Text style={styles.amount}>-${expense.amount.toFixed(2)}</Text>
        <Text style={styles.category}>{expense.category}</Text>
      </View>
      <View style={styles.footer}>
        <Pressable style={[styles.footerButton, styles.editButton]} onPress={handleEdit} accessibilityRole="button" accessibilityLabel={`Edit ${expense.name}`}><Text style={styles.editButtonText}>Edit</Text></Pressable>
        <Pressable style={[styles.footerButton, styles.deleteButton]} onPress={handleDelete} accessibilityRole="button" accessibilityLabel={`Delete ${expense.name}`}><Text style={styles.deleteButtonText}>Delete</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20 },
  content: { flex: 1 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 12 },
  amount: { fontSize: 24, fontWeight: "600", marginBottom: 8 },
  category: { color: "#667085", fontSize: 17 },
  label: { fontWeight: "600", marginBottom: 6, marginTop: 12 },
  input: { borderColor: "#b8bec7", borderRadius: 8, borderWidth: 1, fontSize: 16, padding: 12 },
  error: { color: "#c62828", marginTop: 12 },
  footer: { flexDirection: "row", gap: 12, paddingTop: 12 },
  footerButton: { alignItems: "center", borderRadius: 10, flex: 1, justifyContent: "center", minHeight: 50 },
  editButton: { backgroundColor: "#e9ecef" },
  deleteButton: { backgroundColor: "#ffe3e3" },
  saveButton: { backgroundColor: "#e9ecef" },
  cancelButton: { backgroundColor: "#f1f3f5" },
  editButtonText: { fontSize: 16, fontWeight: "600" },
  deleteButtonText: { fontSize: 16, fontWeight: "600" },
  saveButtonText: { fontSize: 16, fontWeight: "600" },
  cancelButtonText: { fontSize: 16, fontWeight: "600" },
  notFound: { alignItems: "center", flex: 1, justifyContent: "center" },
  notFoundText: { fontSize: 18 },
});
