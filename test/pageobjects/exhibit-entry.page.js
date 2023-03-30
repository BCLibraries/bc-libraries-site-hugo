const Page = require('./page');
const fs = require('fs');

class FacpubEntryPage extends Page {
    open() {
        return super.open("/exhibits/2019/05/art-dig-tech-s19/");
    }

    openRandom() {
        return super.open(this.randomFacpubURL);
    }

    get randomFacpubURL() {
        const urls = [
            "/exhibits/2019/05/art-dig-tech-s19/",
            "/exhibits/2018/01/stop-making-sense/",
            "/facpub/2019/02/okeefe-navigating/",
            "/facpub/2018/03/blake-film/",
            "/facpub/2017/09/sienkiewicz-other/",
            "/facpub/2016/07/pavur-casalini/"
        ];
        return urls[Math.floor(Math.random() * urls.length)];
    }
}

module.exports = new FacpubEntryPage();