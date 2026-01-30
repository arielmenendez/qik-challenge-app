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
