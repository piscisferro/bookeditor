import { browser } from 'protractor';
import { AppPageElements } from './elements/app-page.elements';

export class AppPage {

  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  login(): void {
    AppPageElements.LoginLi.isDisplayed().then(function (isVisible) {
      if (isVisible) {
        AppPageElements.LoginButton.click();
        AppPageElements.UsernameInput.sendKeys("admin");
        AppPageElements.PasswordInput.sendKeys("admin");
        AppPageElements.SubmitButton.click();
      }
    });
  }

  getTitleText() {
    return AppPageElements.Title.getText();
  }

  //Nav bar menu
  clickAppNavBar(): void {
    AppPageElements.AppNavBar.click();
  }

  clickBooksNavBar(): void {
    AppPageElements.BooksNavBar.click();
  }

  clickReviewsNavBar(): void {
    AppPageElements.ReviewNavBar.click();
  }

  clickUsersNavBar(): void {
    AppPageElements.UsersNavBar.click();
  }
}
