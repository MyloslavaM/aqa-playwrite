import {test, expect} from "@playwright/test";

test.describe('Registration form verification', ()=>{

    test('Positive registration', async({page})=>{
        await page.goto('/')
        const signUpButton = page.locator('.hero-descriptor_btn')
        await signUpButton.click()
        const name = page.locator('[id="signupName"]')
        const lastName = page.locator('[id="signupLastName"]')
        const email = page.locator('[id="signupEmail"]')
        const password = page.locator('[id="signupPassword"]')
        const reEnterPassword = page.locator('[id="signupRepeatPassword"]')

        await name.fill('Myloslava')
        await lastName.fill('Martynova')
        await email.fill('aqa-malina@mailinator.com')
        await password.fill('QWEasdqe11')
        await reEnterPassword.fill('QWEasdqe11')

        const registerButton = page.locator('div button.btn-primary:nth-child(1)')
        await registerButton.click()
    })

    test('Verify error messages', async({page})=>{
        await page.goto('/')
        const signUpButton = page.locator('.hero-descriptor_btn')
        await signUpButton.click()
        const name = page.locator('[id="signupName"]')
        const lastName = page.locator('[id="signupLastName"]')
        const email = page.locator('[id="signupEmail"]')
        const password = page.locator('[id="signupPassword"]')
        const reEnterPassword = page.locator('[id="signupRepeatPassword"]')

        await name.click()
        await lastName.click()
        const errorName = page.locator('.invalid-feedback').nth(0)
        await errorName.isVisible()

        await email.click()
        const errorLastName = page.locator('.invalid-feedback').nth(1)
        await errorLastName.isVisible()

        await password.click()
        const errorEmail = page.locator('.invalid-feedback').nth(2)
        await errorEmail.isVisible()

        await reEnterPassword.click()
        const errorPassword = page.locator('.invalid-feedback').nth(3)
        await errorPassword.isVisible()

        const registerButton = page.locator('div button.btn-primary:nth-child(1)')
        await registerButton.isDisabled.click()
        const errorReEnterPassword = page.locator('.invalid-feedback').nth(4)
        await errorReEnterPassword.isVisible



    })

})