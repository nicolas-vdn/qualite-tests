import test, { expect } from "@playwright/test";

test.describe("Authentication's form page", () => {
  // Avant de lancer le test, aller dans le répertoire AUTH-E2E et lancer "npm install" puis "npm run dev"
  test.beforeEach(async ({ page }) => {
    // On va sur la page d'accueil du site ecommerce
    await page.goto("http://localhost:3000/");
  });

  test("should see the form page", async ({ page }) => {
    expect(await page.title()).toBe("Authentification form");

    expect(page.getByText("Créer un compte")).toBeVisible();
  });

  test("should fill the form and validate", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill("Playwright");

    await page
      .getByRole("textbox", { name: "Adresse email" })
      .fill("nicolas@playwright.com");

    await page
      .getByRole("textbox", { name: "Mot de passe" })
      .fill("PlayWright.123");

    await page.getByRole("button", { name: "Créer mon compte" }).click();

    await expect(
      page.getByRole("button", { name: "Création en cours..." })
    ).not.toBeVisible();

    expect(page.getByText("Inscription réussie")).toBeVisible();
  });

  test("should get an error when the username is forgot", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "Adresse email" })
      .fill("nicolas@playwright.com");

    await page
      .getByRole("textbox", { name: "Mot de passe" })
      .fill("PlayWright.123");

    await page.getByRole("button", { name: "Créer mon compte" }).click();

    await expect(
      page.getByRole("button", { name: "Création en cours..." })
    ).not.toBeVisible();

    expect(page.getByText("Le username est requis")).toBeVisible();

    expect(page.getByText("Inscription réussie")).not.toBeVisible();
  });

  test("should get an error when the email is forgot", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill("Playwright");

    await page
      .getByRole("textbox", { name: "Mot de passe" })
      .fill("PlayWright.123");

    await page.getByRole("button", { name: "Créer mon compte" }).click();

    await expect(
      page.getByRole("button", { name: "Création en cours..." })
    ).not.toBeVisible();

    expect(page.getByText("L'adresse email est requise")).toBeVisible();

    expect(page.getByText("Inscription réussie")).not.toBeVisible();
  });

  test("should get an error when the password is forgot", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill("Playwright");

    await page
      .getByRole("textbox", { name: "Adresse email" })
      .fill("nicolas@playwright.com");

    await page.getByRole("button", { name: "Créer mon compte" }).click();

    await expect(
      page.getByRole("button", { name: "Création en cours..." })
    ).not.toBeVisible();

    expect(page.getByText("Le mot de passe est requis")).toBeVisible();

    expect(page.getByText("Inscription réussie")).not.toBeVisible();
  });

  test("should get an error when the username is incorrect", async ({
    page,
  }) => {
    await page.getByRole("textbox", { name: "Username" }).fill("Pl");

    await page
      .getByRole("textbox", { name: "Adresse email" })
      .fill("nicolas@playwright.com");

    await page
      .getByRole("textbox", { name: "Mot de passe" })
      .fill("PlayWright.123");

    await page.getByRole("button", { name: "Créer mon compte" }).click();

    await expect(
      page.getByRole("button", { name: "Création en cours..." })
    ).not.toBeVisible();

    expect(
      page.getByText("Le username doit contenir au moins 3 caractères")
    ).toBeVisible();

    expect(page.getByText("Inscription réussie")).not.toBeVisible();
  });

  test("should get an error when the email is incorrect", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill("Playwright");

    await page
      .getByRole("textbox", { name: "Adresse email" })
      .fill("nicolasplaywright");

    await page
      .getByRole("textbox", { name: "Mot de passe" })
      .fill("PlayWright.123");

    await page.getByRole("button", { name: "Créer mon compte" }).click();

    await expect(
      page.getByRole("button", { name: "Création en cours..." })
    ).not.toBeVisible();

    expect(
      page.getByText("Veuillez entrer une adresse email valide")
    ).toBeVisible();

    expect(page.getByText("Inscription réussie")).not.toBeVisible();
  });

  test("should get an error when the password is incorrect", async ({
    page,
  }) => {
    await page.getByRole("textbox", { name: "Username" }).fill("Playwright");

    await page
      .getByRole("textbox", { name: "Adresse email" })
      .fill("nicolas@playwright.com");

    await page
      .getByRole("textbox", { name: "Mot de passe" })
      .fill("PlayWright");

    await page.getByRole("button", { name: "Créer mon compte" }).click();

    await expect(
      page.getByRole("button", { name: "Création en cours..." })
    ).not.toBeVisible();

    expect(
      page.getByText(
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
      )
    ).toBeVisible();

    expect(page.getByText("Inscription réussie")).not.toBeVisible();
  });
});
