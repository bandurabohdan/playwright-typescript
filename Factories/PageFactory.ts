import 'dotenv/config'
import { Page } from '@playwright/test';
import HomePage from '../Pages/HomePage';
import SignUpPage from '../Pages/SignUpPage';
import SignInPage from '../Pages/SignInPage';
import ArticlePage from '../Pages/ArticlePage';
import ProfilePage from '../Pages/ProfilePage';

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
}

export default PageFactory;
