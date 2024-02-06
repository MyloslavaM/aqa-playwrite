import Header from "../components/Header.js";

export default class BasePage {
  constructor(page, url, waitPageSelector = "html") {
    this._page = page;
    this._waitPageSelector = waitPageSelector;
    this._url = url;
    this.header = new Header(page);
  }

  get page() {
    return this._page;
  }

  async visit() {
    await this._page.goto(targetURL.href);
    await this.waitLoaded();
  }

  async waitLoaded() {
    await this._page.locator(this._waitPageSelector).waitFor();
  }
}