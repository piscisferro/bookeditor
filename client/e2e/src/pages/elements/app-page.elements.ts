import { LocatorHelper } from '../helper/locator-helper';

export class AppPageElements {
  // Welcome Page
  static Title: LocatorHelper = new LocatorHelper("//h1");

  // Login
  static LoginLi: LocatorHelper = new LocatorHelper("//ul[2]/li[1]")
  static LoginButton: LocatorHelper = new LocatorHelper("//a[contains(@href, 'login')]");
  static UsernameInput: LocatorHelper = new LocatorHelper("//input[@id = 'username']");
  static PasswordInput: LocatorHelper = new LocatorHelper("//input[@id = 'password']");
  static SubmitButton: LocatorHelper = new LocatorHelper("//button[@type='submit']");

  // Nav bar
  static BooksNavBar: LocatorHelper = new LocatorHelper("//div[@id='navbarSupportedContent']//a[@ng-reflect-router-link='/books']");
  static ReviewNavBar: LocatorHelper = new LocatorHelper("//div[@id='navbarSupportedContent']//a[@ng-reflect-router-link='/reviews']");
  static UsersNavBar: LocatorHelper = new LocatorHelper("//div[@id='navbarSupportedContent']//a[@ng-reflect-router-link='/user-base']");
  static AppNavBar: LocatorHelper = new LocatorHelper("//a[@href='/bookeditor/welcome']");

}
