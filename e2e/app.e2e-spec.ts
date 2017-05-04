import { I18nDemoPage } from './app.po';

describe('i18n-demo App', () => {
  let page: I18nDemoPage;

  beforeEach(() => {
    page = new I18nDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
