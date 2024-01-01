import BaseComponent from "./BaseComponent";

export default class SignInPopUp extends BaseComponent{
   _emailInputSelector = '#signinEmail'
   _emailPasswordSelector = '#signinPassword'
   _rememberMeCheckBoxSelector = '#remember'
   _loginButtonSelector = '.justify-content-between .btn-primary'
   _forgotPasswordSelector = '#'

   constructor(page){

    super(page, page.locator('app-signin-modal'));
    
    this.container = page.locator('[_nghost-yvm-c52]')
    this.emailInput = this.container.locator(this._emailInputSelector)
    this.passwordIntup = this.container.locator(this._emailPasswordSelector)
    this.logInButton = this.container.locator(this._loginButtonSelector)
   }
}