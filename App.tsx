import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './app/graphql/apolloClient';
import { AuthProvider } from './app/context/AuthContext';
import RootNavigator from './app/navigation/RootNavigator';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ApolloProvider>
  );
}
