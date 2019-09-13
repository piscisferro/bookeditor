import { LocatorHelper } from '../helper/locator-helper';

export class ReviewsPageElements {
  // Review List
  static ReviewList: LocatorHelper = new LocatorHelper("//ul[contains(@class, 'list-reviews')]/a");
  static ReviewDetails: LocatorHelper = new LocatorHelper("//review-detail");
  static ReviewDetailsTitle: LocatorHelper = new LocatorHelper("//review-detail//h1");
  static ReviewDetailsAuthor: LocatorHelper = new LocatorHelper("//review-detail//em");
  static ReviewDetailsComment: LocatorHelper = new LocatorHelper("//review-detail//section");
  static ReviewDetailsBack: LocatorHelper = new LocatorHelper("//review-details//i");
  static ReviewDetailsLoading: LocatorHelper = new LocatorHelper("//ng-template[@id='loadingReviewDetail']");
}
