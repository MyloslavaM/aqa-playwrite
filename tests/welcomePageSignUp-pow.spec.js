import {test, expect} from "@playwright/test";
import WelcomePage from "../src/pageObjects/WelcomePage";


test.describe.only('Registration form verification POM', ()=>{
    let page;
    let welcomePage;
    

    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext()

        page = await context.newPage();
        welcomePage = new WelcomePage(page)
        await welcomePage.visit()
    })

    test('Positive registration', async()=>{
        const popUp = await welcomePage.clickSignUpButtonAndOpenPopUP()

        
        await popUp.nameInput.fill('Myloslava')
        await popUp.lastNameInput.fill('Martynova')
        await popUp.emailInput.fill('aqa-malina@mailinator.com')
        await popUp.passwordInput.fill('QWEasdqe11')
        await popUp.rePasswordInput.fill('QWEasdqe11')
        await popUp.registerButton.click()

        await expect(page).toHaveURL('/panel/garage')
    })

    test('Verify error messagesfor all fields', async({page})=>{
        const popUp = await welcomePage.clickSignUpButtonAndOpenPopUP()

        await popUp.nameInput.click()
        await popUp.lastNameInput.click()

        await expect(popUp.nameInputError).toHaveText('Name required');

        await popUp.emailInput.click()
        await expect(popUp.lastNameInputError).toHaveText('Last name required');
       
        await popUp.passwordInput.click()
        await expect(popUp.emailInputError).toHaveText('Email required');

        await popUp.rePasswordInput.click()
        await expect(popUp.passwordInputError).toHaveText('Password required');

        await popUp.lastNameInput.click()
        await expect(popUp.rePasswordInputError).toHaveText('Re-enter password required');
     })

    test('"Name" Error message if field is invalid', async({page})=>{

        const popUp = await welcomePage.clickSignUpButtonAndOpenPopUP()
        await popUp.nameInput.fill('1')
        await popUp.lastNameInput.fill('Martynova')
        await popUp.emailInput.fill('aqa-malina@mailinator.com')
        await popUp.passwordInput.fill('QWEasdqe11')
        await popUp.rePasswordInput.fill('QWEasdqe11')
       
        await expect(popUp.nameInputError).toHaveText(`Name is invalid` && `Name is invalidName has to be from 2 to 20 characters long`);

    })

    test('"Last Name" Error message if field is invalid', async({page})=>{

        const popUp = await welcomePage.clickSignUpButtonAndOpenPopUP()
        await popUp.nameInput.fill('Myloslava')
        await popUp.lastNameInput.fill('2')
        await popUp.emailInput.fill('aqa-malina@mailinator.com')
        await popUp.passwordInput.fill('QWEasdqe11')
        await popUp.rePasswordInput.fill('QWEasdqe11')
       
        await expect(popUp.lastNameInputError).toHaveText(`Last name is invalid` && `Last name has to be from 2 to 20 characters long`);


    })
    test('"Email" Error message if field is invalid', async({page})=>{
        const popUp = await welcomePage.clickSignUpButtonAndOpenPopUP()
        await popUp.nameInput.fill('Myloslava')
        await popUp.lastNameInput.fill('Martynova')
        await popUp.emailInput.fill('aqa-malinamailinator.com')
        await popUp.passwordInput.fill('QWEasdqe11')
        await popUp.rePasswordInput.fill('QWEasdqe11')
       
        await expect(popUp.emailInputError).toHaveText('Email is incorrect');

    })
    test('"Password" Error message if field is invalid', async({page})=>{

        const popUp = await welcomePage.clickSignUpButtonAndOpenPopUP()
        await popUp.nameInput.fill('Myloslava')
        await popUp.lastNameInput.fill('Martynova')
        await popUp.emailInput.fill('aqa-malina@mailinator.com')
        await popUp.passwordInput.fill('QWEasdqeiiiii')
        await popUp.rePasswordInput.click()
    
       await expect(popUp.passwordInputError)
       .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');


    })
    test('"Re-enter Password" Error message if field is invalid', async({page})=>{

        const popUp = await welcomePage.clickSignUpButtonAndOpenPopUP()
        await popUp.nameInput.fill('Myloslava')
        await popUp.lastNameInput.fill('Martynova')
        await popUp.emailInput.fill('aqa-malina@mailinator.com')
        await popUp.passwordInput.fill('QWEasdqe11')
        await popUp.rePasswordInput.fill('QWEasrrrrrr')
        await popUp.nameInput.click()
    
       await expect(popUp.rePasswordInputError).toHaveText('Passwords do not match')
       
    })
})