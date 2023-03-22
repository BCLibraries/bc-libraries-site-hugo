
const Page = require('./page');

class HomePage extends Page {
    open () {
        return super.open('');
    }

    get searchInput () {
        return $('#lib-search-box');
    }
}

module.exports = new HomePage();
