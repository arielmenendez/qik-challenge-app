export interface Account {
  id: string;
  accountNumber: string;
  balance: number;
  createdAt: string;
}

export interface GetMyAccountsResponse {
  myAccounts: Account[];
}

export interface CreateAccountResponse {
  createAccount: Account;
}

export interface GetAccountBalanceResponse {
  accountBalance: number;
}

export interface AccountSummary {
  balance: number;
  totalCredits: number;
  totalDebits: number;
}

export interface GetAccountSummaryResponse {
  accountSummary: AccountSummary;
}

export interface GetAccountSummaryVariables {
  accountId: string;
}

export interface BalanceHistoryItem {
  date: string;
  balance: number;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  transactionId: string;
}

export interface GetBalanceHistoryResponse {
  balanceHistory: BalanceHistoryItem[];
}

export interface GetBalanceHistoryVariables {
  accountId: string;
}
