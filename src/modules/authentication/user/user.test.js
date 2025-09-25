import { describe, it, vi, expect, afterEach, assert } from "vitest";
import { createUserInRepository } from "./user.repository";

vi.mock("./user.repository", async (importOriginal) => ({
  ...(await importOriginal()),

  createUserInRepository: vi.fn((data) => {
    if (!data.birthday || !data.name) {
      const error = new Error(
        `${
          data.birthday
            ? "Name is"
            : data.name
            ? "Birthday is"
            : "Name and Birthday are"
        } required`
      );
      error.name = "HttpBadRequest";
      error.statusCode = 400;
      throw error;
    }

    return {
      id: 4,

      name: data.name,

      birthday: data.birthday,
    };
  }),
}));

describe("User Service", () => {
  afterEach(() => vi.clearAllMocks());

  it("should create an user", async () => {
    const user = await createUserInRepository({
      name: "Valentin R",
      birthday: new Date(1997, 8, 13),
    });
    expect(user).toBeDefined();

    expect(user.id).toBeDefined();

    expect(user.id).toBeTypeOf("number");

    expect(user).toHaveProperty("name", "Valentin R");

    expect(user.birthday).toBeDefined();

    expect(user.birthday.getFullYear()).toBe(1997);

    expect(user.birthday.getMonth()).toBe(8);

    expect(createUserInRepository).toBeCalledTimes(1);

    expect(createUserInRepository).toBeCalledWith({
      name: "Valentin R",

      birthday: new Date(1997, 8, 13),
    });
  });

  it("should trigger a bad request error when user creation", async () => {
    try {
      await createUserInRepository({
        name: "Valentin R",
      });
      assert.fail("createUserInRepository should trigger an error.");
    } catch (e) {
      expect(e.name).toBe("HttpBadRequest");

      expect(e.statusCode).toBe(400);
    }
  });
});
