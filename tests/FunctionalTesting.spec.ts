import test from "@playwright/test"
import PageFactory from "../Factories/PageFactory"
import HomePage from "../Pages/HomePage"


test.describe('Conduit functional testing', async () => {
  test.use({ storageState: 'playwright/.auth/auth.json'})
  let pageFactory: PageFactory
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    pageFactory = new PageFactory(page)
    homePage = new HomePage(page)
    await homePage.navigateTo('/')
  })

  test('Create article', async () => {
    const articlePage = pageFactory.getArticlePage()
    const profilePage = pageFactory.getProfilePage()

    await homePage.openArticlePage()
    const articleTitle = await articlePage.publishArticle()
    await homePage.openProfilePage()
    await profilePage.isArticleAdded(articleTitle)
  })
})
