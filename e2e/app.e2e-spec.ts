import { MenuiseriemtPage } from './app.po';

describe('menuiseriemt App', () => {
  let page: MenuiseriemtPage;

  beforeEach(() => {
    page = new MenuiseriemtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
