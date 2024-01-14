import { expect } from "@playwright/test";
import BasePage from "../BasePage.js";
import AddCarPopup from "../garagePage/components/AddCarPopup.js";

export default class GaragePage extends BasePage {
  _editIcon = ".car_edit";
  _popUpeditCar = ".modal-content";
  _removeCarButton = ".btn-outline-danger";
  _removeConfirmationButton = ".btn-danger";

  constructor(page) {
    super(page, "/panel/garage");
    this.addCarButton = this._page.locator("button", { hasText: "Add car" });
    this.editIcon = this._page.locator(this._editIcon);
    this.removeCarButton = this._page.locator(this._removeCarButton);
    this.removeCarConfirm = this._page.locator(this._removeConfirmationButton);
  }
  async openAddCarPopup() {
    await this.addCarButton.click();
    return new AddCarPopup(this._page);
  }
  async deleteFirstCarFromList() {
    await this._page.waitForSelector(this._editIcon); // Wait for edit icon to be available
    await this.editIcon.click();
    await this.removeCarButton.click();
    await this.removeCarConfirm.click();
    return new GaragePage(this._page);
  }
}
