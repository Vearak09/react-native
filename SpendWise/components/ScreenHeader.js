import { View, Text, StyleSheet } from 'react-native';

export default function ScreenHeader() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.appName}>SpendWise</Text>
        <Text style={styles.greeting}>Good morning!</Text>
      </View>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>VP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});