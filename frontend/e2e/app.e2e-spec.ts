import { MigrationProjectPage } from './app.po';

describe('migration-project App', () => {
  let page: MigrationProjectPage;

  beforeEach(() => {
    page = new MigrationProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
