import BaseComponent from "./BaseComponent"

 
export default class SignUpPopUp extends BaseComponent{
    _nameInputSelector = '#signupName'
    _lastNameInputSelector = '#signupLastName'
    _emailInputSelector = '#signupEmail'
    _passwordInputSelector = '#signupPassword'
    _rePasswordInputSelector = '#signupRepeatPassword'
    _errorMessageSelector = "div.invalid-feedback"
    _registerButtonSelector = '.btn.btn-primary'

    constructor(page){
        super(page, page.locator('app-signup-modal'));

        this.container = page.locator('.modal-content')
        this.nameInput = this.container.locator(this._nameInputSelector)
        this.lastNameInput = this.container.locator(this._lastNameInputSelector)
        this.emailInput = this.container.locator(this._emailInputSelector)
        this.passwordInput = this.container.locator(this._passwordInputSelector)
        this.rePasswordInput = this.container.locator(this._rePasswordInputSelector)
        this.registerButton = this.container.locator(this._registerButtonSelector)

        this.popUpBody = page.locator('.modal-body')

        this.nameInputError = this.container.locator(`${this._nameInputSelector} + ${this._errorMessageSelector}`)
        this.lastNameInputError = this.container.locator(`${this._lastNameInputSelector} + ${this._errorMessageSelector}`)
        this.emailInputError = this.container.locator(`${this._emailInputSelector} + ${this._errorMessageSelector}`)
        this.passwordInputError = this.container.locator(`${this._passwordInputSelector} + ${this._errorMessageSelector}`)
        this.rePasswordInputError = this.container.locator(`${this._rePasswordInputSelector} + ${this._errorMessageSelector}`)

        this.alertMessage = this.container.locator(".alert-danger")


    }
}




