import { test, expect } from '@playwright/test';

const selectors = {
  hamburgerButton: '#hamburgerMenu',
  flyout: '#hamburgerFlyout',
  flyoutContent: '.flyout-content',
};

test.describe('Hamburger menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('opens/closes with aria states and ESC', async ({ page }) => {
    const button = page.locator(selectors.hamburgerButton);
    const flyout = page.locator(selectors.flyout);

    await expect(flyout).toHaveAttribute('aria-hidden', 'true');
    await expect(button).toHaveAttribute('aria-expanded', 'false');

    await button.click();

    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(flyout).toHaveClass(/open/);
    await expect(flyout).toHaveAttribute('aria-hidden', 'false');

    await page.keyboard.press('Escape');

    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(flyout).not.toHaveClass(/open/);
    await expect(flyout).toHaveAttribute('aria-hidden', 'true');
  });

  test('focus trap keeps focus within flyout', async ({ page }) => {
    const button = page.locator(selectors.hamburgerButton);
    await button.click();

    const flyout = page.locator(selectors.flyout);
    const focusables = flyout.locator('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const count = await focusables.count();
    expect(count).toBeGreaterThan(1);

    // Tab forward past last element
    await focusables.nth(count - 1).focus();
    await page.keyboard.press('Tab');
    await expect(focusables.first()).toBeFocused();

    // Shift+Tab backward from first element
    await focusables.first().focus();
    await page.keyboard.press('Shift+Tab');
    await expect(focusables.nth(count - 1)).toBeFocused();
  });

  test('clicking overlay closes the flyout', async ({ page }) => {
    const button = page.locator(selectors.hamburgerButton);
    await button.click();

    const flyout = page.locator(selectors.flyout);
    const flyoutContent = page.locator(selectors.flyoutContent);

    // Click outside content but inside overlay
    const box = await flyout.boundingBox();
    const contentBox = await flyoutContent.boundingBox();
    if (!box || !contentBox) throw new Error('Missing bounding boxes');

    const clickX = box.x + 5;
    const clickY = box.y + 5;
    // Ensure click is outside content bounds
    if (
      clickX > contentBox.x &&
      clickX < contentBox.x + contentBox.width &&
      clickY > contentBox.y &&
      clickY < contentBox.y + contentBox.height
    ) {
      throw new Error('Calculated overlay click landed in content');
    }

    await flyout.click({ position: { x: clickX - box.x, y: clickY - box.y } });

    await expect(flyout).not.toHaveClass(/open/);
  });

  test('scroll is locked while open and restored when closed', async ({ page }) => {
    const button = page.locator(selectors.hamburgerButton);
    const flyout = page.locator(selectors.flyout);

    await button.click();

    const overflowOpen = await page.$eval('body', (el) => getComputedStyle(el).overflow);
    expect(overflowOpen).toBe('hidden');

    await page.keyboard.press('Escape');
    await expect(flyout).not.toHaveClass(/open/);
    const overflowClosed = await page.$eval('body', (el) => getComputedStyle(el).overflow);
    expect(overflowClosed === 'auto' || overflowClosed === 'visible').toBeTruthy();
  });
});
