import test from "@playwright/test"
import APIRequests from "../API/APIRequests"

test.describe('Conduit API testing', async () => {
  let apiRequests: APIRequests

  test.beforeEach(async ({ request }) => {
    apiRequests = new APIRequests(request)
  })

  test('Create artice using API', async () => {
    await apiRequests.login()
    await apiRequests.publishArticle()
  })

  test('Like and comment article', async () => {
    await apiRequests.login()
    await apiRequests.publishArticle()
    await apiRequests.putLikeOnArticle()
    await apiRequests.leftCommentOnArticle()
  })
})
