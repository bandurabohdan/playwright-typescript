import { faker } from "@faker-js/faker"
import { APIRequestContext, expect } from "@playwright/test"

class APIRequests {

  request: APIRequestContext
  base_url: string
  articleTitle: string
  articleDescription: string
  articleBody: string
  token: string | undefined
  slug: string
  commentId: number

  constructor(request: APIRequestContext){
    this.request = request
    this.articleTitle = faker.lorem.slug({ min: 1, max: 3})
    this.articleDescription = faker.lorem.sentence({ min: 1, max: 3})
    this.articleBody = faker.lorem.paragraph({ min: 1, max: 3})
    this.token
    this.slug
    this.commentId
  }

  async post(link: string, body: any = {}) {
    let response = await this.request.post(link, {
      headers: this.token ? {'Content-Type': 'application/json', 'Authorization': `Token ${this.token}`} : {'Content-Type': 'application/json'},
      data: body ? JSON.stringify(body) : {}
    })

    return await response.json()
  }

  async login() {

    const response = await this.post(`/api/users/login`, {
      user: {
        email: process.env.USER_EMAIL as string,
        password: process.env.USER_PASSWORD as string
      }
    })

    // @ts-ignore
    const { username, email, token } = response.user

    expect(username).toEqual(process.env.USERNAME)
    expect(email).toEqual(process.env.USER_EMAIL)
    expect(typeof(token)).toBe('string')

    this.token = token
  }

  async publishArticle() {

    const response = await this.post(`/api/articles`, {
      article: {
        title: this.articleTitle,
        description: this.articleDescription,
        body: this.articleBody,
        tagList: []
      }
    })

    //@ts-ignore
    const { slug, title, description, body, tagList, author } = response.article

    expect(slug).toContain(this.articleTitle.toLowerCase())
    expect(title).toEqual(this.articleTitle.toLowerCase())
    expect(description).toEqual(this.articleDescription)
    expect(body).toEqual(this.articleBody)
    expect(tagList).toHaveLength(0)
    expect(author.username).toEqual(process.env.USERNAME)

    this.slug = slug
  }

  async putLikeOnArticle() {
    const response = await this.post(`/api/articles/${this.slug}/favorite`)

    //@ts-ignore
    const {favorited, favoritesCount} = response.article

    expect(favorited).toBe(true)
    expect(favoritesCount).toEqual(1)
  }

  async leftCommentOnArticle() {

    const response = await this.post(`/api/articles/${this.slug}/comments`, {
      comment: {
          body: this.articleDescription
      }
    })

    //@ts-ignore
    const {id, body, author} = response.comment

    expect(typeof(id)).toBe('number')
    expect(body).toEqual(this.articleDescription)
    expect(author.username).toEqual(process.env.USERNAME)

    this.commentId = id
  }
}

export default APIRequests
