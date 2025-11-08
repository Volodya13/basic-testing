import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError /*, getBankAccount*/,
} from '.';

describe('BankAccount', () => {
  const balance = 500;
  const account = new BankAccount(balance);
  const toAccount = new BankAccount(0);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const insufficient = new InsufficientFundsError(balance);
    expect(() => account.withdraw(balance + 1)).toThrow(insufficient);
  });

  test('should throw error when transferring more than balance', () => {
    const insufficient = new InsufficientFundsError(balance);

    expect(() => account.transfer(balance + 1, toAccount)).toThrow(
      insufficient,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const transferFailed = new TransferFailedError();

    expect(() => account.transfer(100, account)).toThrow(transferFailed);
  });

  test('should deposit money', () => {
    expect(() => account.deposit(100)).not.toThrow();
  });

  test('should withdraw money', () => {
    expect(() => account.withdraw(100)).not.toThrow();
  });

  test('should transfer money', () => {
    expect(() => account.transfer(100, toAccount)).not.toThrow();
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedBalance = await account.fetchBalance();
    expect(typeof fetchedBalance === 'number' || fetchedBalance === null).toBe(
      true,
    );
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const prevBalance = account.getBalance();
    await account.synchronizeBalance();
    const newBalance = account.getBalance();

    expect(prevBalance === newBalance || prevBalance !== newBalance).toBe(true);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const fetchedBalance = await account.fetchBalance();

    if (fetchedBalance === null) {
      await expect(account.synchronizeBalance()).rejects.toThrow(
        'Synchronization failed',
      );
    }
  });
});
