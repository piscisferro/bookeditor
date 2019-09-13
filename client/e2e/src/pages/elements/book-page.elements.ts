import { LocatorHelper } from '../helper/locator-helper';

export class BookPageElements {
  // BookList
  static BookList: LocatorHelper = new LocatorHelper("//ul[contains(@class, 'list-books')]/a");
  static BookDetails: LocatorHelper = new LocatorHelper("//book-detail");
  static BookDetailsTitle: LocatorHelper = new LocatorHelper("//book-detail//h1");
  static BookDetailsAuthor: LocatorHelper = new LocatorHelper("//book-detail//em");
  static BookDetailsSynopsis: LocatorHelper = new LocatorHelper("//book-detail//section");
  static BookDetailsBack: LocatorHelper = new LocatorHelper("//book-details//i");
  static BookDetailsLoading: LocatorHelper = new LocatorHelper("//ng-template[@id='loadingBookDetail']");
}
