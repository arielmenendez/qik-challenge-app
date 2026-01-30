import { gql } from '@apollo/client';

export const GET_MY_ACCOUNTS = gql`
  query GetMyAccounts {
    myAccounts {
      id
      accountNumber
      balance
      createdAt
    }
  }
`;

export const GET_ACCOUNT_BALANCE = gql`
  query GetAccountBalance($accountId: ID!) {
    accountBalance(id: $accountId)
  }
`;
