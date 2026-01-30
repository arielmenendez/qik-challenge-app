import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthInput from '../AppInput';

describe('AuthInput', () => {
  it('renders the placeholder', () => {
    const { getByPlaceholderText } = render(<AuthInput placeholder="Email" />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
  });

  it('displays the value passed as prop', () => {
    const { getByDisplayValue } = render(
      <AuthInput value="test@mail.com" onChangeText={() => {}} />,
    );

    expect(getByDisplayValue('test@mail.com')).toBeTruthy();
  });

  it('calls onChangeText when typing', () => {
    const onChangeTextMock = jest.fn();

    const { getByPlaceholderText } = render(
      <AuthInput placeholder="Type here" onChangeText={onChangeTextMock} />,
    );

    fireEvent.changeText(getByPlaceholderText('Type here'), 'Hello');

    expect(onChangeTextMock).toHaveBeenCalledWith('Hello');
  });

  it('applies custom styles passed via props', () => {
    const { getByPlaceholderText } = render(
      <AuthInput placeholder="Styled" style={{ borderColor: 'red' }} />,
    );

    const input = getByPlaceholderText('Styled');

    expect(input.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderColor: 'red' })]),
    );
  });
});
