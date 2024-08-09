import { Page, expect, Locator } from '@playwright/test';

class BasePage {

  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async navigateTo(link: string) {
    await this.page.goto(link)
  }

  async isUserSignedIn(userName: string){
    await this.expectToHaveText('a.nav-link[href^="/profile"]', userName.toLowerCase())
  }

  async getElement(selector: string) {
    let element: Locator = this.page.locator(selector)
    await element.waitFor({ state: 'visible'})
    await element.scrollIntoViewIfNeeded()

    return element
  }

  async getElementByText(text: string) {
    let element: Locator = this.page.getByText(text)
    await element.waitFor({ state: 'visible'})
    await element.scrollIntoViewIfNeeded()

    return element
  }

  async click(selector: string | Locator) {
    let element: any;

    if(typeof(selector) === 'string'){
      element = await this.getElement(selector)
    }
    await element.click()
  }

  async write(locator: string, text: string) {
    const element = await this.getElement(locator)
    await element.fill(text)
  }

  async getText(selector: string) {
    let element: Locator;
    let result: string | null;

    element = await this.getElement(selector)
    result = await element.textContent()

    return result
  }

  async expectToHaveText(selector: string, text: string) {
    await expect(this.page.locator(selector)).toHaveText(text)
  }
}

export default BasePage;
