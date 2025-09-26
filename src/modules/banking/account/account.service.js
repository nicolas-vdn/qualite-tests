import { HttpBadRequest, HttpForbidden } from "@httpx/exception";
import { z } from "zod";
import {
  createAccountInRepository,
  deleteAccountInRepository,
  getAccountsInRepository,
} from "./account.repository";

const CreateAccountSchema = z.object({
  userId: z.number(),
  amount: z.number(),
});

const GetAccountsSchema = z.object({
  userId: z.number(),
});

const DeleteAccountSchema = z.object({
  id: z.number(),
  userId: z.number(),
});

export async function createAccount(data) {
  const result = CreateAccountSchema.safeParse(data);

  if (result.success) {
    return createAccountInRepository(result.data);
  } else {
    throw new HttpBadRequest(result.error);
  }
}

export async function getAccounts(userId) {
  const result = GetAccountsSchema.safeParse(userId);

  if (result.success) {
    return getAccountsInRepository(result.data);
  } else {
    throw new HttpBadRequest(result.error);
  }
}

export async function deleteAccount(data) {
  const result = DeleteAccountSchema.safeParse(data);

  if (result.success) {
    return deleteAccountInRepository(result.data);
  } else {
    throw new HttpBadRequest(result.error);
  }
}
