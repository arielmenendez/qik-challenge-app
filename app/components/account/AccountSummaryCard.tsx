import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { AccountSummary } from '../../graphql/accounts/types';

interface Props {
  summary?: AccountSummary;
  loading: boolean;
  error: boolean;
}

const AccountSummaryCard = ({ summary, loading, error }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Resumen de la cuenta</Text>

      {loading && <ActivityIndicator size="small" />}

      {error && <Text style={styles.error}>No se pudo cargar el resumen</Text>}

      {!loading && !error && summary && (
        <View style={styles.content}>
          <Text>Balance actual: ${summary.balance.toFixed(2)}</Text>
          <Text>Total ingresos: ${summary.totalCredits.toFixed(2)}</Text>
          <Text>Total egresos: ${summary.totalDebits.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
};

export default AccountSummaryCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  content: {
    gap: 2,
  },
  error: {
    color: 'red',
  },
});
