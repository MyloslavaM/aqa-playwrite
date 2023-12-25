
export default class SignUp {
    constructor(page){
        this.container = page.locator('.modal-content')
        this.nameInput = page.locator('[id="signupName"]')
        this.lastNameInput = page.locator('[id="signupLastName"]')
        this.emailInput = page.locator('[id="signupEmail"]')
        this.passwordInput = page.locator('[id="signupPassword"]')
        this.reEnterPassword = page.locator('[id="signupRepeatPassword"]')
    }
}


