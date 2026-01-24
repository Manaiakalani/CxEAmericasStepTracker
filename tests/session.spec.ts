import { test, expect } from '@playwright/test';

test.describe('Session persistence', () => {
  test('persists current user across reload using localStorage (offline mode)', async ({ page }) => {
    await page.addInitScript(() => {
      const user = { id: 'user-1', name: 'Playwright Tester', team: 'CARE', dailyGoal: 8000, steps: {}, totalSteps: 0 };
      localStorage.setItem('stepTrackerUsesSupabase', 'false');
      localStorage.setItem('stepTrackerUsers', JSON.stringify([user]));
      localStorage.setItem('currentStepTrackerUser', user.id);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const isWelcomeHidden = await page.$eval('#welcomeScreen', (el) => getComputedStyle(el).display === 'none');
    expect(isWelcomeHidden).toBeTruthy();

    const currentUserName = await page.evaluate(() => window.stepTracker?.currentUser?.name);
    expect(currentUserName).toBe('Playwright Tester');
  });
});
