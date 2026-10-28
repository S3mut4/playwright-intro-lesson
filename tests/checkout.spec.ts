import { expect, test } from "@playwright/test";

test('shows success message when order created', async ({ page }) => {
    await page.goto('https://shop.tl-academy.ee/checkout');
    await page.getByTestId('email-input').fill('mark@mail.ee');
    await page.getByTestId('name-input').fill('Mark Kivi');

    // check button enabled
    await expect(page.getByTestId('place-order-button')).toBeEnabled();
    // click on button
    await page.getByTestId('place-order-button').click();
    // check success message >> order-message
    await expect(page.getByTestId('order-message')).toBeVisible();
});

// default state: button disabled + Delivery method is parcel + Payment method is Bank card
test('default state validation', async ({ page }) => {
    await page.goto('https://shop.tl-academy.ee/checkout');

    // 1 check button disabled
    await expect(page.getByTestId('place-order-button')).toBeDisabled();

    // 2 radio is active for parcel >> delivery-parcel-locker-radio
    await expect(page.getByTestId('delivery-parcel-locker-radio')).toBeChecked();
    await expect(page.getByTestId('delivery-home-radio')).not.toBeChecked();
// >>

    // 3 payment-card-radio
    await expect(page.getByTestId('payment-card-radio')).toBeChecked();
    await expect(page.getByTestId('payment-paypal-radio')).toBeChecked({checked: false});
    //
});
