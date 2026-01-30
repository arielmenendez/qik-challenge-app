import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TransactionList from '../TransactionList';
import { Transaction } from '../../../graphql/transactions/types';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'CREDIT',
    amount: 1500,
    description: 'Pago recibido',
    createdAt: new Date('2024-01-01T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    type: 'DEBIT',
    amount: 200,
    description: undefined,
    createdAt: new Date('2024-01-02T12:00:00Z').toISOString(),
  },
];

describe('TransactionList', () => {
  it('shows loading indicator when loading is true', () => {
    const { UNSAFE_getByType } = render(
      <TransactionList
        transactions={[]}
        loading={true}
        error={false}
        hasMore={false}
        isFetchingMore={false}
        onLoadMore={() => {}}
      />,
    );

    expect(
      UNSAFE_getByType(require('react-native').ActivityIndicator),
    ).toBeTruthy();
  });

  it('shows error message when error is true', () => {
    const { getByText } = render(
      <TransactionList
        transactions={[]}
        loading={false}
        error={true}
        hasMore={false}
        isFetchingMore={false}
        onLoadMore={() => {}}
      />,
    );

    expect(getByText('No se pudieron cargar los movimientos')).toBeTruthy();
  });

  it('renders list of transactions', () => {
    const { getByText } = render(
      <TransactionList
        transactions={mockTransactions}
        loading={false}
        error={false}
        hasMore={false}
        isFetchingMore={false}
        onLoadMore={() => {}}
      />,
    );

    expect(getByText('Ingreso - $1500.00')).toBeTruthy();
    expect(getByText('Egreso - $200.00')).toBeTruthy();
  });

  it('renders description only when present', () => {
    const { queryByText, getByText } = render(
      <TransactionList
        transactions={mockTransactions}
        loading={false}
        error={false}
        hasMore={false}
        isFetchingMore={false}
        onLoadMore={() => {}}
      />,
    );

    expect(getByText('Descripción: Pago recibido')).toBeTruthy();
    expect(queryByText('Descripción: null')).toBeNull();
  });

  it('shows load more button when hasMore is true', () => {
    const { getByText } = render(
      <TransactionList
        transactions={mockTransactions}
        loading={false}
        error={false}
        hasMore={true}
        isFetchingMore={false}
        onLoadMore={() => {}}
      />,
    );

    expect(getByText('Cargar más movimientos')).toBeTruthy();
  });

  it('calls onLoadMore when pressing load more button', () => {
    const onLoadMoreMock = jest.fn();

    const { getByText } = render(
      <TransactionList
        transactions={mockTransactions}
        loading={false}
        error={false}
        hasMore={true}
        isFetchingMore={false}
        onLoadMore={onLoadMoreMock}
      />,
    );

    fireEvent.press(getByText('Cargar más movimientos'));

    expect(onLoadMoreMock).toHaveBeenCalledTimes(1);
  });

  it('shows loading text when fetching more', () => {
    const { getByText } = render(
      <TransactionList
        transactions={mockTransactions}
        loading={false}
        error={false}
        hasMore={true}
        isFetchingMore={true}
        onLoadMore={() => {}}
      />,
    );

    expect(getByText('Cargando más...')).toBeTruthy();
  });
});
