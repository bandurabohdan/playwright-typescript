import { test } from '@playwright/test';
import PageFactory from '../Factories/PageFactory';
import HomePage from '../Pages/HomePage';

test.describe('Test suit for conduit', async () => {

  let pageFactory: PageFactory
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    pageFactory = new PageFactory(page)
    homePage = new HomePage(page)

    await homePage.navigateTo('/')
  })

  test('Sign up new user', async () => {
    const signUpPage = pageFactory.getSignUpPage()

    await homePage.openSignUpPage()
    await signUpPage.register()
  })

  test('Sign in with existing user', async () => {
    const signInPage = pageFactory.getSignInPage()

    await homePage.openSignInPage()
    await signInPage.login()
  });

  test('Create article', async () => {
    const signInPage = pageFactory.getSignInPage()
    const articlePage = pageFactory.getArticlePage()
    const profilePage = pageFactory.getProfilePage()

    await homePage.openSignInPage()
    await signInPage.login()
    await homePage.openArticlePage()
    const articleTitle = await articlePage.publishArticle()
    await homePage.openProfilePage()
    await profilePage.isArticleAdded(articleTitle)
  })

  test('Login and create artice using API', async () => {
    const signInPage = pageFactory.getSignInPage()
    const articlePage = pageFactory.getArticlePage()

    const token = await signInPage.loginUsingAPI()
    await articlePage.publishArticleUsingAPI(token)
  })
})
