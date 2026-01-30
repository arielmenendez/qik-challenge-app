import { useQuery } from '@apollo/client/react';
import { GET_TRANSACTIONS } from '../graphql/transactions/queries';
import {
  TransactionsResponse,
  TransactionsVariables,
} from '../graphql/transactions/types';

interface UseTransactionHistoryProps {
  accountId: string;
  type?: 'CREDIT' | 'DEBIT';
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

export const useTransactionHistory = ({
  accountId,
  type,
  from,
  to,
  limit = 5,
  offset = 0,
}: UseTransactionHistoryProps) => {
  const { data, loading, error, fetchMore, refetch, networkStatus } = useQuery<
    TransactionsResponse,
    TransactionsVariables
  >(GET_TRANSACTIONS, {
    variables: { accountId, type, from, to, limit, offset },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const loadMore = () => {
    if (!data) return;

    return fetchMore({
      variables: {
        offset: data.transactions.data.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        return {
          transactions: {
            total: fetchMoreResult.transactions.total,
            data: [
              ...previousResult.transactions.data,
              ...fetchMoreResult.transactions.data,
            ],
          },
        };
      },
    });
  };

  return {
    transactions: data?.transactions.data ?? [],
    total: data?.transactions.total ?? 0,
    loading,
    error,
    refetch,
    loadMore,
    isFetchingMore: networkStatus === 3,
  };
};
