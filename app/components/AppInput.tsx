import { TextInput, StyleSheet, TextInputProps } from 'react-native';

type Props = TextInputProps;

const AuthInput = (props: Props) => {
  return <TextInput {...props} style={[styles.input, props.style]} />;
};

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default AuthInput;
