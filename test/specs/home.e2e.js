const HomePage = require('../pageobjects/home.page');
const assert = require('assert');
const currentSeason = require('../util/currentSeason');

describe('the home page', () => {
    it('should have a search box', async () => {
        await HomePage.open();
        await expect(HomePage.searchInput).toBeExisting();
    });

    it('should have a seasonally appropriate hero image', async () => {
        const expectedSeason = currentSeason();
        await HomePage.open();
        const heroImage = await HomePage.heroBox.getCSSProperty('background-image');
        console.log(expectedSeason);
        await assert(heroImage.value.includes(expectedSeason));
    });
})
