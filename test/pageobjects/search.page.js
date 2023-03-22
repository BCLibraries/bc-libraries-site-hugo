
const Page = require('./page');

class SearchPage extends Page {
    open() {
        return super.open('search');
    }

    // the search text input box
    get searchInput() {
        return $('#bento-search-box__search-input');
    }

    // the submit button
    get submitButton() {
        return $('button[type="submit"]');
    }

    get bestBetTitleLink() {
        return $('.best-bet-result__title a');
    }

    get worldCatNoResultsLink() {
        return $('.catalog-no-results-box__worldcat-advice a')
    }

    async search(searchTerm) {
        await this.searchInput.setValue(searchTerm);
        await this.submitButton.click();
    }
}

module.exports = new SearchPage();
