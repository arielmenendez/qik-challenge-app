export type TransactionType = 'CREDIT' | 'DEBIT';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description?: string;
  createdAt: string;
}

export interface CreateCreditResponse {
  credit: Transaction;
}

export interface CreateDebitResponse {
  debit: Transaction;
}

export interface TransactionsResponse {
  transactions: {
    total: number;
    data: Transaction[];
  };
}

export interface TransactionsVariables {
  accountId: string;
  type?: 'CREDIT' | 'DEBIT';
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}
