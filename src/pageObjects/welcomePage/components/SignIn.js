import BaseComponent from "../../../components/BaseComponent.js";
import GaragePage from "../../garagePage/GaragePage.js";


export default class SignInPopUp extends BaseComponent{
   _emailInputSelector = '#signinEmail'
   _emailPasswordSelector = '#signinPassword'
   _rememberMeCheckBoxSelector = '#remember'
   _submitButton = '.justify-content-between .btn-primary'
   

   constructor(page){

    super(page, page.locator('app-signin-modal'));
    
    this.emailInput = this.container.locator(this._emailInputSelector)
    this.passwordInput = this.container.locator(this._emailPasswordSelector)
    this.logInButton = this.container.locator(this._submitButton)
   }
  
   async loginWithCredentials(email, password){
      await this.fill(email, password)
      await this.logInButton.click()
      return new GaragePage(this._page)
   }
   async fill(email, password){
      await this.emailInput.fill(email)
      await this.passwordInput.fill(password)
  }
}