import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const transactions = [
  { icon: '🍔', title: 'Lunch', category: 'Food', date: 'Today', amount: '4.50', income: false },
  { icon: '🚗', title: 'Grab', category: 'Transport', date: 'Today', amount: '3.25', income: false },
  { icon: '☕', title: 'Coffee', category: 'Food', date: 'Yesterday', amount: '2.00', income: false },
  { icon: '💼', title: 'Salary', category: 'Income', date: 'Aug 18', amount: '250.00', income: true },
  { icon: '📈', title: 'Trading Profit', category: 'Trading', date: 'Aug 17', amount: '30.00', income: true },
];

function Transaction({ icon, title, category, date, amount, income }) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={[styles.iconBox, { backgroundColor: income ? '#E8F8EF' : '#FFF0F2' }]}>
          <Text>{icon}</Text>
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.meta}>{category} • {date}</Text>
        </View>
      </View>
      <Text style={[styles.amount, { color: income ? '#22A05A' : '#E0445A' }]}>
        {income ? '+' : '-'}${amount}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.name}>SpendWise</Text>
          </View>
          <TouchableOpacity style={styles.bell}>
            <Text>🔔</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.label}>Total Balance</Text>
            <Text style={styles.balance}>$1,403.25</Text>
          </View>
          <View style={styles.badge}><Text style={styles.badgeText}>$</Text></View>
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.plus}>＋</Text>
          <Text style={styles.buttonText}>Add New Transaction</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.headText}>Monthly Overview</Text>
          <Text style={styles.smallText}>August 2026</Text>
        </View>

        <View style={styles.overviewRow}>
          <View style={[styles.overviewCard, { backgroundColor: '#F0FAF5' }]}>
            <View style={[styles.overviewIcon, { backgroundColor: '#35B96F' }]}>
              <Text style={styles.overviewText}>↗</Text>
            </View>
            <Text style={styles.overviewTitle}>Income</Text>
            <Text style={styles.overviewAmount}>$280.00</Text>
            <Text style={styles.overviewMeta}>This month</Text>
          </View>

          <View style={[styles.overviewCard, { backgroundColor: '#FFF3F5' }]}>
            <View style={[styles.overviewIcon, { backgroundColor: '#EF5268' }]}>
              <Text style={styles.overviewText}>↘</Text>
            </View>
            <Text style={styles.overviewTitle}>Expenses</Text>
            <Text style={styles.overviewAmount}>$42.50</Text>
            <Text style={styles.overviewMeta}>This month</Text>
          </View>
        </View>

        <View style={styles.budgetBox}>
          <View style={styles.budgetRow}>
            <View>
              <Text style={styles.budgetTitle}>Monthly Budget</Text>
              <Text style={styles.smallText}>$157.50 remaining</Text>
            </View>
            <Text style={styles.percent}>79%</Text>
          </View>
          <View style={styles.progressBg}><View style={styles.progress} /></View>
          <Text style={styles.smallText}>You have spent $42.50 of your monthly budget.</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.headText}>Recent Transactions</Text>
          <Text style={styles.link}>View All</Text>
        </View>

        <View style={styles.listBox}>
          {transactions.map((item) => (
            <Transaction key={`${item.title}-${item.date}`} {...item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FC' },
  content: { padding: 20, paddingTop: 50, paddingBottom: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  welcome: { fontSize: 15, color: '#777B91' },
  name: { fontSize: 28, fontWeight: '800', color: '#171A2B' },
  bell: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  label: { color: '#777B91', fontSize: 14, marginBottom: 8 },
  balance: { fontSize: 32, fontWeight: '800', color: '#171A2B' },
  badge: { width: 54, height: 54, borderRadius: 18, backgroundColor: '#EAE7FF', justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#5146E5', fontSize: 24, fontWeight: '800' },
  primaryButton: { backgroundColor: '#5146E5', borderRadius: 18, height: 58, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 26 },
  plus: { color: '#fff', fontSize: 25, marginRight: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headText: { fontSize: 19, fontWeight: '800', color: '#191C2C' },
  smallText: { fontSize: 12, color: '#85889A' },
  link: { color: '#5146E5', fontSize: 13, fontWeight: '700' },
  overviewRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  overviewCard: { width: '48%', borderRadius: 20, padding: 16 },
  overviewIcon: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  overviewText: { color: '#fff', fontSize: 20, fontWeight: '800' },
  overviewTitle: { fontSize: 13, color: '#777B91', marginBottom: 4 },
  overviewAmount: { fontSize: 21, fontWeight: '800', color: '#202333' },
  overviewMeta: { fontSize: 11, color: '#9295A5', marginTop: 3 },
  budgetBox: { backgroundColor: '#fff', borderRadius: 20, padding: 18, marginBottom: 24 },
  budgetRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  budgetTitle: { fontSize: 15, fontWeight: '700', color: '#25283A' },
  percent: { fontSize: 16, fontWeight: '800', color: '#5146E5' },
  progressBg: { height: 8, backgroundColor: '#E9E8F2', borderRadius: 10, overflow: 'hidden', marginVertical: 14 },
  progress: { width: '79%', height: '100%', backgroundColor: '#5146E5', borderRadius: 10 },
  listBox: { backgroundColor: '#fff', borderRadius: 22, paddingHorizontal: 16 },
  row: { minHeight: 72, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F0F5' },
  left: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 42, height: 42, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  title: { fontSize: 14, fontWeight: '700', color: '#25283A', marginBottom: 4 },
  meta: { fontSize: 11, color: '#85889A' },
  amount: { fontSize: 14, fontWeight: '800' },
});