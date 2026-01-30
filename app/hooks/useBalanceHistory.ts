import { useQuery } from '@apollo/client/react';
import { GET_BALANCE_HISTORY } from '../graphql/accounts/queries';
import {
  GetBalanceHistoryResponse,
  GetBalanceHistoryVariables,
} from '../graphql/accounts/types';

export const useBalanceHistory = (accountId: string) => {
  const { data, loading, error } = useQuery<
    GetBalanceHistoryResponse,
    GetBalanceHistoryVariables
  >(GET_BALANCE_HISTORY, {
    variables: { accountId },
    fetchPolicy: 'network-only',
  });

  return {
    history: data?.balanceHistory ?? [],
    loading,
    error,
  };
};
