import { browser, ExpectedConditions } from 'protractor';
import { BookPageElements } from './elements/book-page.elements';

export class BookPage {

  waitForLoading(): void {
    browser.wait(ExpectedConditions.invisibilityOf(BookPageElements.BookDetailsLoading));
  }

  // BookList
  getBookListLenght() {
    return BookPageElements.BookList.getAllElements().count();
  }

  isBookNameDisplayed(name: string) {
    return BookPageElements.BookList.getByChildText(name).isDisplayed();
  }

  clickBook(name: string): void {
    BookPageElements.BookList.getByChildText(name).click();
  }

  clickBookDetailsBackButton(): void {
    BookPageElements.BookDetailsBack.click();
  }

  getBookDetailsBookName() {
    return BookPageElements.BookDetailsTitle.getText();
  }

  getBookDetailsBookAuthor() {
    return BookPageElements.BookDetailsAuthor.getText();
  }

  getBookDetailsSynopsis() {
    return BookPageElements.BookDetailsSynopsis.getText();
  }
}
