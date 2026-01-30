import { View, Text, ActivityIndicator, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';

import { useAccounts } from '../hooks/useAccounts';
import { useTransactions } from '../hooks/useTransactions';
import AppButton from '../components/AppButton';

const AccountDetail = () => {
  const route = useRoute<any>();
  const { accountId, accountNumber } = route.params;

  const { getBalance } = useAccounts();
  const { data, loading, error, refetch } = getBalance(accountId);

  const { createCredit, createDebit, creditLoading, debitLoading } =
    useTransactions();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const parsedAmount = parseFloat(amount);

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

      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 16 }}>
        Nueva transacción
      </Text>

      <TextInput
        placeholder="Monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          borderWidth: 1,
          borderRadius: 6,
          padding: 10,
          marginTop: 8,
        }}
      />

      <TextInput
        placeholder="Descripción (solo para ingreso)"
        value={description}
        onChangeText={setDescription}
        style={{
          borderWidth: 1,
          borderRadius: 6,
          padding: 10,
          marginTop: 8,
        }}
      />

      <AppButton
        title={creditLoading ? 'Procesando...' : 'Ingresar dinero'}
        onPress={async () => {
          if (parsedAmount > 0) {
            await createCredit(accountId, parsedAmount, description);
            setAmount('');
            setDescription('');
            refetch();
          }
        }}
      />

      <AppButton
        title={debitLoading ? 'Procesando...' : 'Retirar dinero'}
        variant="secondary"
        onPress={async () => {
          if (parsedAmount > 0) {
            await createDebit(accountId, parsedAmount);
            setAmount('');
            setDescription('');
            refetch();
          }
        }}
      />
    </View>
  );
};

export default AccountDetail;
