import { useQuery } from '@apollo/client/react';
import { GET_ACCOUNT_SUMMARY } from '../graphql/accounts/queries';
import {
  GetAccountSummaryResponse,
  GetAccountSummaryVariables,
} from '../graphql/accounts/types';

export const useAccountSummary = (accountId: string) => {
  const { data, loading, error, refetch } = useQuery<
    GetAccountSummaryResponse,
    GetAccountSummaryVariables
  >(GET_ACCOUNT_SUMMARY, {
    variables: { accountId },
    fetchPolicy: 'network-only',
  });

  return {
    summary: data?.accountSummary,
    loading,
    error,
    refetch,
  };
};
