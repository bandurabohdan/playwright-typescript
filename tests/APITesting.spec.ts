import test from "@playwright/test"
import PageFactory from "../Factories/PageFactory"

test.describe('Conduit API testing', async () => {
  let pageFactory: PageFactory

  test.beforeEach(async ({ page }) => {
    pageFactory = new PageFactory(page)
  })

  test('Login and create artice using API', async ({ request }) => {
    const apiRequests = pageFactory.getAPIRequests(request)

    const token = await apiRequests.login()
    await apiRequests.publishArticle(token)
  })
})
