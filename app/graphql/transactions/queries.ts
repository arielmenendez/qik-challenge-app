import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $accountId: ID!
    $type: TransactionType
    $from: DateTime
    $to: DateTime
    $limit: Int
    $offset: Int
  ) {
    transactions(
      accountId: $accountId
      type: $type
      from: $from
      to: $to
      limit: $limit
      offset: $offset
    ) {
      total
      data {
        id
        type
        amount
        description
        createdAt
      }
    }
  }
`;
