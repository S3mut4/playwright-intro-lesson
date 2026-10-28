import { expect, test } from '@playwright/test';

test('shows error on invalid email and order button disabled', async ({ page }) => {
    await page.goto('https://basic-ui.tl-academy.ee/en/');

    // fill first name
    await page.getByTestId('first-name-input').fill('Mark');
    await page.getByTestId('last-name-input').fill('Kivi');
    await page.getByTestId('email-input').fill('mark@');
    await page.getByTestId('address-input').fill('Estonia, Peetri, 5');

    // 1 check error
    await expect(page.getByTestId('email-error')).toBeVisible();
    // Expect success message is visible > order-success
    await expect(page.getByTestId('create-order-button')).toBeDisabled();
});