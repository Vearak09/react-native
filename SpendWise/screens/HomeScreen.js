import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpenseItem from "../components/ExpenseItem";

export default function HomeScreen({ navigation, expenses }) {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>SpendWise</Text>
      <Text style={styles.subtitle}>Track your expenses</Text>
      <FlatList
        style={styles.list}
        data={expenses}
        keyExtractor={(expense) => expense.id}
        renderItem={({ item }) => (
          <ExpenseItem
            name={item.name}
            category={item.category}
            amount={item.amount}
            onPress={() => navigation.navigate("ExpenseDetail", { expenseId: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No expenses yet.</Text>}
      />
      <View style={styles.buttonContainer}>
        <Button title="+ Add Expense" onPress={() => navigation.navigate("AddExpense")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "700" },
  subtitle: { color: "#667085", fontSize: 15, marginBottom: 20, marginTop: 4 },
  list: { flex: 1 },
  empty: { color: "#667085", marginTop: 30, textAlign: "center" },
  buttonContainer: { marginTop: 10 },
});
