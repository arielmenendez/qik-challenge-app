import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppButton from '../AppButton';

describe('AppButton', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(
      <AppButton title="Press me" onPress={() => {}} />,
    );

    expect(getByText('Press me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <AppButton title="Tap" onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Tap'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies primary styles by default', () => {
    const { getByText } = render(
      <AppButton title="Primary" onPress={() => {}} />,
    );

    const text = getByText('Primary');

    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#fff' })]),
    );
  });

  it('applies secondary styles when variant is secondary', () => {
    const { getByText } = render(
      <AppButton title="Secondary" onPress={() => {}} variant="secondary" />,
    );

    const text = getByText('Secondary');

    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#111' })]),
    );
  });
});
