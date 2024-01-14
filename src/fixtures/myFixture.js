import { test as base } from "@playwright/test";
import WelcomePage from "../pageObjects/welcomePage/WelcomePage";
import { USERS } from "../data/users";
import GaragePage from "../pageObjects/garagePage/GaragePage";
import { STORAGE_STATET_USER_PATH } from "../data/constants/storageState";

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.visit();
    const signInPopup = await welcomePage.clickSignInButtonAndOpenPopup();
    const garagePage = await signInPopup.loginWithCredentials(
      USERS.MILA_M.email,
      USERS.MILA_M.password
    );

    use(garagePage);
  },

  userGaragePageWithStorage: async ({ browser }, use) => {
    const ctx = await browser.newContext({
      storageState: STORAGE_STATET_USER_PATH,
    });
    const page = await ctx.newPage();
    const garagePage = new GaragePage(page);
    await garagePage.visit();

    // Usage
    await use(garagePage);

    // Clean up
    await ctx.close();
  },
});
