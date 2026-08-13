// Clicking search categories ('Books', 'Articles') in the search panel should link to the
// appropriate search, with any text in the search box used as the keyword.
document.addEventListener('DOMContentLoaded', () => {
    const searchPanels = document.querySelectorAll('#search-panel');

    searchPanels.forEach(searchPanel => {
        const booksLink = searchPanel.querySelector('.nde-book-search-link');
        const articlesLink = searchPanel.querySelector('.nde-article-search-link');
        const journalsLink = searchPanel.querySelector('.nde-journal-search-link');
        const queryInputElement = searchPanel.querySelector('input#lib-search-box');
        booksLink.addEventListener('click', handleLinkClick);
        articlesLink.addEventListener('click', handleLinkClick);
        journalsLink.addEventListener('click', handleLinkClick);

        /**
         * Add the search string to a clicked link
         *
         * @param {Event} e
         */
        function handleLinkClick(e) {
            const link = e.target;
            const url = new URL(link.href);
            url.searchParams.set('query', queryInputElement.value);
            link.href = url.toString();
        }
    });
});
