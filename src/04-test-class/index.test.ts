import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash, { result } from 'lodash';

describe('BankAccount', () => {
  const balance = 5000;
  const moreBalance = 6000;
  const lessBalance = 3000;
  const account = getBankAccount(balance);
  const transferAccount = getBankAccount(moreBalance);
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(account.withdraw(6000)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(moreBalance, transferAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(moreBalance, transferAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(moreBalance).getBalance()).toBe(
      account.getBalance(),
    );
  });

  test('should withdraw money', () => {
    expect(account.withdraw(lessBalance).getBalance()).toBe(
      account.getBalance(),
    );
  });

  test('should transfer money', () => {
    expect(account.transfer(lessBalance, transferAccount).getBalance()).toBe(
      account.getBalance,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockBalance = 1;
    jest.spyOn(lodash, 'random').mockReturnValue(mockBalance);
    const balance = await account.fetchBalance();
    expect(balance).toBe(mockBalance);
    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(moreBalance);
    await account.synchronizeBalance();
    const balance = account.getBalance();
    expect(balance).toBe(moreBalance);
    jest.restoreAllMocks();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    expect(async () => await account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    jest.restoreAllMocks();
  });
});
