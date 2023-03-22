const HomePage = require('../pageobjects/home.page')

describe('the home page', () => {
    it('should have a search box', async () => {
        await HomePage.open()
        await expect(HomePage.searchInput).toBeExisting()
    })
})