import { sql } from "../../../infrastructure/db";

export async function createAccountInRepository({ userId, amount }) {
  const account = await sql`
    INSERT INTO accounts (userId, amount)
    VALUES (${userId}, ${amount})
    RETURNING *
    `;

  return account[0];
}

export async function getAccountsInRepository(userId) {
  const accounts = await sql`
   SELECT * FROM accounts
   WHERE userId = ${userId}
  `;

  return accounts;
}

export async function deleteAccountInRepository({ id, userId }) {
  const account = await sql`
   DELETE * FROM accounts
   WHERE id = ${id}
   AND userId = ${userId}
   RETURNING *
  `;

  return account[0];
}
