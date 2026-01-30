import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';

import { useAccounts } from '../hooks/useAccounts';
import { useTransactions } from '../hooks/useTransactions';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import { useAccountSummary } from '../hooks/useAccountSummary';
import { TransactionType } from '../graphql/transactions/types';

import AccountBalanceCard from '../components/account/AccountBalanceCard';
import AccountSummaryCard from '../components/account/AccountSummaryCard';
import TransactionForm from '../components/account/TransactionForm';
import TransactionFilters from '../components/account/TransactionFilters';
import TransactionList from '../components/account/TransactionList';
import AppButton from '../components/AppButton';

const AccountDetail = () => {
  const route = useRoute<any>();
  const { accountId, accountNumber } = route.params;

  const navigation = useNavigation<any>();

  const { getBalance } = useAccounts();
  const { data, loading, error, refetch } = getBalance(accountId);

  const {
    summary,
    loading: summaryLoading,
    error: summaryError,
  } = useAccountSummary(accountId);

  const { createCredit, createDebit, creditLoading, debitLoading } =
    useTransactions();

  const [typeFilter, setTypeFilter] = useState<TransactionType | undefined>();
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const formatStartOfDay = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  };

  const formatEndOfDay = (date: Date) => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d.toISOString();
  };

  const {
    transactions,
    total,
    loading: transactionsLoading,
    error: transactionsError,
    loadMore,
    isFetchingMore,
  } = useTransactionHistory({
    accountId,
    type: typeFilter,
    from: fromDate ? formatStartOfDay(fromDate) : undefined,
    to: toDate ? formatEndOfDay(toDate) : undefined,
  });

  const hasMore = transactions.length < total;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AccountBalanceCard
        accountNumber={accountNumber}
        balance={data?.accountBalance}
        loading={loading}
        error={!!error}
      />

      <AccountSummaryCard
        summary={summary}
        loading={summaryLoading}
        error={!!summaryError}
      />

      <AppButton
        title="Ver historial de balance"
        variant="secondary"
        onPress={() =>
          navigation.navigate('AccountBalanceHistory', {
            accountId,
            accountNumber,
          })
        }
      />

      <TransactionForm
        creditLoading={creditLoading}
        debitLoading={debitLoading}
        onCredit={async (amount, description) => {
          await createCredit(accountId, amount, description);
          refetch();
        }}
        onDebit={async (amount) => {
          await createDebit(accountId, amount);
          refetch();
        }}
      />

      <TransactionFilters
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />

      <TransactionList
        transactions={transactions}
        loading={transactionsLoading}
        error={!!transactionsError}
        hasMore={hasMore}
        isFetchingMore={isFetchingMore}
        onLoadMore={loadMore}
      />
    </ScrollView>
  );
};

export default AccountDetail;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
});
