import { faker } from "@faker-js/faker";
import { Page, expect } from "@playwright/test";

import BasePage from "./BasePage.js";

class ArticlePage extends BasePage {

  articleTitle: string
  articleDescription: string
  articleBody: string

  constructor(page: Page){
    super(page)
    this.page = page
    this.articleTitle = faker.lorem.slug({ min: 1, max: 3})
    this.articleDescription = faker.lorem.sentence({ min: 1, max: 3})
    this.articleBody = faker.lorem.paragraph({ min: 1, max: 3})
  }

  async enterArticleData(articleTitle: string, articleDescription: string, articleBody: string){
    await this.write('input[placeholder="Article Title"]', articleTitle)
    await this.write(`input[placeholder="What's this article about?"]`, articleDescription)
    await this.write('textarea[placeholder="Write your article (in markdown)"]', articleBody)

    return this.articleTitle
  }

  async clickPublishArticle(){
    await this.click('button[type="button"]')
  }

  async publishArticle(){
    await this.enterArticleData(this.articleTitle, this.articleDescription, this.articleBody)
    await this.clickPublishArticle()
    await this.expectToHaveText('h1', this.articleTitle.toLowerCase())

    return this.articleTitle
  }
}

export default ArticlePage;
