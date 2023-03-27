
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

    searchURL(term) {
        return `search?any=${term}`;
    }

    // Choosing a random search term helps ensure we test a variety of pages.
    get randomSearchURL() {
        const searchTerms = [
            "otters",
            "rabbits",
            "american history",
            "harry potter",
            "psycinfo",
            "new york times",
            "bible",
            "loeb classical library"
        ];
        const searchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
        return this.searchURL(searchTerm);
    }
}

module.exports = new SearchPage();
