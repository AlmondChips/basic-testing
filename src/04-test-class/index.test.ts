// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 2000;
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.withdraw(initialBalance + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const senderBankAccount = getBankAccount(initialBalance);
    const acceptorBankAccount = getBankAccount(initialBalance);

    expect(() =>
      senderBankAccount.transfer(initialBalance + 1, acceptorBankAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(initialBalance);
    expect(() =>
      bankAccount.transfer(initialBalance - 1000, bankAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(initialBalance);
    const amount = 500;
    const newBalance = initialBalance + amount;
    bankAccount.deposit(amount);
    expect(bankAccount.getBalance()).toBe(newBalance);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(initialBalance);
    const amount = initialBalance / 4;
    const expectedBalance = initialBalance - amount;
    bankAccount.withdraw(amount);
    expect(bankAccount.getBalance()).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    const senderBankAccount = getBankAccount(initialBalance);
    const acceptorBankAccount = getBankAccount(initialBalance);
    const amount = initialBalance / 2;
    senderBankAccount.transfer(amount, acceptorBankAccount);
    expect(senderBankAccount.getBalance()).toBe(initialBalance - amount);
    expect(acceptorBankAccount.getBalance()).toBe(initialBalance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(initialBalance);
    let balance = 0;
    while (!balance) {
      const data = await bankAccount.fetchBalance();
      if (data) balance = data;
    }
    expect(balance).toBeGreaterThanOrEqual(0);
    expect(balance).toBeLessThanOrEqual(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(initialBalance);
    let condition = true;
    while (condition) {
      try {
        await bankAccount.synchronizeBalance();
        condition = false;
      } catch {}
    }
    const balance = bankAccount.getBalance();
    expect(balance).toBeGreaterThanOrEqual(0);
    expect(balance).toBeLessThanOrEqual(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(initialBalance);
    let condition = true;
    while (condition) {
      try {
        await bankAccount.synchronizeBalance();
      } catch (e) {
        expect(e).toBeInstanceOf(SynchronizationFailedError);
        condition = false;
      }
    }
  });
});
