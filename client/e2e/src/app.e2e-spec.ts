import { AppPage } from './pages/app-page';
import { BookPage } from './pages/book-page';
import { ReviewsPage } from './pages/reviews-page';
import { TestData } from './test-data';
import { browser, ExpectedConditions } from 'protractor';
import { BookPageElements } from './pages/elements/book-page.elements';


describe('workspace-project App', () => {
  let appPage: AppPage;
  let bookPage: BookPage;
  let reviewsPage: ReviewsPage;

  beforeEach(() => {
    appPage = new AppPage();
    bookPage = new BookPage();
    reviewsPage = new ReviewsPage();
    appPage.navigateTo();
  });

  it('Should display welcome message', () => {
    expect(appPage.getTitleText()).toEqual('Greeting');
  });

  it('Should display 4 items in books', () => {
    appPage.login();

    expect(bookPage.getBookListLenght()).toEqual(TestData.NumberOfBooks);
    expect(bookPage.isBookNameDisplayed(TestData.ViajeAlCentroDeLaTierra)).toBe(true);
  });

  it('Should display Book details page', () => {
    appPage.login();

    appPage.clickBooksNavBar();

    bookPage.clickBook(TestData.ViajeAlCentroDeLaTierra);
    bookPage.waitForLoading();

    expect(bookPage.getBookDetailsBookName()).toEqual(TestData.ViajeAlCentroDeLaTierra);
    expect(bookPage.getBookDetailsBookAuthor()).toEqual(TestData.JulioVerne);
    expect(bookPage.getBookDetailsSynopsis()).toEqual(TestData.VACDLTSynopsis);

  });

  it('Should display 2 Reviews', () => {
    appPage.login();

    appPage.clickReviewsNavBar();

    reviewsPage.waitForLoading();
    expect(reviewsPage.getReviewListLenght()).toEqual(TestData.NumberOfReviews);
  });

});
