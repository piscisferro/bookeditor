import { browser, element, ElementFinder, ElementArrayFinder, By } from 'protractor';

export class LocatorHelper extends ElementFinder {
  Locator: string;
  elementFinder: ElementFinder;

  constructor(locator: string) {
    let elementFinder = element(By.xpath(locator));
    super(elementFinder.browser_, elementFinder.elementArrayFinder_);
    this.elementFinder = elementFinder;
    this.Locator = locator;
  }

  getByPosition(position: number) {
    return new LocatorHelper(this.Locator + `[${position}]`);
  }

  getByAttribute(attribute: string, value: string) {
    return new LocatorHelper(this.Locator + `[contains(@${attribute}, '${value}')]`);
  }

  getByText(text: string) {
    return new LocatorHelper(this.Locator + `[contains(., '${text}')]`);
  }

  getById(id: string) {
    return new LocatorHelper(this.Locator + `[contains(@id, '${id}')]`);
  }

  getByClass(className: string) {
    return new LocatorHelper(this.Locator + `[contains(@class, '${className}')]`);
  }

  getChildrens() {
    return new LocatorHelper(this.Locator + "/*");
  }
  getChildByAttribute(attribute: string, value: string) {
    return new LocatorHelper(this.Locator + "/*");
  }

  getChildByText(text: string) {
    return new LocatorHelper(this.Locator + `//*[contains(., '${text}')]`);
  }

  getChildByClass(className: string) {
    return new LocatorHelper(this.Locator + `//*[contains(@class, '${className}')]`);
  }

  getChildById(id: string) {
    return new LocatorHelper(this.Locator + `//*[contains(@id, '${id}')]`);
  }

  getChildBySelector(selector: string) {
    return new LocatorHelper(this.Locator + `${selector}`);
  }

  getByChildAttribute(attribute: string, value: string): LocatorHelper {
    return new LocatorHelper(this.Locator + `[descendant::*[contains(@${attribute}, '${value}')]]`);
  }

  getByChildText(text: string): LocatorHelper {
    return new LocatorHelper(this.Locator + `[descendant::*[contains(., '${text}')]]`);
  }

  getByChildId(id: string): LocatorHelper {
    return new LocatorHelper(this.Locator + `[descendant::*[contains(@id, '${id}')]]`)
  }

  getByChildClass(className: string): LocatorHelper {
    return new LocatorHelper(this.Locator + `[descendant::*[contains(@class, '${className}')]]`)
  }

  getAllElements(): ElementArrayFinder {
    return element.all(By.xpath(this.Locator));
  }

}
