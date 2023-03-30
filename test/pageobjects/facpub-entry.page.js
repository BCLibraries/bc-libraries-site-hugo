const Page = require('./page');

class FacpubEntryPage extends Page {
    open() {
        return super.open("/2023/03/tilling-the-church/");
    }

    openRandom() {
        return super.open(this.randomFacpubURL);
    }

    get randomFacpubURL() {
        const urls = [
            "/2023/03/tilling-the-church/",
            "/facpub/2019/10/kearney-anatheism/",
            "/facpub/2019/02/okeefe-navigating/",
            "/facpub/2018/03/blake-film/",
            "/facpub/2017/09/sienkiewicz-other/",
            "/facpub/2016/07/pavur-casalini/"
        ];
        return urls[Math.floor(Math.random() * urls.length)];
    }
}

module.exports = new FacpubEntryPage();