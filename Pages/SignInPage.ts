import { Page, expect } from "@playwright/test";

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

  async loginUsingAPI() {

    let response = await fetch(`${process.env.BASE_API_URL}/users/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: {
          email: process.env.USER_EMAIL,
          password: process.env.USER_PASSWORD
        }
      })
    })

    response = await response.json()

    //@ts-ignore
    const { username, email, token } = response.user

    expect(username).toEqual(process.env.USERNAME)
    expect(email).toEqual(process.env.USER_EMAIL)
    expect(typeof(token)).toBe('string')

    return token
  }
}

export default SignInPage
