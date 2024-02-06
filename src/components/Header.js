import BaseComponent from "./BaseComponent.js";


export default class Header  extends  BaseComponent{
    constructor(page) {
        super(page, page.locator('.header_right'))
        this.signInButton = this.container.locator('.btn .btn-outline-white .header_signin')
        this.guestLoginButton = this.container.locator('button.-guest')
    }
}