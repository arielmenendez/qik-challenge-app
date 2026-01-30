import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AccountDetail from '../AccountDetail';

const mockNavigate = jest.fn();
const mockLoadMore = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
  useRoute: () => ({
    params: { accountId: '1', accountNumber: '000123' },
  }),
}));

jest.mock('../../hooks/useAccounts', () => ({
  useAccounts: () => ({
    getBalance: () => ({
      data: { accountBalance: 5000 },
      loading: false,
      error: null,
      refetch: jest.fn(),
    }),
  }),
}));

jest.mock('../../hooks/useAccountSummary', () => ({
  useAccountSummary: () => ({
    summary: {
      balance: 5000,
      totalCredits: 2000,
      totalDebits: 1000,
    },
    loading: false,
    error: null,
  }),
}));

jest.mock('../../hooks/useTransactions', () => ({
  useTransactions: () => ({
    createCredit: jest.fn(),
    createDebit: jest.fn(),
    creditLoading: false,
    debitLoading: false,
  }),
}));

jest.mock('../../hooks/useTransactionHistory', () => ({
  useTransactionHistory: () => ({
    transactions: [
      {
        id: '1',
        type: 'CREDIT',
        amount: 100,
        description: 'Test',
        createdAt: new Date().toISOString(),
      },
    ],
    total: 2,
    loading: false,
    error: null,
    loadMore: mockLoadMore,
    isFetchingMore: false,
  }),
}));

describe('AccountDetail Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders main sections correctly', () => {
    const { getByText } = render(<AccountDetail />);
    expect(getByText('Ver historial de balance')).toBeTruthy();
  });

  it('navigates to balance history when button is pressed', () => {
    const { getByText } = render(<AccountDetail />);

    fireEvent.press(getByText('Ver historial de balance'));

    expect(mockNavigate).toHaveBeenCalledWith('AccountBalanceHistory', {
      accountId: '1',
      accountNumber: '000123',
    });
  });

  it('renders transaction list and load more button', () => {
    const { getByText } = render(<AccountDetail />);
    expect(getByText('Cargar más movimientos')).toBeTruthy();
  });

  it('calls loadMore when pressing load more button', () => {
    const { getByText } = render(<AccountDetail />);

    fireEvent.press(getByText('Cargar más movimientos'));

    expect(mockLoadMore).toHaveBeenCalledTimes(1);
  });
});
