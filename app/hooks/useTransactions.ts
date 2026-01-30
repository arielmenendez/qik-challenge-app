import { Alert } from 'react-native';
import { useMutation } from '@apollo/client/react';

import { CREATE_CREDIT, CREATE_DEBIT } from '../graphql/transactions/mutations';
import {
  CreateCreditResponse,
  CreateDebitResponse,
} from '../graphql/transactions/types';

export const useTransactions = () => {
  const [creditMutation, { loading: creditLoading }] =
    useMutation<CreateCreditResponse>(CREATE_CREDIT, {
      onError: (error) => {
        const message =
          (error as any)?.message || 'No se pudo registrar el ingreso';
        Alert.alert('Error', message);
      },
    });

  const [debitMutation, { loading: debitLoading }] =
    useMutation<CreateDebitResponse>(CREATE_DEBIT, {
      onError: (error) => {
        const message =
          (error as any)?.message || 'No se pudo registrar el egreso';
        Alert.alert('Error', message);
      },
    });

  const createCredit = async (
    accountId: string,
    amount: number,
    description?: string,
  ) => {
    await creditMutation({
      variables: { accountId, amount, description },
    });
  };

  const createDebit = async (accountId: string, amount: number) => {
    await debitMutation({
      variables: { accountId, amount },
    });
  };

  return {
    createCredit,
    createDebit,
    creditLoading,
    debitLoading,
  };
};
