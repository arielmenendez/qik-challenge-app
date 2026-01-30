import { gql } from '@apollo/client';

export const CREATE_CREDIT = gql`
  mutation Credit($accountId: ID!, $amount: Float!, $description: String) {
    credit(accountId: $accountId, amount: $amount, description: $description) {
      id
      type
      amount
      description
      createdAt
    }
  }
`;

export const CREATE_DEBIT = gql`
  mutation Debit($accountId: ID!, $amount: Float!) {
    debit(accountId: $accountId, amount: $amount) {
      id
      type
      amount
      createdAt
    }
  }
`;
