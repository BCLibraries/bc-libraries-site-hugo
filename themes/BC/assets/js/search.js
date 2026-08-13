// Clicking search categories ('Books', 'Articles') in the search panel should link to the
// appropriate search, with any text in the search box used as the keyword.
document.addEventListener('DOMContentLoaded', () => {
    const searchPanels = document.querySelectorAll('#search-panel');

    searchPanels.forEach(searchPanel => {

        // The text input
        const queryInputElement = searchPanel.querySelector('input#lib-search-box');

        // Find the links and add a click handler to them.
        const searchLinkSelector = [
            '.nde-book-search-link',
            '.nde-article-search-link',
            '.nde-journal-search-link'
        ].join(',');
        const searchLinks = searchPanel.querySelectorAll(searchLinkSelector)
        searchLinks.forEach(link => link.addEventListener('click', handleLinkClick));

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
