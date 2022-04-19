import { FusePage } from './app.po';

describe('TXC App', () => {
    let page: FusePage;

    beforeEach(() => {
        page = new FusePage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to TXC!');
    });
});
