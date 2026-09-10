import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TotalCard({ label, amount }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryAmount}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#f4f6f5',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryAmount: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 6,
  },
});
