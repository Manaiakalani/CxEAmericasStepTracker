import { test, expect } from '@playwright/test';

declare global {
  interface Window {
    stepTracker: {
      sanitizeHTML: (str: string) => string;
      escapeHtml: (value: unknown) => string;
      currentUser?: { name?: string };
    };
  }
}

const ENTITY_PAYLOAD = '&lt;img src=x onerror=alert(1)&gt;';

test.describe('HTML sanitization', () => {
  test('entity-encoded payload in a name does not become live markup', async ({ page }) => {
    await page.route('**/@supabase/**', route => route.abort());
    await page.addInitScript((payload) => {
      const user = {
        id: 'xss-user',
        name: payload,
        team: 'CARE',
        dailyGoal: 8000,
        steps: { '2025-09-25': 6500 },
        totalSteps: 6500,
      };
      localStorage.setItem('stepTrackerUsesSupabase', 'false');
      localStorage.setItem('stepTrackerUsers', JSON.stringify([user]));
      localStorage.setItem('currentStepTrackerUser', user.id);
    }, ENTITY_PAYLOAD);

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => {
      return typeof window.stepTracker?.sanitizeHTML === 'function'
        && typeof window.stepTracker?.escapeHtml === 'function';
    });

    const sanitized = await page.evaluate((payload) => {
      return window.stepTracker.sanitizeHTML(payload);
    }, ENTITY_PAYLOAD);
    expect(sanitized).not.toMatch(/[<>]/);
    expect(sanitized.toLowerCase()).not.toContain('<img');

    const storedName = await page.evaluate(() => window.stepTracker.currentUser?.name || '');
    expect(storedName).not.toMatch(/[<>]/);

    await page.locator('.nav-btn[data-tab="leaderboard"]').click();
    const leaderboard = page.locator('#leaderboardList');
    await expect(leaderboard).toBeVisible();
    await expect(leaderboard.locator('img')).toHaveCount(0);
    await expect(leaderboard.locator('script')).toHaveCount(0);
    await expect(leaderboard.locator('[onerror]')).toHaveCount(0);

    const nameHtml = await page.locator('.leaderboard-name').first().evaluate((el) => el.innerHTML);
    expect(nameHtml.toLowerCase()).not.toContain('<img');
    const nameText = await page.locator('.leaderboard-name').first().textContent();
    expect(nameText || '').not.toMatch(/<img/i);

    await page.locator('.nav-btn[data-tab="teams"]').click();
    await expect(page.locator('#teamLeaderboard')).toBeVisible();
    await expect(page.locator('#teamLeaderboard img')).toHaveCount(0);
  });
});
