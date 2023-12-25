import {test, expect} from "@playwright/test";
import WelcomePage from "../src/pageObjects/WelcomePage";
import SignUp from "../src/components/SignUp";

test.describe('Registration form verification POM', ()=>{
    let page;
    let welcomePage;
    

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        welcomePage = new WelcomePage(page)
        await welcomePage.visit()
    })

    test('Positive registration', async()=>{
        await welcomePage.signUpButton.click()
        
        await nameInput.fill('Myloslava')

        await name.fill('Myloslava')
        await lastName.fill('Martynova')
        await email.fill('aqa-malina@mailinator.com')
        await password.fill('QWEasdqe11')
        await reEnterPassword.fill('QWEasdqe11')

        const registerButton = page.locator('div button.btn-primary:nth-child(1)')
        await registerButton.click()
    })

    test('Verify error messagesfor all fields', async({page})=>{
        await page.goto('/')
        const signUpButton = page.locator('.hero-descriptor_btn')
        await signUpButton.click()
        const name = page.locator('[id="signupName"]')
        const lastName = page.locator('[id="signupLastName"]')
        const email = page.locator('[id="signupEmail"]')
        const password = page.locator('[id="signupPassword"]')
        const popUpspace = page.locator('.modal-footer')
        const reEnterPassword = page.locator('[id="signupRepeatPassword"]')

        await name.click()
        await lastName.click()
        await expect(page.getByText('Name required')).toBeVisible()

        await email.click()
        await expect(page.getByText('Last name required')).toBeVisible()

        await password.click()
        await expect(page.getByText('Email required')).toBeVisible()

        await reEnterPassword.click()
        await expect(page.getByText('Password required')).toBeVisible()

        await popUpspace.click()
        await expect(page.getByText('Re-enter password required')).toBeVisible()
     })

    test('"Name" Error message if field is invalid', async({page})=>{

        await page.goto('/')
        const signUpButton = page.locator('.hero-descriptor_btn')
        await signUpButton.click()
        const name = page.locator('[id="signupName"]')
        const lastName = page.locator('[id="signupLastName"]')
        const email = page.locator('[id="signupEmail"]')
        const password = page.locator('[id="signupPassword"]')
        const reEnterPassword = page.locator('[id="signupRepeatPassword"]')
        const popUpspace = page.locator('.modal-footer')
        await name.fill('1')
        await lastName.fill('Martynova')
        await email.fill('aqa-malina@mailinator.com')
        await password.fill('QWEasdqe11')
        await reEnterPassword.fill('QWEasdqe11')
        await popUpspace.click()
        
        const errorName = page.locator('.invalid-feedback').nth(0)
        const errorTextName = await errorName.textContent()

        expect(errorTextName).toContain('Name is invalid')
        expect(errorTextName).toContain('Name is invalidName has to be from 2 to 20 characters long')

    })

    test('"Last Name" Error message if field is invalid', async({page})=>{

        await page.goto('/')
        const signUpButton = page.locator('.hero-descriptor_btn')
        await signUpButton.click()
        const name = page.locator('[id="signupName"]')
        const lastName = page.locator('[id="signupLastName"]')
        const email = page.locator('[id="signupEmail"]')
        const password = page.locator('[id="signupPassword"]')
        const reEnterPassword = page.locator('[id="signupRepeatPassword"]')
        const popUpspace = page.locator('.modal-footer')
        await name.fill('Myloslava')
        await lastName.fill('2')
        await email.fill('aqa-malina@mailinator.com')
        await password.fill('QWEasdqe11')
        await reEnterPassword.fill('QWEasdqe11')
        await popUpspace.click()
        
        const errorLastName = page.locator('.invalid-feedback').nth(0)
        const errorTextName = await errorLastName.textContent()

        expect(errorTextName).toContain('Last name is invalid')
        expect(errorTextName).toContain('Last name has to be from 2 to 20 characters long')

    })
    test('"Email" Error message if field is invalid', async({page})=>{

        await page.goto('/')
        const signUpButton = page.locator('.hero-descriptor_btn')
        await signUpButton.click()
        const name = page.locator('[id="signupName"]')
        const lastName = page.locator('[id="signupLastName"]')
        const email = page.locator('[id="signupEmail"]')
        const password = page.locator('[id="signupPassword"]')
        const reEnterPassword = page.locator('[id="signupRepeatPassword"]')
        const popUpspace = page.locator('.modal-footer')
        await name.fill('Myloslava')
        await lastName.fill('Martynova')
        await email.fill('aqa-malinamailinator.com')
        await password.fill('QWEasdqe11')
        await reEnterPassword.fill('QWEasdqe11')
        await popUpspace.click()
        
        const errorEmail = page.locator('.invalid-feedback').nth(0)
        const errorTextName = await errorEmail.textContent()

        expect(errorTextName).toContain('Email is incorrect')


    })
    test('"Password" Error message if field is invalid', async({page})=>{

        await page.goto('/')
        const signUpButton = page.locator('.hero-descriptor_btn')
        await signUpButton.click()
        const name = page.locator('[id="signupName"]')
        const lastName = page.locator('[id="signupLastName"]')
        const email = page.locator('[id="signupEmail"]')
        const password = page.locator('[id="signupPassword"]')
        const popUpspace = page.locator('.modal-footer')

        await name.fill('Myloslava')
        await lastName.fill('Martynova')
        await email.fill('aqa-malina@mailinator.com')
        await password.fill('QWEasdqeiiiii')
       
        await popUpspace.click()
        
        const errorPassword = page.locator('.invalid-feedback').nth(0)
        const errorTextName = await errorPassword.textContent()

        expect(errorTextName).toContain('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    })
    test('"Re-enter Password" Error message if field is invalid', async({page})=>{

        await page.goto('/')
        const signUpButton = page.locator('.hero-descriptor_btn')
        await signUpButton.click()
        const name = page.locator('[id="signupName"]')
        const lastName = page.locator('[id="signupLastName"]')
        const email = page.locator('[id="signupEmail"]')
        const password = page.locator('[id="signupPassword"]')
        const popUpspace = page.locator('.modal-footer')
        const reEnterPassword = page.locator('[id="signupRepeatPassword"]')

        await name.fill('Myloslava')
        await lastName.fill('Martynova')
        await email.fill('aqa-malina@mailinator.com')
        await password.fill('QWEasdqe11')
        await reEnterPassword.fill('QWEasrrrrrr')
       
        await popUpspace.click()
        
        const errorReEnterPassword = page.locator('.invalid-feedback').nth(0)
        const errorTextName = await errorReEnterPassword.textContent()

        expect(errorTextName).toContain('Passwords do not match')
    })
})