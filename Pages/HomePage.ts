import { Page } from "@playwright/test";

import BasePage from "./BasePage.js";

class HomePage extends BasePage {

  constructor(page: Page){
    super(page)
    this.page = page
  }

  async openSignUpPage(){
    await this.click('a[href="/user/register"]')
  }

  async openSignInPage(){
    await this.click('a[href="/user/login"]')
  }

  async openArticlePage(){
    await this.click('a[href="/editor"]')
  }

  async openProfilePage(){
    await this.click('a.nav-link[href^="/profile"]')
  }
}

export default HomePage;
