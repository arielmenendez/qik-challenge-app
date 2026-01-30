import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  Observable,
} from '@apollo/client';
import { loadToken } from '../services/tokenService';

const httpLink = new HttpLink({
  uri: process.env.EXPO_PUBLIC_GRAPHQL_URL,
});

const authLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    loadToken()
      .then((token) => {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
          },
        }));
      })
      .then(() => {
        const subscriber = forward(operation).subscribe({
          next: (result) => observer.next(result),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });

        return () => subscriber.unsubscribe();
      })
      .catch((error) => observer.error(error));
  });
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          transactions: {
            keyArgs: ['accountId', 'type', 'from', 'to'],
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
