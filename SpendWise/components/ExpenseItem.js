import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ExpenseItem({ name, category, amount, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View details for ${name}`}
      onPress={onPress}
      style={({ pressed }) => [styles.expenseItem, pressed && styles.pressed]}
    >
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <Text style={styles.amount}>-${amount.toFixed(2)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: { alignItems: "center", backgroundColor: "#f1f3f5", borderRadius: 12, flexDirection: "row", justifyContent: "space-between", marginBottom: 10, padding: 16 },
  pressed: { opacity: 0.6 },
  name: { fontSize: 17, fontWeight: "600" },
  category: { color: "#667085", marginTop: 4 },
  amount: { fontSize: 16, fontWeight: "600" },
});
