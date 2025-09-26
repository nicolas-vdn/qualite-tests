import {
  describe,
  it,
  vi,
  expect,
  afterEach,
  assert,
  expectTypeOf,
} from "vitest";
import { createAccount, getAccounts, deleteAccount } from "./account.service";
import {
  createAccountInRepository,
  getAccountsInRepository,
  deleteAccountInRepository,
} from "./account.repository";

vi.mock("./account.repository", async (importOriginal) => ({
  ...(await importOriginal()),

  createAccountInRepository: vi.fn((data) => {
    return {
      id: 4,

      userId: data.userId,

      amount: data.amount,
    };
  }),

  getAccountsInRepository: vi.fn((data) => {
    return [
      {
        id: 4,

        userId: data.userId,

        amount: 50,
      },
      {
        id: 5,

        userId: data.userId,

        amount: 0,
      },
    ];
  }),

  deleteAccountInRepository: vi.fn((data) => {
    return {
      id: data.id,

      userId: data.userId,

      amount: 0,
    };
  }),
}));

describe("Account Service", () => {
  afterEach(() => vi.clearAllMocks());

  it("should create an account", async () => {
    const account = await createAccount({
      userId: 4,
      amount: 50,
    });
    expect(account).toBeDefined();

    expect(account.id).toBeDefined();

    expect(account.id).toBeTypeOf("number");

    expect(account).toHaveProperty("userId", 4);

    expect(account.amount).toBeDefined();

    expect(account.amount).toBe(50);

    expect(createAccountInRepository).toBeCalledTimes(1);

    expect(createAccountInRepository).toBeCalledWith({
      userId: 4,

      amount: 50,
    });
  });

  it("should trigger a bad request error when account creation", async () => {
    try {
      await createAccount({
        userId: 4,
      });
      assert.fail("createAccount should trigger an error.");
    } catch (e) {
      expect(e.name).toBe("HttpBadRequest");

      expect(e.statusCode).toBe(400);
    }
  });

  it("should get all accounts linked to userId", async () => {
    const accounts = await getAccounts({
      userId: 4,
    });

    expect(accounts).toBeDefined();

    expect(accounts).toBeTypeOf("object");

    accounts.forEach((account) => {
      expect(account).toHaveProperty("userId", 4);

      expect(account.amount).toBeDefined();
    });

    expect(getAccountsInRepository).toBeCalledTimes(1);

    expect(getAccountsInRepository).toBeCalledWith({
      userId: 4,
    });
  });

  it("should delete an account with given id and userId", async () => {
    const account = await deleteAccount({ id: 1, userId: 4 });

    expect(account).toBeDefined();

    expect(account).toHaveProperty("id", 1);

    expect(account).toHaveProperty("userId", 4);

    expect(deleteAccountInRepository).toBeCalledTimes(1);

    expect(deleteAccountInRepository).toBeCalledWith({
      id: 1,
      userId: 4,
    });
  });

  it("should trigger an erorr with wrong id given", async () => {
    try {
      await deleteAccount({
        id: "erreur",
        userId: 4,
      });
      assert.fail("deleteAccount should trigger an error.");
    } catch (e) {
      expect(e.name).toBe("HttpBadRequest");

      expect(e.statusCode).toBe(400);
    }
  });
});
