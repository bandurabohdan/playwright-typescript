import { test } from '@playwright/test';
import PageFactory from '../Factories/PageFactory';
import HomePage from '../Pages/HomePage';

test.describe('Sign in and Sign up', async () => {
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
})
