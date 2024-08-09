import { test as setup } from '@playwright/test';
import SignInPage from '../Pages/SignInPage';

const nonAuthFile = 'playwright/.auth/non_auth.json'
const authFile = 'playwright/.auth/auth.json';

setup('setup user states', async ({ page }) => {

  await page.context().storageState({ path: nonAuthFile })

  const signInPage = new SignInPage(page)

  await page.goto('/user/login')

  await signInPage.login()

  await page.context().storageState({ path: authFile });
});
