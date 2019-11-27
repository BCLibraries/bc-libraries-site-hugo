---
title: "From citation to PDF in one click"
draft: false
expired: false
date: 2019-11-22T11:49:05-05:00
year: "2019"
slug: "one-click-PDF"
imagethumb: ""
imagealt: ""
type: "experiments"
---

#### What we built

We've made it easier to locate the PDF for an article in library search. You can now copy and paste a [DOI](https://www.doi.org/doi_handbook/1_Introduction.html#1.6.1) or a citation into the main search box on [library-beta.bc.edu](https://library-beta.bc.edu). 

![Screenshot of a DOI input into the library search box](https://library.bc.edu/images/experiments/2019-11/doi-search.png) ![Screenshot of a citation input into the library search box](https://library.bc.edu/images/experiments/2019-11/citation-search.png)

If we can identify a likely match, we offer a best bet link front and center on the results page, with one click to the PDF. If we can’t make a match, you’ll see the search results and options you do currently. 

![Screenshot of the Top Result for a DOI search](https://library.bc.edu/images/experiments/2019-11/top-result.png)


#### Next Steps

We’ll be working to improve the matching, and to expand the range of content this works for. We’ll also be exploring other projects like this to meet the needs our study identified.

#### Feedback

Let us know what you think! You can email the project team at <a href="mailto:library-beta@ggroups.bc.edu">library-beta@ggroups.bc.edu</a> or [complete a brief (3-question) survey](https://forms.gle/cfqoEnM6s13KLWJu9).

#### Why we built it

Last year, we conducted a series of interviews with members of the BC community. We learned about their research process and the obstacles they face, and have begun to identify areas for improvement. One clear and consistent problem we identified was the confusing and frustrating process of navigating to the full text of articles. We tested several rounds of prototypes with patrons, and today we're launching this beta version publicly for wider testing. The solution builds on similar functionality we are already using to show frequently requested [journal titles](https://library.bc.edu/search/?any=nature "libary search for Nature") and [databases](https://library.bc.edu/search/?any=jstor "library search for jstor"). 

#### More about the project

This project was a 3-month collaborative effort between Teo Doras (E-Resources), Chris Strauber (Research), Ben Florin (Lead Developer), and Luke Gaudreau (Project Lead). It uses the [CrossRef search API](https://github.com/CrossRef/rest-api-doc "CrossRef search API documentation") to identify article citations and the [LibKey API](https://thirdiron.atlassian.net/wiki/spaces/BrowZineAPIDocs/pages/65699928/Article+DOI+Lookup+Endpoint+LibKey "LibKey API documentation") to locate direct links to the full text. We built the application to integrate with our existing search platform. [All of the code is available under an open source license](https://github.com/BCLibraries/FulltextFinder "github repository for FullText Finder"). Feel free to <a href="mailto:library-beta@ggroups.bc.edu">reach out</a> with technical questions.
