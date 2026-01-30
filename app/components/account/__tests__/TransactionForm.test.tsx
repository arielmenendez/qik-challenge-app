import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TransactionForm from '../TransactionForm';

describe('TransactionForm', () => {
  it('renders inputs and buttons', () => {
    const { getByPlaceholderText, getByText } = render(
      <TransactionForm
        onCredit={jest.fn()}
        onDebit={jest.fn()}
        creditLoading={false}
        debitLoading={false}
      />,
    );

    expect(getByPlaceholderText('Monto')).toBeTruthy();
    expect(
      getByPlaceholderText('Descripción (solo para ingreso)'),
    ).toBeTruthy();
    expect(getByText('Ingresar dinero')).toBeTruthy();
    expect(getByText('Retirar dinero')).toBeTruthy();
  });

  it('calls onCredit with correct values', async () => {
    const onCreditMock = jest.fn().mockResolvedValue(undefined);

    const { getByPlaceholderText, getByText } = render(
      <TransactionForm
        onCredit={onCreditMock}
        onDebit={jest.fn()}
        creditLoading={false}
        debitLoading={false}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Monto'), '100');
    fireEvent.changeText(
      getByPlaceholderText('Descripción (solo para ingreso)'),
      'Salario',
    );

    fireEvent.press(getByText('Ingresar dinero'));

    await waitFor(() => {
      expect(onCreditMock).toHaveBeenCalledWith(100, 'Salario');
    });
  });

  it('calls onDebit with correct value', async () => {
    const onDebitMock = jest.fn().mockResolvedValue(undefined);

    const { getByPlaceholderText, getByText } = render(
      <TransactionForm
        onCredit={jest.fn()}
        onDebit={onDebitMock}
        creditLoading={false}
        debitLoading={false}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Monto'), '50');

    fireEvent.press(getByText('Retirar dinero'));

    await waitFor(() => {
      expect(onDebitMock).toHaveBeenCalledWith(50);
    });
  });

  it('does not call handlers if amount is invalid', () => {
    const onCreditMock = jest.fn();
    const onDebitMock = jest.fn();

    const { getByText } = render(
      <TransactionForm
        onCredit={onCreditMock}
        onDebit={onDebitMock}
        creditLoading={false}
        debitLoading={false}
      />,
    );

    fireEvent.press(getByText('Ingresar dinero'));
    fireEvent.press(getByText('Retirar dinero'));

    expect(onCreditMock).not.toHaveBeenCalled();
    expect(onDebitMock).not.toHaveBeenCalled();
  });

  it('clears inputs after successful credit', async () => {
    const onCreditMock = jest.fn().mockResolvedValue(undefined);

    const { getByPlaceholderText, getByDisplayValue, getByText } = render(
      <TransactionForm
        onCredit={onCreditMock}
        onDebit={jest.fn()}
        creditLoading={false}
        debitLoading={false}
      />,
    );

    const amountInput = getByPlaceholderText('Monto');
    const descInput = getByPlaceholderText('Descripción (solo para ingreso)');

    fireEvent.changeText(amountInput, '200');
    fireEvent.changeText(descInput, 'Extra');

    fireEvent.press(getByText('Ingresar dinero'));

    await waitFor(() => {
      expect(onCreditMock).toHaveBeenCalled();
    });

    expect(amountInput.props.value).toBe('');
    expect(descInput.props.value).toBe('');
  });

  it('shows loading text on buttons', () => {
    const { getAllByText } = render(
      <TransactionForm
        onCredit={jest.fn()}
        onDebit={jest.fn()}
        creditLoading={true}
        debitLoading={true}
      />,
    );

    const loadingButtons = getAllByText('Procesando...');
    expect(loadingButtons.length).toBe(2);
  });
});
