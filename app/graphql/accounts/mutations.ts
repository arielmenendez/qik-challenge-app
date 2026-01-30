import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount {
    createAccount {
      id
      balance
      createdAt
    }
  }
`;
