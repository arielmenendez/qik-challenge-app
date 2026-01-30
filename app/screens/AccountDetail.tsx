import { View, Text, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAccounts } from '../hooks/useAccounts';

const AccountDetail = () => {
  const route = useRoute<any>();
  const { accountId, accountNumber } = route.params;

  const { getBalance } = useAccounts();
  const { data, loading, error } = getBalance(accountId);

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>
        Cuenta: {accountNumber}
      </Text>

      {loading && <ActivityIndicator size="small" />}

      {error && <Text>No se pudo cargar el saldo</Text>}

      {!loading && !error && (
        <Text style={{ fontSize: 16 }}>
          Saldo actual: ${data?.accountBalance.toFixed(2)}
        </Text>
      )}
    </View>
  );
};

export default AccountDetail;
