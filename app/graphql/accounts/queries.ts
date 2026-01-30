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

export const GET_ACCOUNT_SUMMARY = gql`
  query GetAccountSummary($accountId: ID!) {
    accountSummary(accountId: $accountId) {
      balance
      totalCredits
      totalDebits
    }
  }
`;

export const GET_BALANCE_HISTORY = gql`
  query GetBalanceHistory($accountId: ID!) {
    balanceHistory(accountId: $accountId) {
      date
      balance
      type
      amount
      transactionId
    }
  }
`;
