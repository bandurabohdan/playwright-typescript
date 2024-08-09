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

  async publishArticleUsingAPI(token: string) {
    let response = await fetch(`${process.env.BASE_API_URL}/articles`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`},
      body: JSON.stringify({
        article: {
          title: this.articleTitle,
          description: this.articleDescription,
          body: this.articleBody,
          tagList: []
        }
      })
    })

    response = await response.json()

    //@ts-ignore
    const { slug, title, description, body, tagList, author } = response.article

    expect(slug).toContain(this.articleTitle.toLowerCase())
    expect(title).toEqual(this.articleTitle.toLowerCase())
    expect(description).toEqual(this.articleDescription)
    expect(body).toEqual(this.articleBody)
    expect(tagList).toHaveLength(0)
    expect(author.username).toEqual(process.env.USERNAME)

  }
}

export default ArticlePage;
