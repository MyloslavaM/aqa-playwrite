import BasePage from "./BasePage"
import SignUpPopUp from "../components/SignUp"

export default class WelcomePage extends BasePage{
    constructor(page) {
        super(page, '/')
        this.signUpButton = page.locator('.btn-primary')
        this.signInButton = page.locator('.header_signin')
    }

    async clickSignUpButtonAndOpenPopUP(){
        
        await this.signUpButton.click()
        const popUp = new SignUpPopUp(this._page)
        return popUp
    }
    async clickSignInButtonAndOpenPopUp(){

        await this.signInButton.click()
        const popUpSignIn = new SignInPopUp(this._page)
        return popUpSignIn
    }

}
