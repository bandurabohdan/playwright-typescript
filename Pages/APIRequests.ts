import { faker } from "@faker-js/faker"
import { APIRequestContext, expect } from "@playwright/test"

class APIRequests {

  request: APIRequestContext
  base_url: string
  articleTitle: string
  articleDescription: string
  articleBody: string

  constructor(request: APIRequestContext){
    this.request = request
    this.articleTitle = faker.lorem.slug({ min: 1, max: 3})
    this.articleDescription = faker.lorem.sentence({ min: 1, max: 3})
    this.articleBody = faker.lorem.paragraph({ min: 1, max: 3})
  }

  async login() {

    let response = await this.request.post(`/api/users/login`, {
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({
        user: {
          email: process.env.USER_EMAIL,
          password: process.env.USER_PASSWORD
        }
      })
    })

    response = await response.json()

    // @ts-ignore
    const { username, email, token } = response.user

    expect(username).toEqual(process.env.USERNAME)
    expect(email).toEqual(process.env.USER_EMAIL)
    expect(typeof(token)).toBe('string')

    return token
  }

  async publishArticle(token: string) {

    let response = await this.request.post(`/api/articles`, {
      headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`},
      data: JSON.stringify({
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

export default APIRequests
