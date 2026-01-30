import { View, Text, Pressable, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { TransactionType } from '../../graphql/transactions/types';

interface Props {
  typeFilter?: TransactionType;
  setTypeFilter: (type?: TransactionType) => void;
  fromDate?: Date;
  toDate?: Date;
  setFromDate: (date?: Date) => void;
  setToDate: (date?: Date) => void;
}

const TransactionFilters = ({
  typeFilter,
  setTypeFilter,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: Props) => {
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimientos</Text>

      <View style={styles.row}>
        <Pressable
          onPress={() => setTypeFilter(undefined)}
          style={[styles.chip, !typeFilter && styles.chipActive]}
        >
          <Text style={!typeFilter ? styles.chipTextActive : styles.chipText}>
            Todos
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTypeFilter('CREDIT')}
          style={[styles.chip, typeFilter === 'CREDIT' && styles.chipActive]}
        >
          <Text
            style={
              typeFilter === 'CREDIT' ? styles.chipTextActive : styles.chipText
            }
          >
            Ingresos
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTypeFilter('DEBIT')}
          style={[styles.chip, typeFilter === 'DEBIT' && styles.chipActive]}
        >
          <Text
            style={
              typeFilter === 'DEBIT' ? styles.chipTextActive : styles.chipText
            }
          >
            Egresos
          </Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Desde</Text>
      <Pressable onPress={() => setShowFromPicker(true)} style={styles.dateBox}>
        <Text>
          {fromDate ? fromDate.toLocaleDateString() : 'Seleccionar fecha'}
        </Text>
      </Pressable>

      {showFromPicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowFromPicker(false);
            if (date) setFromDate(date);
          }}
        />
      )}

      <Text style={styles.label}>Hasta</Text>
      <Pressable onPress={() => setShowToPicker(true)} style={styles.dateBox}>
        <Text>
          {toDate ? toDate.toLocaleDateString() : 'Seleccionar fecha'}
        </Text>
      </Pressable>

      {showToPicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowToPicker(false);
            if (date) setToDate(date);
          }}
        />
      )}
    </View>
  );
};

export default TransactionFilters;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e5e5e5',
  },
  chipActive: {
    backgroundColor: '#111',
  },
  chipText: {
    color: '#111',
  },
  chipTextActive: {
    color: '#fff',
  },
  label: {
    marginTop: 12,
  },
  dateBox: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
});
