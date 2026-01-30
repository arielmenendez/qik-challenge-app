import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AppButton from '../AppButton';

interface Props {
  onCredit: (amount: number, description: string) => Promise<void>;
  onDebit: (amount: number) => Promise<void>;
  creditLoading: boolean;
  debitLoading: boolean;
}

const TransactionForm = ({
  onCredit,
  onDebit,
  creditLoading,
  debitLoading,
}: Props) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const parsedAmount = parseFloat(amount);

  const handleCredit = async () => {
    if (parsedAmount > 0) {
      await onCredit(parsedAmount, description);
      setAmount('');
      setDescription('');
    }
  };

  const handleDebit = async () => {
    if (parsedAmount > 0) {
      await onDebit(parsedAmount);
      setAmount('');
      setDescription('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva transacción</Text>

      <TextInput
        placeholder="Monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <TextInput
        placeholder="Descripción (solo para ingreso)"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <AppButton
        title={creditLoading ? 'Procesando...' : 'Ingresar dinero'}
        onPress={handleCredit}
      />

      <AppButton
        title={debitLoading ? 'Procesando...' : 'Retirar dinero'}
        onPress={handleDebit}
        variant="secondary"
      />
    </View>
  );
};

export default TransactionForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
});
