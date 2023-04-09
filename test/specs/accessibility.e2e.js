const AxeBuilder = require('@axe-core/webdriverio').default;
const should = require('should');

const SearchPage = require('../pageobjects/search.page');
const RandomMarkdownFile = require('../util/RandomMarkdownFile');

const axeOptions = {
  runOnly: ['wcag2a', 'wcag2aa', 'best-practice'], // What rulesets to use
  reporter: 'no-passes', // Only report failures
};

const randomFacpub = new RandomMarkdownFile('facpub');
const randomExhibit = new RandomMarkdownFile('exhibits');
const randomNewsArticle = new RandomMarkdownFile('news');

const pagesToTest = [
  {
    description: 'home page',
    url: '',
  },
  {
    description: 'search result',
    url: SearchPage.randomSearchURL,
    waitTime: 5,
  },
  {
    description: 'sample faculty publication highlight',
    url: randomFacpub.url,
  },
  {
    description: 'sample exhibit page',
    url: randomExhibit.url,
  },
  {
    description: 'sample news article',
    url: randomNewsArticle.url,
  },
];

pagesToTest.forEach((page) => {
  console.log(`Accessibility testing ${page.url}`)
  const waitTime = page.waitTime ? page.waitTime : 0;
  runA11yTest(page.description, page.url, waitTime);
});

/**
 * Run a11y test on one page
 *
 * @param {String} pageDescription  a human language description of the page1
 * @param {String} url the URL to check
 * @param {Number} waitTime how long to wait for the page to load in seconds
 */
function runA11yTest(pageDescription, url, waitTime = 0) {
  waitTime *= 1000;
  describe(pageDescription, () => {
    it('has zero WCAG2AA accessibility issues', async () => {
      const builder = new AxeBuilder({ client: browser }).options(axeOptions);

      // Load the page and wait for a time if we don't expect everything to
      // be visible on initial page load.
      await browser.url(url);
      await browser.pause(waitTime);

      // Do the analysis
      const result = await builder.analyze();

      // Print out violations before asserting that there aren't any, since
      // a failed assertion ends the test.
      if (result.violations.length > 0) {
        console.log('');
        console.log(`violations on ${pageDescription} <http://localhost:1313/${url}>`);
        result.violations.forEach(reportA11yViolation);
      }

      // Assert that the violations list is empty.
      result.violations.length.should.equal(0);
    });
  });
}

/**
 * Print a report of an axe violation
 *
 * @param {Object} violation a violation from an AxeResult
 */
function reportA11yViolation(violation) {
  // Basic details
  console.log('\t', violation.id);
  console.log('\t', violation.helpUrl);
  console.log('\t', violation.help);
  console.log('\t', violation.impact);

  // The nodes where the problem lies
  violation.nodes.forEach((node) => {
    node.target?.forEach((target) => {
      console.log('\t\t', target);
    });
  });

  console.log('');
}
