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
