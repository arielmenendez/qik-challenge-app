import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useBalanceHistory } from '../hooks/useBalanceHistory';

const AccountBalanceHistory = () => {
  const route = useRoute<any>();
  const { accountId, accountNumber } = route.params;

  const { history, loading, error } = useBalanceHistory(accountId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de balance</Text>
      <Text style={styles.subtitle}>Cuenta: {accountNumber}</Text>

      {loading && <ActivityIndicator size="small" />}

      {error && <Text>No se pudo cargar el historial</Text>}

      {!loading && !error && (
        <FlatList
          data={history}
          keyExtractor={(item) => item.transactionId}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleString()}
              </Text>
              <Text>
                {item.type === 'CREDIT' ? 'Ingreso' : 'Egreso'}: $
                {item.amount.toFixed(2)}
              </Text>
              <Text style={styles.balance}>
                Balance: ${item.balance.toFixed(2)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AccountBalanceHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 12,
  },
  item: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    marginBottom: 4,
  },
  balance: {
    fontWeight: '600',
    marginTop: 4,
  },
});
