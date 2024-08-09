import 'dotenv/config'
import { APIRequestContext, Page } from '@playwright/test';
import HomePage from '../Pages/HomePage';
import SignUpPage from '../Pages/SignUpPage';
import SignInPage from '../Pages/SignInPage';
import ArticlePage from '../Pages/ArticlePage';
import ProfilePage from '../Pages/ProfilePage';
import APIRequests from '../Pages/APIRequests'

class PageFactory {

  page: Page

  constructor(page: Page){
    this.page = page
  }

  getHomePage() {
    return new HomePage(this.page)
  }

  getSignUpPage() {
    return new SignUpPage(this.page)
  }

  getSignInPage(){
    return new SignInPage(this.page)
  }

  getArticlePage(){
    return new ArticlePage(this.page)
  }

  getProfilePage(){
    return new ProfilePage(this.page)
  }

  getAPIRequests(request: APIRequestContext){
    return new APIRequests(request)
  }
}

export default PageFactory;
