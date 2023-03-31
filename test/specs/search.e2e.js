const SearchPage = require('../pageobjects/search.page')

console.log('RUNNING SEARCH SPEC')

describe('the search function', () => {
    it('should correctly display a local result best bet', async () => {
        await SearchPage.open()
        await expect(SearchPage.searchInput).toBeExisting()
        await SearchPage.search('boston globe')
        await expect(SearchPage.bestBetTitleLink).toBeExisting()
        await expect(SearchPage.bestBetTitleLink).toHaveTextContaining('Boston Globe')
    })

    it('should show Browzine best bet when available', async () => {
        await SearchPage.open()
        await expect(SearchPage.searchInput).toBeExisting()
        await SearchPage.search('10.1111/j.1755-0998.2011.03060.x')
        await expect(SearchPage.bestBetTitleLink).toBeExisting()
        await expect(SearchPage.bestBetTitleLink).toHaveTextContaining('Gene transcription in sea otters')
    })

    it('should display WorldCat link when no results', async () => {
        const nonsenseString = 'purple paris rabbit oxen fainting bridgework'
        await SearchPage.open()
        await expect(SearchPage.searchInput).toBeExisting()
        await SearchPage.search(nonsenseString)
        await expect(SearchPage.worldCatNoResultsLink).toBeExisting()
        const worldcatUrl = SearchPage.worldCatNoResultsLink.getAttribute('href')
        expect(worldcatUrl).toHaveTextContaining('https://bc.on.worldcat.org/search?databaseList=&queryString=purple%20paris%20rabbit%20oxen%20fainting%20bridgework')
    })
})
