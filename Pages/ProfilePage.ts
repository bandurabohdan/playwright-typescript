import { Page, expect } from "@playwright/test";

import BasePage from "./BasePage.js";

class ProfilePage extends BasePage {

  constructor(page: Page){
    super(page)
    this.page = page
  }

  async openFavoritesPostsTab() {
    const favoritePostsTab = await this.getElementByText('My Posts')
    await this.click(favoritePostsTab)
  }

  async openMyPostsTab() {
    const myPostsTab = await this.getElementByText('Favorited Posts')
    await this.click(myPostsTab)
  }

  async getArticleTitle(article: string) {
    return await this.getText(article)
  }

  async isArticleAdded(expectedTtitle: string) {
    await this.page.reload({ waitUntil: 'load' })
    const articleTitle = await this.getArticleTitle('div[class="article-preview"]:nth-child(2) h1')
    articleTitle && expect(articleTitle.toLowerCase()).toEqual(`article title: ${expectedTtitle.toLowerCase()}`)
  }
}

export default ProfilePage;
