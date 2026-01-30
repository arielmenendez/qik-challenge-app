import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AppButton from '../AppButton';
import { Transaction } from '../../graphql/transactions/types';

interface Props {
  transactions: Transaction[];
  loading: boolean;
  error: boolean;
  hasMore: boolean;
  isFetchingMore: boolean;
  onLoadMore: () => void;
}

const TransactionList = ({
  transactions,
  loading,
  error,
  hasMore,
  isFetchingMore,
  onLoadMore,
}: Props) => {
  if (loading) return <ActivityIndicator size="small" />;

  if (error)
    return (
      <Text style={styles.error}>No se pudieron cargar los movimientos</Text>
    );

  return (
    <View style={styles.container}>
      {transactions.map((tx) => (
        <View key={tx.id} style={styles.card}>
          <Text>
            {tx.type === 'CREDIT' ? 'Ingreso' : 'Egreso'} - $
            {tx.amount.toFixed(2)}
          </Text>
          {tx.description && <Text>Descripción: {tx.description}</Text>}
          <Text>Fecha: {new Date(tx.createdAt).toLocaleString()}</Text>
        </View>
      ))}

      {hasMore && (
        <AppButton
          title={isFetchingMore ? 'Cargando más...' : 'Cargar más movimientos'}
          onPress={onLoadMore}
          variant="secondary"
        />
      )}
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    gap: 8,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  error: {
    color: 'red',
  },
});
