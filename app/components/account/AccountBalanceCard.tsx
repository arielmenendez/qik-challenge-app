import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  accountNumber: string;
  balance?: number;
  loading: boolean;
  error: boolean;
}

const AccountBalanceCard = ({
  accountNumber,
  balance,
  loading,
  error,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuenta: {accountNumber}</Text>

      {loading && <ActivityIndicator size="small" />}

      {error && <Text style={styles.error}>No se pudo cargar el saldo</Text>}

      {!loading && !error && (
        <Text style={styles.balance}>Saldo actual: ${balance?.toFixed(2)}</Text>
      )}
    </View>
  );
};

export default AccountBalanceCard;

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  balance: {
    fontSize: 16,
  },
  error: {
    color: 'red',
  },
});
