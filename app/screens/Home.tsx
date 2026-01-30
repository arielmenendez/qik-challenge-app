import { View, Text, ActivityIndicator } from 'react-native';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAccounts } from '../hooks/useAccounts';
import AppButton from '../components/AppButton';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const { userName, isLoading, hasError } = useUserProfile();
  const {
    accounts,
    loadingAccounts,
    accountsError,
    createAccount,
    creatingAccount,
  } = useAccounts();

  const navigation = useNavigation<any>();

  return (
    <View style={{ padding: 16, gap: 16 }}>
      {isLoading && <ActivityIndicator size="small" />}

      {!isLoading && hasError && <Text>No se pudo cargar el perfil</Text>}

      {!isLoading && !hasError && (
        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          Bienvenido: {userName}
        </Text>
      )}

      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 10 }}>
        Tus cuentas
      </Text>

      {loadingAccounts && <ActivityIndicator size="small" />}

      {!loadingAccounts && accountsError && (
        <Text>No se pudieron cargar las cuentas</Text>
      )}

      {!loadingAccounts &&
        !accountsError &&
        accounts.map((account) => (
          <Pressable
            key={account.id}
            onPress={() =>
              navigation.navigate('AccountDetail', {
                accountId: account.id,
                accountNumber: account.accountNumber,
              })
            }
            style={{
              padding: 12,
              borderWidth: 1,
              borderRadius: 8,
              marginTop: 8,
            }}
          >
            <Text>Número de cuenta: {account.accountNumber}</Text>
            <Text>Saldo: ${account.balance.toFixed(2)}</Text>
          </Pressable>
        ))}

      <AppButton
        title={creatingAccount ? 'Creando cuenta...' : 'Crear nueva cuenta'}
        onPress={createAccount}
      />
    </View>
  );
};

export default Home;
