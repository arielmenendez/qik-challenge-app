import { View, Image, StyleSheet, Text } from 'react-native';
import Logo from '../../assets/images/logo.png';
import { useAuthForm } from '../hooks/useAuthForm';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

const Login = () => {
  const {
    isRegistering,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    switchMode,
    handleLogin,
    handleRegister,
  } = useAuthForm();

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />

      <Text style={styles.title}>
        {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
      </Text>

      <View style={styles.form}>
        {isRegistering && (
          <AppInput
            placeholder="Nombre completo"
            value={name}
            onChangeText={setName}
          />
        )}

        <AppInput
          placeholder="Correo electrónico"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <AppInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {isRegistering ? (
          <>
            <AppButton title="Registrarse" onPress={handleRegister} />
            <AppButton
              title="Ya tengo cuenta"
              onPress={() => switchMode(false)}
              variant="secondary"
            />
          </>
        ) : (
          <>
            <AppButton title="Iniciar sesión" onPress={handleLogin} />
            <AppButton
              title="Crear cuenta"
              onPress={() => switchMode(true)}
              variant="secondary"
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  image: {
    width: '50%',
    height: '30%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  form: {
    gap: 10,
    width: '75%',
  },
});

export default Login;
