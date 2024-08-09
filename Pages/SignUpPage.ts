import { Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

import BasePage from "./BasePage.js";

class SignUpPage extends BasePage {

  firstName: string
  lastName: string
  userName: string

  constructor(page: Page){
    super(page)
    this.page = page
    this.firstName = faker.person.firstName()
    this.lastName = faker.person.lastName()
    this.userName = `${this.firstName}_${this.lastName}`
  }

  async enterSignUpData(userName: string, lastName: string){
    await this.write('input[placeholder="Username"]', userName)
    await this.write('input[placeholder="Email"]', `${lastName}${Date.now()}@gmail.com`)
    await this.write('input[placeholder="Password"]', lastName)
  }

  async clickSignUpButton() {
    await this.click('button[type="submit"]')
  }

  async register(){
    await this.enterSignUpData(this.userName, this.lastName)
    await this.clickSignUpButton()
    await this.isUserSignedIn(this.userName)
  }

}

export default SignUpPage;
