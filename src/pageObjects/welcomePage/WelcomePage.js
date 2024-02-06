import BasePage from "../BasePage"
import SignUpPopUp from "./components/SignUp.js"
import SignInPopup from "./components/SignIn.js";
import GaragePage from "../garagePage/GaragePage.js"

export default class WelcomePage extends BasePage{
    constructor(page) {
        super(page, '/', '.header_signin')
    }

  
    async clickSignInButtonAndOpenPopup(){
        await this.header.signInButton.click()
        const popup = new SignInPopup(this._page)
        return popup
    }

    async loginAsGuest(){
        await this.header.guestLoginButton.click()
        return new GaragePage(this._page)
    }
}

