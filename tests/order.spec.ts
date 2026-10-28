import { test, expect } from "@playwright/test";

test("fill all fields and submit order", async ({ page }) => {
  await page.goto("https://basic-ui.tl-academy.ee/en/");

  await expect(page.getByTestId("create-order-button")).toBeDisabled();

  // fill first name
  await page.getByTestId("first-name-input").fill("Mark");
  await expect(page.getByTestId("create-order-button")).toBeDisabled();

  // fill last name
  await page.getByTestId("last-name-input").fill("Kivi");
  await expect(page.getByTestId("create-order-button")).toBeDisabled();

  // fill email
  await page.getByTestId("email-input").fill("mark@yahoo.ee");
  // fill address > address-input
  await page.getByTestId("address-input").fill("Estonia, Peetri, 5");
  // click 'create order' >> create-order-button
  await page.getByTestId("create-order-button").click();

  // Expect success message is visible > order-success
  await expect(page.getByTestId("order-success")).toBeVisible();
});

test("shows error on invalid email and order button disabled", async ({
  page,
}) => {
  await page.goto("https://basic-ui.tl-academy.ee/en/");

  // fill first name
  await page.getByTestId("first-name-input").fill("Mark");
  await page.getByTestId("last-name-input").fill("Kivi");
  await page.getByTestId("email-input").fill("mark@");
  await page.getByTestId("address-input").fill("Estonia, Peetri, 5");

  // 1 check error
  await expect(page.getByTestId("email-error")).toBeVisible();
  // Expect success message is visible > order-success
  await expect(page.getByTestId("create-order-button")).toBeDisabled();
});

test("shows error on each field", async ({ page }) => {
  await page.goto("https://basic-ui.tl-academy.ee/en/");

  // fill first name
  await page.getByTestId("first-name-input").click();
  await page.getByTestId("last-name-input").click();
  // first-name-error
  await expect(page.getByTestId("first-name-error")).toBeVisible();

  await page.getByTestId("email-input").click();

  // last-name-error
  await expect(page.getByTestId("last-name-error")).toBeVisible();
  await page.getByTestId("address-input").click();

  await expect(page.getByTestId("email-error")).toBeVisible();
  await page.getByTestId("first-name-input").click();

  await expect(page.getByTestId("address-error")).toBeVisible();
});
