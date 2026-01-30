import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import Home from '../screens/Home';
import Login from '../screens/Login';
import AccountDetail from '../screens/AccountDetail';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: '',
                headerRight: () => <Button onPress={onLogout} title="Salir" />,
              }}
            />
            <Stack.Screen
              name="AccountDetail"
              component={AccountDetail}
              options={{ title: 'Detalle de cuenta' }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: '' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
