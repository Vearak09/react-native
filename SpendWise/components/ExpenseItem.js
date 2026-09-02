import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function ExpenseItem({ id, name, category, amount, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        {/* Challenge 3: Category display */}
        <Text style={styles.category}>{category}</Text> 
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.amount}>{amount}</Text>
        {/* Challenge 4: Delete button invoking callback prop */}
        <Pressable onPress={() => onDelete(id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
  },
  deleteButton: {
    marginTop: 4,
  },
  deleteText: {
    color: '#d9534f',
    fontSize: 12,
  },
});