
export default class WelcomePage {
    constructor(page) {
        this._page = page
        this._url = '/'
        this.signUpButton = paje.locator('.btn-primary')
        this.signInButton = paje.locator('.header_signin')
    }

    async visit(){
        await this._page.goto(this._url)
    }
}
