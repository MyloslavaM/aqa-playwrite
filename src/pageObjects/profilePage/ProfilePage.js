import BasePage from "../BasePage.js";


export default class ProfilePage extends BasePage {
    constructor(page) {
        super(page, "/panel/profile");
        this.editProfileButton = this._page.locator("button", { hasText: "Edit Profile" });
    }


    async editProfilePage() {
        await this.editProfileButton.click();
        return new ProfilePage(this._page);
    }
}
