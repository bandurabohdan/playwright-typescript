import { Page } from "@playwright/test";

import BasePage from "./BasePage.js";

class HomePage extends BasePage {

  constructor(page: Page){
    super(page)
    this.page = page
  }

  async openSignUpPage(){
    await this.click('a[href="/user/register"]')
    await this.page.waitForLoadState('load')
  }

  async openSignInPage(){
    await this.click('a[href="/user/login"]')
    await this.page.waitForLoadState('load')
  }

  async openArticlePage(){
    await this.click('a[href="/editor"]')
    await this.page.waitForLoadState('load')
  }

  async openProfilePage(){
    await this.click('a.nav-link[href^="/profile"]')
    await this.page.waitForLoadState('load')
  }
}

export default HomePage;
