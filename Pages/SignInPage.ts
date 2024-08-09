import { Page } from "@playwright/test";

import BasePage from "./BasePage.js";

class SignInPage extends BasePage {

  constructor(page: Page) {
    super(page)
    this.page = page
  }

  async enterSignInData() {
    await this.write('input[placeholder="Email"]', process.env.USER_EMAIL as string)
    await this.write('input[placeholder="Password"]', process.env.USER_PASSWORD as string)
  }

  async clickSignInButton() {
    await this.click('button[type="submit"]')
  }

  async login() {
    await this.enterSignInData()
    await this.clickSignInButton()
    await this.isUserSignedIn(process.env.USERNAME as string)
  }
}

export default SignInPage
