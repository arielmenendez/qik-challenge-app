import { Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client/react';

import {
  GET_MY_ACCOUNTS,
  GET_ACCOUNT_BALANCE,
} from '../graphql/accounts/queries';
import { CREATE_ACCOUNT } from '../graphql/accounts/mutations';
import {
  GetMyAccountsResponse,
  CreateAccountResponse,
  GetAccountBalanceResponse,
} from '../graphql/accounts/types';

export const useAccounts = () => {
  const {
    data,
    loading: loadingAccounts,
    error: accountsError,
    refetch,
  } = useQuery<GetMyAccountsResponse>(GET_MY_ACCOUNTS);

  const [createAccountMutation, { loading: creatingAccount }] =
    useMutation<CreateAccountResponse>(CREATE_ACCOUNT, {
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        const message = (error as any)?.message || 'No se pudo crear la cuenta';

        Alert.alert('Error', message);
      },
    });

  const createAccount = async () => {
    await createAccountMutation();
  };

  const getBalance = (accountId: string) => {
    return useQuery<GetAccountBalanceResponse>(GET_ACCOUNT_BALANCE, {
      variables: { accountId },
    });
  };

  return {
    accounts: data?.myAccounts ?? [],
    loadingAccounts,
    accountsError,
    createAccount,
    creatingAccount,
    getBalance,
    refetchAccounts: refetch,
  };
};
