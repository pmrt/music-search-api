import { MusicSearchApiPage } from './app.po';

describe('music-search-api App', function() {
  let page: MusicSearchApiPage;

  beforeEach(() => {
    page = new MusicSearchApiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
