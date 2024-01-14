import { test as setup, expect } from '@playwright/test';
import WelcomePage from '../../src/pageObjects/welcomePage/WelcomePage';
import {USERS} from "../../src/data/users";
import {STORAGE_STATET_USER_PATH} from "../../src/data/constants/storageState"
import GaragePage from "../../src/pageObjects/garagePage/GaragePage";
import signInPopUp from '../../src/pageObjects/welcomePage/components/SignIn';


setup('Login as a user and save storage state', async ({page}) => {
    const welcomePage = new WelcomePage(page)
    await welcomePage.visit()
    
    const signInPopup = await welcomePage.clickSignInButtonAndOpenPopup()
    const garagePage = await signInPopup.loginWithCredentials(USERS.MILA_M.email, USERS.MILA_M.password)
    await expect(garagePage.addCarButton).toBeVisible()
    await page.context().storageState({
        path: STORAGE_STATET_USER_PATH
    })
});