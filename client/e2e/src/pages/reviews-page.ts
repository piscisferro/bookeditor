import { browser, ExpectedConditions } from 'protractor';
import { ReviewsPageElements } from './elements/reviews-page.elements';

export class ReviewsPage {

  waitForLoading(): void {
    browser.wait(ExpectedConditions.invisibilityOf(ReviewsPageElements.ReviewDetailsLoading));
  }

  // ReviewList
  getReviewListLenght() {
    return ReviewsPageElements.ReviewList.getAllElements().count();
  }

  isReviewBookNameDisplayed(name: string) {
    return ReviewsPageElements.ReviewList.getByChildText(name).isDisplayed();
  }

  clickReviewOfBook(name: string): void {
    ReviewsPageElements.ReviewList.getByChildText(name).click();
  }

  clickReviewBackButton(): void {
    ReviewsPageElements.ReviewDetailsBack.click();
  }

  getReviewDetailsBookName() {
    return ReviewsPageElements.ReviewDetailsTitle.getText();
  }

  getReviewDetailsBookAuthor() {
    return ReviewsPageElements.ReviewDetailsAuthor.getText();
  }

  getReviewDetailsComments() {
    return ReviewsPageElements.ReviewDetailsComment.getText();
  }
}
