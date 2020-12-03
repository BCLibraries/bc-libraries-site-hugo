(this["webpackJsonpbcbento-client"]=this["webpackJsonpbcbento-client"]||[]).push([[0],{101:function(e){e.exports=JSON.parse('{"__schema":{"types":[{"kind":"INTERFACE","name":"BestBetInterface","possibleTypes":[{"name":"BestBet"},{"name":"CitationBestBet"},{"name":"LocalBestBet"}]},{"kind":"INTERFACE","name":"SearchResponseInterface","possibleTypes":[{"name":"CatalogSearchResponse"},{"name":"SearchResponse"}]},{"kind":"INTERFACE","name":"DocInterface","possibleTypes":[{"name":"CatalogItem"},{"name":"Doc"}]}]}}')},242:function(e,t,n){"use strict";n.r(t);var r=n(0),i=(n(108),n(1)),a=n.n(i),s=n(44),c=n.n(s),l=n(12),o=n(10);var d=function(e,t){return function(n){n.target.onerror=null,n.target.src=e,t&&(n.target.className=t)}};function u(e,t){t||(t=!1);var n=t?"pci_only":"bcl_only",r=t?"pci":"bcl",i=t?"PC":"L";return"https://bc-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=".concat(e.id,"&context=").concat(i,"&tab=").concat(n,"&search_scope=").concat(r,"&vid=bclib_new&lang=en_US")}var h=function(e,t){return(e=e.replace(new RegExp(" ;","g"),";"))?e.length<t?e:e.substr(0,e.lastIndexOf(" ",t))+" [\u2026]":""};function b(e){return h(function(e){if(e.creator)return e.creator;if(e.contributors[0])return e.contributors[0];return""}(e),120)}var j="https://library.bc.edu/images/blank-screen.svg";var m=function({video:e}){var t=e.screenCap?e.screenCap:j,n=e.screenCap?"online-video-thumb__screenshot":"online-video-thumb__blank_screen",i="https://mlib.bc.edu/reserves-api/items/".concat(e.mms),a=u(e);return Object(r.jsxs)("div",{className:"online-video",children:[Object(r.jsx)("a",{href:i,children:Object(r.jsx)("div",{className:"online_video__thumb",children:Object(r.jsx)("img",{src:t,alt:"Watch ".concat(e.title," online"),onError:d(j),className:n})})}),Object(r.jsx)("h3",{className:"online-video__media-heading media-heading",children:Object(r.jsx)("a",{href:a,className:"online-video__title",children:e.title})}),e.date,Object(r.jsx)("div",{className:"online-video__creator",children:b(e)}),Object(r.jsx)("div",{className:"online-video__watch-link",children:Object(r.jsx)("a",{href:i,children:"Watch online"})})]})};var g=function({item:e}){return Object(r.jsxs)("div",{className:"item-info item-info--unavailable",children:["Not available. ",Object(r.jsx)("a",{href:u(e),children:"Check for more options"}),"."]})};var x=function({item:e,library:t,location:n}){return Object(r.jsxs)("div",{className:"item-info item-info--check-holdings",children:[Object(r.jsx)("span",{className:"item-info__instructions",children:Object(r.jsx)("a",{href:u(e,!1),children:'Check "Find in Library"'})}),Object(r.jsx)("span",{className:"item-info__library",children:t}),Object(r.jsx)("span",{className:"item-info__location",children:n}),"."]})};var f=function({firstHolding:e,inOtherLibraries:t}){return Object(r.jsx)("ul",{className:"available-items-list",children:Object(r.jsx)("li",{className:"item-info item-info--available",children:Object(r.jsxs)("a",{href:e.link,children:[Object(r.jsxs)("span",{className:"item-info__library",children:["Find in ",e.libraryDisplay]}),Object(r.jsx)("span",{className:"item-info__location",children:e.location}),Object(r.jsxs)("span",{className:"item-info__callno",children:["(",e.callNumber,")"]}),Object(r.jsx)("span",{className:"item-info__other-libraries",children:t&&" and other libraries"})]})})})};var v={ONL:{weight:-1,Stacks:-3,"1st Floor Microfilm":1},TML:{weight:0},BAPST:{weight:0},BURNS:{weight:0},ERC:{weight:0},SWK:{weight:0},LAW:{weight:0},GEO:{weight:1},RES_SHARE:{weight:2},DEV:{weight:2},INT:{weight:1},IAJS:{weight:1}};function O(e,t){var n=v[e]?v[e]:{weight:0};return n[t]?n[t]+n.weight:n.weight}function p(e,t){return O(e.library,e.locationCode)-O(t.library,t.locationCode)}var y=function({item:e}){var t=function(e){for(var t,n=[],r=0;r<e.holdings.length;r++)t=e.holdings[r].items.filter((e=>"available"===e.availability)),Array.prototype.push.apply(n,t);return n.sort(p)}(e),n=t.length>0?t[0]:null;return e.holdings[0]&&"check_holdings"===e.holdings[0].availabilityStatus?Object(r.jsx)(x,{item:e,library:e.holdings[0].libraryCode,location:e.holdings[0].locationDisplay}):n?Object(r.jsx)(f,{firstHolding:n,inOtherLibraries:t.length>1}):Object(r.jsx)(g,{item:e})},_="https://library.bc.edu/images/video-tape.svg",N="physical-video__vhs-cover";function w(e){return e.coverImages.length>0&&e.coverImages[0]?"physical-video__box_cover":"OPER HERE NOW physical-video__default_cover  ".concat(N)}function k(e){1===e.target.naturalHeight&&(e.target.className="physical-video__default_cover ".concat(N),e.target.src=_)}var S=function({video:e}){e.format.includes("disc")&&(_="https://library.bc.edu/images/mono-dvd-mount.svg",N="physical-video__dvd-cover");var t=function(e){if(e.coverImages.length>0&&e.coverImages[0])return String(e.coverImages[0].url);return _}(e),n="Catalog record for ".concat(e.title),i=u(e,!0);return Object(r.jsxs)("div",{className:"physical-video",children:[Object(r.jsx)("a",{href:i,"aria-hidden":"true",children:Object(r.jsx)("img",{src:t,onLoad:k,onError:d(_,"OPER physical-video__default_cover ".concat(N)),alt:n,className:w(e)})}),Object(r.jsx)("h3",{className:"physical-video__media-heading media-heading",children:Object(r.jsx)("a",{href:i,className:"physical-video__title",children:e.title})}),e.date,Object(r.jsx)("div",{className:"physical-video__creator",children:b(e)}),e.format,Object(r.jsx)(y,{item:e})]})};var C=function({item:e,inCatalogResult:t}){var n=e.isElectronic?Object(r.jsx)(m,{video:e}):Object(r.jsx)(S,{video:e}),i=t?"catalog-result-item":"catalog-result-item col-md-4";return Object(r.jsx)("li",{className:i,children:n})};var T=function({url:e}){return Object(r.jsxs)("div",{className:"hathi-trust-link",children:[Object(r.jsx)("div",{className:"hathi-trust-link__icon"}),Object(r.jsxs)("a",{href:e,target:"_blank",rel:"noopener noreferrer",children:["Full Text Available at HathiTrust",Object(r.jsx)("i",{className:"fa fa-external-link","aria-hidden":"true"})]})]})};var R=function({itemUrl:e,imageUrl:t,specialClass:n}){var i="cover-image ".concat(n);return Object(r.jsx)("div",{className:"media-right",children:Object(r.jsx)("a",{href:e,"aria-hidden":"true",children:Object(r.jsx)("img",{src:t,alt:"",className:i})})})};var I=function({url:e}){return Object(r.jsx)("div",{className:"catalog-result-item__getit",children:Object(r.jsx)("a",{href:e,children:"Find online"})})};var D=function({item:e}){if(e.isElectronic&&"Video"===e.type)return Object(r.jsx)(C,{item:e,inCatalogResult:!0});var t=u(e);return Object(r.jsxs)("li",{className:"catalog-result-item media",children:[Object(r.jsxs)("div",{className:"media-body",children:[Object(r.jsx)("h3",{className:"catalog-result-item__media-heading media-heading",children:Object(r.jsx)("a",{href:t,className:"catalog-result-item__title",children:e.title})}),Object(r.jsx)("div",{className:"catalog-result-item__creator",children:b(e)}),Object(r.jsxs)("div",{className:"catalog-result-item__publisher",children:[e.publisher," ",e.date]}),Object(r.jsx)("div",{className:"catalog-result-item__type",children:e.type}),e.isElectronic&&Object(r.jsx)(I,{url:t}),e.isPhysical&&Object(r.jsx)(y,{item:e}),e.hathitrustUrl&&Object(r.jsx)(T,{url:e.hathitrustUrl})]}),e.coverImages.length>1&&Object(r.jsx)(R,{itemUrl:t,imageUrl:e.coverImages[0].url})]})},B=n(47);var F=function({total:e,found:t,term:n,url:i}){return e||(e=0),e<=t?Object(r.jsx)("div",{className:"see-all-link--empty"}):n?Object(r.jsxs)("div",{className:"see-all-link",children:[Object(r.jsx)("span",{className:"see-all-link__prefix",children:">"})," ",Object(r.jsxs)("a",{href:i,children:["See all ",e.toLocaleString()," ",n]})]}):Object(r.jsx)("div",{className:"see-all-link--badge",children:Object(r.jsx)("a",{href:i,children:"See all"})})};var E=function({heading:e,searchUrl:t,seeAll:n,children:i}){return Object(r.jsxs)("div",{className:"bento-results-box","aria-live":"polite",children:[Object(r.jsxs)("div",{className:"bento-results-box__header-row",children:[Object(r.jsx)("h2",{children:e}),n]}),i]})};var L=function({heading:e}){return Object(r.jsx)(E,{heading:e,children:Object(r.jsx)("div",{className:"bento-results-box__loading-notice",children:"Loading..."})})};var U=function({heading:e}){return Object(r.jsx)(E,{heading:e,children:Object(r.jsx)("div",{className:"bento-results-box__error-notice",children:"There was an error performing this search."})})};var A=function({heading:e,content:t}){return Object(r.jsx)(E,{heading:e,children:Object(r.jsx)("div",{className:"bento-results-box__no-results",children:t})})};var P=function({docs:e,classPrefix:t,renderResult:n}){return Object(r.jsx)("div",{className:"".concat(t,"-results-box"),children:Object(r.jsx)("ol",{className:"".concat(t,"-results-list"),children:e.map(n)})})},q=[],W=0;function z(e,t,n=1){q.push({level:e,message:t}),(W+=n)>10&&H()}window.addEventListener("unload",H,!1);var V=e=>{z("error",e,3)},M=e=>{z("info",e)};function H(){!function(){var e=JSON.stringify({events:q});navigator.sendBeacon("https://library.bc.edu/bcbento-server/log",e)}(),q.length=0,W=0}class J extends i.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){V("Error presenting results: ".concat(e.statusCode," ").concat(e.message))}render(){return this.state.hasError?Object(r.jsx)(U,{heading:this.props.heading}):this.props.children}}var Q=J;var K=function({client:e,heading:t,term:n,classPrefix:i,renderResult:a,query:s,noResultsContent:c="There are no results matching your search.",handleFetch:l,modifier:o}){var d=Object(B.a)(s.gql,{client:e}),u=d.loading,h=d.error,b=d.data;if(u)return Object(r.jsx)(L,{heading:t});if(h)return Object(r.jsx)(U,{heading:t});if(0===b[s.object].total)return Object(r.jsx)(A,{heading:t,content:c});var j=b[s.object].docs?b[s.object].docs:b[s.object].results;!function(e,t){e&&e(t||[])}(l,j);var m=b[s.object].searchUrl,g=Object(r.jsx)(F,{term:n,total:b[s.object].total,found:j.length,url:m});return t=Object(r.jsx)("a",{href:m,children:t}),Object(r.jsx)(Q,{heading:t,children:Object(r.jsxs)(E,{heading:t,seeAll:g,searchUrl:m,children:[o,Object(r.jsx)(P,{classPrefix:i,docs:j,renderResult:a})]})})},$=n(11),G=n(7),X=n.n(G);function Y(e){return e.replace(/"/g,'\\"').replace("/\\/g","\\").replace(/(\r\n|\n|\r)/gm," ")}function Z(){var e=Object($.a)(['\n{\n  searchOnline( keyword: "','", limit: 3) {\n    docs {\n      id,\n      title,\n      date,\n      type,\n      creator,\n      contributors,\n      coverImages { \n        url\n      },\n      available,\n      hathitrustUrl,\n      isPhysical,\n      isElectronic,\n      screenCap,\n      mms,\n      holdings {\n        ilsId,\n        libraryCode,\n        locationDisplay,\n        locationCode,\n        availabilityStatus,\n        callNumber,\n        items {\n          availability,\n          locationCode,\n          location,\n          libraryDisplay,\n          library,\n          callNumber\n         }\n       }\n    },   \n    searchUrl,\n    didUMean,\n    total\n  }\n}']);return Z=function(){return e},e}class ee{constructor(e){this.object="searchOnline",this.gql=function(e){return X()(Z(),Y(e))}(e)}}function te(e){var t=encodeURIComponent(e),n="https://bc.on.worldcat.org/search?databaseList=&queryString=".concat(t);return Object(r.jsxs)("div",{className:"catalog-no-results-box",children:[Object(r.jsx)("p",{children:"There are no results matching your search."}),Object(r.jsxs)("p",{className:"catalog-no-results-box__worldcat-advice",children:["Try your search in ",Object(r.jsx)("a",{href:n,children:"WorldCat"})," for results beyond BC Libraries."]})]})}var ne=function({searchString:e,client:t,toggle:n}){return Object(r.jsx)(K,{client:t,heading:"Books & more",classPrefix:"books",term:"items",query:new ee(e),renderResult:e=>Object(r.jsx)(D,{item:e},"book-".concat(e.id)),noResultsContent:te(e),modifier:n})};var re=function({libkeyAvailability:e}){return Object(r.jsxs)("div",{className:"browzine-badge",children:[e.fullTextFile&&Object(r.jsxs)("a",{href:e.fullTextFile,className:"browzine-badge__download-now",target:"_blank",rel:"noopener noreferrer",children:[Object(r.jsx)("img",{src:"https://assets.thirdiron.com/images/integrations/browzine-pdf-download-icon.svg",className:"browzine-pdf-icon","aria-hidden":"true",width:"12",height:"16",alt:""}),Object(r.jsxs)("span",{className:"browzine-web-link-text",children:["Download Now",Object(r.jsx)("span",{className:"browzine-badge__pdf_notice",children:" (PDF)"})]})]}),e.browzineWebLink&&Object(r.jsxs)("a",{className:"browzine-badge__view-issue",href:e.browzineWebLink,"aria-hidden":"true",target:"_blank",rel:"noopener noreferrer",children:[Object(r.jsx)("img",{src:"https://assets.thirdiron.com/images/integrations/browzine-open-book-icon.svg",className:"browzine-book-icon","aria-hidden":"true",width:"15",height:"15",alt:""}),Object(r.jsx)("span",{className:"browzine-web-link-text",children:"View Issue Contents"})]})]})};function ie(e,t){var n=(e=e.length>0?e[0]:"").split(t);return t&&2===n.length?Object(r.jsxs)("span",{className:"article-result-item__journal-title",children:[n[0],Object(r.jsx)("cite",{children:t}),n[1]]}):Object(r.jsx)("span",{children:e})}var ae=function({article:e}){return Object(r.jsx)("li",{className:"article-result-item media",children:Object(r.jsxs)("div",{className:"media-body",children:[Object(r.jsx)("h3",{className:"article-result-item__media-heading media-heading",children:Object(r.jsx)("a",{href:u(e,!0),className:"article-result-item__title",target:"_blank",rel:"noreferrer noopener",children:e.title})}),e.date,Object(r.jsx)("div",{className:"article-result-item__creator",children:b(e)}),Object(r.jsx)("div",{className:"article-result-item__publisher",children:ie(e.isPartOf,e.journalTitle)}),e.libkeyAvailability&&Object(r.jsx)(re,{libkeyAvailability:e.libkeyAvailability})]})})};function se(){var e=Object($.a)(['\n{\n  searchArticles( keyword: "','", limit: 3) {\n    docs {\n      id,\n      title,\n      date,\n      type,\n      dOI,\n      creator,\n      contributors,\n      coverImages {\n        url\n      },\n      isPartOf,\n      journalTitle\n            libkeyAvailability {\n        fullTextFile\n        contentLocation\n        availableThroughBrowzine\n        browzineWebLink\n        journals {\n          browzineEnabled\n          browzineWebLink\n        }\n      }\n    },   \n    searchUrl,\n    didUMean,\n    total\n  }\n}']);return se=function(){return e},e}class ce{constructor(e){this.object="searchArticles",this.gql=function(e){return X()(se(),Y(e))}(e)}}var le=function({searchString:e,client:t,handleFetch:n}){return Object(r.jsx)(K,{client:t,heading:"Articles",classPrefix:"articles",term:"articles",query:new ce(e),renderResult:e=>Object(r.jsx)(ae,{article:e},"article-".concat(e.id)),handleFetch:n})};var oe=function({result:e}){return Object(r.jsx)("li",{children:Object(r.jsx)("a",{href:e.url,children:e.question})})};function de(){var e=Object($.a)(['\n{\n  searchFAQ( keyword: "','", limit: 3) {\n    results {\n      id,\n      question,\n      url\n    },   \n    searchUrl,\n    total\n  }\n}']);return de=function(){return e},e}class ue{constructor(e){this.object="searchFAQ",this.gql=function(e){return X()(de(),Y(e))}(e)}}var he=function({searchString:e,client:t}){return Object(r.jsx)(K,{client:t,heading:"FAQ",classPrefix:"faq",term:"results",query:new ue(e),renderResult:e=>Object(r.jsx)(oe,{result:e},"answer-".concat(e.id))})};var be=function({librarian:e}){var t="http://libguides.bc.edu/prf.php?account_id=".concat(e.id),n="//".concat(e.image),i="picture of ".concat(e.name),a=e.subjects.sort().join(", ");return Object(r.jsxs)("li",{className:"media",children:[Object(r.jsx)("div",{className:"media-left",children:Object(r.jsx)("a",{href:t,children:Object(r.jsx)("img",{src:n,alt:i})})}),Object(r.jsxs)("div",{className:"media-body",children:[Object(r.jsx)("h3",{className:"media-heading",children:Object(r.jsx)("a",{href:t,children:e.name})}),Object(r.jsx)("p",{className:"guide-description",children:a})]})]})};function je(){var e=Object($.a)(['\n{\n  recommendLibrarian( keyword: "','") {\n    total\n    searchUrl\n    docs {\n      id\n      name\n      email\n      subjects\n      image\n    }\n  }\n}']);return je=function(){return e},e}class me{constructor(e){this.object="recommendLibrarian",this.gql=function(e){return X()(je(),Y(e))}(e)}}var ge=function({searchString:e,client:t}){return Object(r.jsx)(K,{client:t,heading:"Librarians",classPrefix:"librarian",term:"librarians",query:new me(e),renderResult:e=>Object(r.jsx)(be,{librarian:e},"librarian-".concat(e.id))})};function xe(){var e=Object($.a)(['\n{\n  searchVideo( keyword: "','", limit: 3) {\n    docs {\n      id,\n      title,\n      date,\n      type,\n      creator,\n      contributors,\n      coverImages { \n        url\n      },\n      available,\n      isPhysical,\n      isElectronic,\n      screenCap,\n      format,\n      mms,\n      holdings {\n        ilsId,\n        libraryCode,\n        locationDisplay,\n        locationCode,\n        availabilityStatus,\n        callNumber,\n        items {\n          availability,\n          locationCode,\n          location,\n          libraryDisplay,\n          library,\n          callNumber\n          }\n        }\n    },   \n    searchUrl,\n    didUMean,\n    total\n  }\n}']);return xe=function(){return e},e}class fe{constructor(e){this.object="searchVideo",this.gql=function(e){return X()(xe(),Y(e))}(e)}}var ve=function({searchString:e,client:t}){return Object(r.jsx)(K,{client:t,heading:"Videos",classPrefix:"videos",term:"videos",query:new fe(e),renderResult:e=>Object(r.jsx)(C,{item:e},"video-".concat(e.id))})};function Oe(e){return{__html:e.highlight[1]}}var pe=function({hit:e}){return Object(r.jsxs)("li",{className:"website-hit",children:[Object(r.jsx)("h3",{className:"website-hit__title",children:Object(r.jsx)("a",{href:e.url,children:e.title})}),"in ",Object(r.jsx)("a",{href:e.guideUrl,className:"website-hit__guide-title",children:e.guideTitle}),Object(r.jsx)("div",{className:"website-hit__highlight",dangerouslySetInnerHTML:Oe(e)})]})};function ye(){var e=Object($.a)(['\n{\n  searchWebsite( keyword: "','") {\n    total\n    searchUrl\n    docs {\n      title\n      guideTitle\n      updated\n      url\n      guideUrl\n      fullTitle\n      highlight\n    }\n  }\n}']);return ye=function(){return e},e}class _e{constructor(e){this.object="searchWebsite",this.gql=function(e){return X()(ye(),Y(e))}(e)}}var Ne=function({searchString:e,client:t}){return Object(r.jsx)(K,{client:t,heading:"Our Website",classPrefix:"website",term:"results",query:new _e(e),renderResult:e=>Object(r.jsx)(pe,{hit:e},"hit-".concat(e.url))})};class we{constructor(e){this.source=e,this.title=null,this.doi=null,this.authors=[],this.containerTitle=null,this.date=null,this.issueInfo=null,this.link=null}}var ke=["January","February","March","April","May","June","July","August","September","October","November","December"];function Se(e){var t,n=new we("crossref");return n.title=e.titles[0],n.doi=e.DOI,n.authors=function(e){if(void 0===e||0===e.length)return[];return e.map((e=>"".concat(e.familyName,", ").concat(e.givenName)))}(e.authors),n.containerTitle=(t=e.containerTitles)&&t[0]?t[0]:null,n.date=e.publishedPrintDate.length>0?Ce(e.publishedPrintDate):Ce(e.publishedOnlineDate),n.issueInfo=function(e,t,n){var r=[];e&&!t?r.push("".concat(e)):t&&!e?r.push("".concat(t)):e&&t&&r.push("".concat(e," (").concat(t,")"));n&&n.includes("-")?r.push("pp. ".concat(n)):n&&r.push("p. ".concat(n));return r.join(", ")}(e.volume,e.issue,e.page),n}function Ce(e){if(void 0===e)return"";var t=e.length;if(0===t)return null;var n=e[0];if(1===t)return"".concat(n,",");var r=ke[e[1]-1];return 2===t?"".concat(r," ").concat(n,","):"".concat(r," ").concat(n," ").concat(e[2],",")}class Te{constructor(e){this.title=e.title,this.displayText=e.displayText,this.link=e.link}}function Re(e,t,n){if(e&&e.displayText)return new Te(e);if(e&&e.fullText&&!function(e,t){t=t||[];var n=!1;return e=e.toLowerCase(),t.forEach((t=>{var r=t.dOI?t.dOI.toLowerCase():"";e===r&&"review"===t.type&&(n=!0)})),n}(e.fullText.crossRefData.DOI,t)){var r=Se(e.fullText.crossRefData),i=e.fullText.libKeyData;return r.link=i.fullTextFile?i.fullTextFile:i.contentLocation,r}if(t){var a=function(e,t){return t.filter((t=>{var n=t.title.length>40,r=e.toLowerCase().trim()===t.title.toLowerCase().trim();return n&&r&&function(e){if(!e)return!1;return""!==e.fullTextFile||""!==e.contentLocation}(t.libkeyAvailability)}))}(n,t);if(a.length>0){var s=function(e){var t=new we("pci");return t.title=e.title,t.doi=e.dOI,t.authors=e.creator?e.creator.split("; "):[],t.date=e.date,t.containerTitle=e.journalTitle.length>0?e.journalTitle[0]:null,t.issueInfo=e.isPartOf.length>0?e.isPartOf[0]:null,t}(a[0]),c=a[0].libkeyAvailability;return s.link=c.fullTextFile?c.fullTextFile:c.contentLocation,s}}return null}var Ie=function({bestBet:e}){return M("Local Best Bet Result displayed: ".concat(e.title)),Object(r.jsxs)("div",{className:"best-bet-row",children:[Object(r.jsx)("h2",{className:"best-bet-row__heading",children:"Top result"}),Object(r.jsxs)("div",{className:"best-bet-result",children:[Object(r.jsx)("h3",{className:"best-bet-result__title",children:e.link?Object(r.jsx)("a",{href:e.link,onClick:function(){M("Local Best Bet Result clicked: ".concat(e.title))},children:e.title}):Object(r.jsx)("span",{children:e.title})}),Object(r.jsx)("div",{dangerouslySetInnerHTML:{__html:e.displayText}})]})]})};function De(e){var t=e.length;return e=e.slice(0,6),t>6&&e.push("et. al."),e.join("; ")}function Be(e){return"pci"===e.source?e.issueInfo:"".concat(e.containerTitle," ").concat(e.date," ").concat(e.issueInfo)}var Fe=function({fullText:e}){return M("FullText Best Bet Result displayed: ".concat(e.title," ").concat(e.doi)),Object(r.jsxs)("div",{className:"best-bet-row",children:[Object(r.jsx)("h2",{className:"best-bet-row__heading",children:"Top result"}),Object(r.jsxs)("div",{className:"best-bet-result",children:[Object(r.jsx)("h3",{className:"best-bet-result__title",children:Object(r.jsx)("a",{href:e.link,onClick:function(){M("FullText Best Bet Result clicked: ".concat(e.title," ").concat(e.doi))},children:e.title})}),Object(r.jsx)("p",{className:"best-bet-result__author",children:De(e.authors)}),Object(r.jsx)("p",{className:"best-bet-result__publication",children:Be(e)}),Object(r.jsxs)("p",{className:"best-bet-result__doi",children:["doi:",e.doi]}),Object(r.jsx)("a",{href:e.link,className:"pull-right btn btn-primary",children:"Read"})]})]})};function Ee(){var e=Object($.a)(['\n{\n  bestBet( keyword: "','") {\n    id\n    title\n    ...on LocalBestBet {\n      displayText\n      link\n    }\n    ...on CitationBestBet {\n      fullText {\n        libKeyData {\n          fullTextFile,\n          browzineWebLink\n          contentLocation\n        }\n        crossRefData {\n          titles\n          DOI\n          authors {\n            givenName\n            familyName\n            sequence\n          }\n          containerTitles\n          volume\n          issue\n          page\n          publishedPrintDate\n        }\n      }\n    }\n  }\n}']);return Ee=function(){return e},e}var Le=function({searchString:e,client:t,articleResults:n}){var i=Object(B.a)(function(e){return X()(Ee(),Y(e))}(e),{client:t}),a=i.loading,s=i.error,c=i.data;if(a||s||!c||!n)return null;var l=Re(c.bestBet,n,e);return l instanceof Te?Object(r.jsx)(Ie,{bestBet:l}):l instanceof we?Object(r.jsx)(Fe,{fullText:l}):null};var Ue=function({target:e,label:t}){return Object(r.jsx)("div",{children:Object(r.jsx)("span",{className:"link-to-results__skip_to_link",onClick:t=>{e.current&&e.current.scrollIntoView({behavior:"smooth",block:"start"})},children:t})})};function Ae({booksDiv:e,articlesDiv:t,faqDiv:n,librariansDiv:i,videoDiv:a,websiteDiv:s}){return Object(r.jsx)("div",{className:"row",children:Object(r.jsxs)("nav",{className:"link-to-results col-md-8",children:[Object(r.jsx)("div",{className:"link-to-results__skip-to",children:"Skip to:"}),Object(r.jsx)(Ue,{target:e,label:"Books & more"}),Object(r.jsx)(Ue,{target:t,label:"Articles"}),Object(r.jsx)(Ue,{target:n,label:"FAQ"}),Object(r.jsx)(Ue,{target:i,label:"Librarians"}),Object(r.jsx)(Ue,{target:a,label:"Video"}),Object(r.jsx)(Ue,{target:s,label:"Website"})]})})}var Pe=n(104),qe=n(18),We=n(101),ze=n(27),Ve=new qe.b({introspectionQueryResultData:We}),Me=new qe.a({fragmentMatcher:Ve}),He=new Pe.a({cache:Me,uri:"https://library.bc.edu/bcbento-server/graphql",link:new ze.a});class Je extends a.a.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){console.error(e),console.error(t),V("".concat(e.message,": ").concat(t.componentStack))}render(){return this.state.hasError?Object(r.jsx)(U,{heading:"Error"}):this.props.children}}var Qe=Je,Ke=n.p+"static/media/icon_archives.9b4cb17a.svg";var $e=function({url:e}){return Object(r.jsxs)("div",{className:"finding-aid-link",children:[Object(r.jsx)("img",{src:Ke,className:"finding-aid-link__icon",alt:""}),Object(r.jsxs)("a",{href:e,target:"_blank",rel:"noopener noreferrer",children:["Finding aid",Object(r.jsx)("i",{className:"fa fa-external-link","aria-hidden":"true"})]})]})};function Ge(e,t){return e.coverImages.length>1?Object(r.jsx)(R,{imageUrl:e.coverImages[0].url,itemUrl:t}):Xe(e)?Object(r.jsx)(R,{imageUrl:Ke,itemUrl:t,specialClass:"finding-aid-thumb"}):null}function Xe(e){return Boolean(e.linkToFindingAid&&e.linkToFindingAid.url)}var Ye=function({item:e}){if(e.isElectronic&&"Video"===e.type)return Object(r.jsx)(C,{item:e,inCatalogResult:!0});var t=u(e);return Object(r.jsxs)("li",{className:"catalog-result-item media",children:[Object(r.jsxs)("div",{className:"media-body",children:[Object(r.jsx)("h3",{className:"catalog-result-item__media-heading media-heading",children:Object(r.jsx)("a",{href:t,className:"catalog-result-item__title",children:e.title})}),Object(r.jsx)("div",{className:"catalog-result-item__creator",children:b(e)}),Object(r.jsxs)("div",{className:"catalog-result-item__publisher",children:[e.publisher," ",e.date]}),Object(r.jsx)("div",{className:"catalog-result-item__type",children:e.type}),e.isElectronic&&Object(r.jsx)(I,{url:t}),e.isPhysical&&Object(r.jsx)(y,{item:e}),e.hathitrustUrl&&Object(r.jsx)(T,{url:e.hathitrustUrl}),Xe(e)&&Object(r.jsx)($e,{url:e.linkToFindingAid.url})]}),Ge(e,t)]})};function Ze(){var e=Object($.a)(['\n{\n  searchCatalog( keyword: "','", limit: 3) {\n    docs {\n      id,\n      title,\n      date,\n      type,\n      creator,\n      contributors,\n      coverImages { \n        url\n      },\n      available,\n      hathitrustUrl,\n      linkToFindingAid {\n        url\n      },\n      isPhysical,\n      isElectronic,\n      screenCap,\n      mms,\n      holdings {\n        ilsId,\n        libraryCode,\n        locationDisplay,\n        locationCode,\n        availabilityStatus,\n        callNumber,\n        items {\n          availability,\n          locationCode,\n          location,\n          libraryDisplay,\n          library,\n          callNumber\n          }\n        }\n    },   \n    searchUrl,\n    didUMean,\n    total\n  }\n}']);return Ze=function(){return e},e}class et{constructor(e){this.object="searchCatalog",this.gql=function(e){return X()(Ze(),Y(e))}(e)}}function tt(e){var t=encodeURIComponent(e),n="https://bc.on.worldcat.org/search?databaseList=&queryString=".concat(t);return Object(r.jsxs)("div",{className:"catalog-no-results-box",children:[Object(r.jsx)("p",{children:"There are no results matching your search."}),Object(r.jsxs)("p",{className:"catalog-no-results-box__worldcat-advice",children:["Try your search in ",Object(r.jsx)("a",{href:n,children:"WorldCat"})," for results beyond BC Libraries."]})]})}var nt=function({searchString:e,client:t,toggle:n}){return Object(r.jsx)(K,{client:t,heading:"Books & more",classPrefix:"books",term:"items",query:new et(e),renderResult:e=>Object(r.jsx)(Ye,{item:e},"book-".concat(e.id)),noResultsContent:tt(e),modifier:n})};var rt=function({isChecked:e,handleToggle:t}){var n=Object(i.useState)(!1),a=Object(l.a)(n,2),s=a[0],c=a[1],o=s?"catalog-toggle__explanation-displayed":"catalog-toggle__explanation-hidden";return Object(r.jsxs)("div",{className:"catalog-toggle",children:[Object(r.jsxs)("div",{className:"catalog-toggle__input-group",children:[Object(r.jsxs)("label",{className:"catalog-toggle__label",children:[Object(r.jsx)("input",{type:"checkbox",checked:e,onChange:t})," Limit to online content"]}),Object(r.jsx)("span",{className:"catalog-toggle__help-link",onClick:function(){c(!s)},children:"what's this?"})]}),Object(r.jsx)("div",{className:o,children:"When this box is checked, search is limited to items available online. Uncheck the box to include our physical collections."})]})};function it(){for(var e={parameters:{},keys:[]},t=window.location.search.split("&"),n=0;n<t.length;n++){var r=t[n].split("="),i=Object(l.a)(r,2),a=i[0],s=i[1];e.parameters[a]=s,e.keys.push(a)}return e}function at(e){for(var t=[],n=0;n<e.keys.length;n++){var r=e.keys[n];t.push(r+"="+e.parameters[r])}var i=window.location.protocol+"//"+window.location.host+window.location.pathname+t.join("&");window.history.replaceState({path:i},"",i)}var st=function(e,t){var n=Object(i.useState)(function(e){var t=it();if(-1===t.keys.indexOf(e))return"false";return decodeURIComponent(t.parameters[e])}(e)||t),r=Object(l.a)(n,2),a=r[0],s=r[1];return[a,Object(i.useCallback)((t=>{s(t),"true"===t?function(e,t){var n=it();n.parameters[e]=encodeURIComponent(t),-1===n.keys.indexOf(e)&&n.keys.push(e);at(n)}(e,t):function(e){var t=it(),n=t.keys.indexOf(e);n>-1&&(t.keys.splice(n,1),delete t.parameters.key);at(t)}(e)}),[e])]};var ct=function({searchString:e}){var t=Object(i.useState)([]),n=Object(l.a)(t,2),a=n[0],s=n[1],c=st("online"),d=Object(l.a)(c,2),u=d[0],h=d[1],b="true"===u,j={booksDiv:Object(i.useRef)(null),articlesDiv:Object(i.useRef)(null),faqDiv:Object(i.useRef)(null),librariansDiv:Object(i.useRef)(null),videoDiv:Object(i.useRef)(null),websiteDiv:Object(i.useRef)(null)},m={searchString:e,client:He},g=Object(r.jsx)(rt,{handleToggle:function(){h(!b),h(b?"false":"true")},isChecked:b});return Object(r.jsxs)("div",{children:[Object(r.jsx)(Ae,Object(o.a)({},j)),Object(r.jsxs)("div",{className:"bento-results",children:[Object(r.jsx)(Qe,{children:Object(r.jsx)(Le,Object(o.a)(Object(o.a)({},m),{},{articleResults:a}))}),Object(r.jsxs)("div",{className:"results-row-1 row",children:[Object(r.jsx)("div",{className:"col-md-5 col-sm-12",ref:j.booksDiv,children:Object(r.jsx)(Qe,{children:b?Object(r.jsx)(ne,Object(o.a)(Object(o.a)({},m),{},{toggle:g})):Object(r.jsx)(nt,Object(o.a)(Object(o.a)({},m),{},{toggle:g}))})}),Object(r.jsx)("div",{className:"col-md-5 col-md-offset-1 col-sm-12",ref:j.articlesDiv,children:Object(r.jsx)(Qe,{children:Object(r.jsx)(le,Object(o.a)(Object(o.a)({},m),{},{handleFetch:s}))})})]}),Object(r.jsxs)("div",{className:"results-row-2 row",ref:j.faqDiv,children:[Object(r.jsx)("div",{className:"col-md-7",children:Object(r.jsx)(Qe,{children:Object(r.jsx)(he,Object(o.a)({},m))})}),Object(r.jsx)("div",{className:"col-md-4 col-md-offset-1",ref:j.librariansDiv,children:Object(r.jsx)(Qe,{children:Object(r.jsx)(ge,Object(o.a)({},m))})})]}),Object(r.jsx)("div",{className:"results-row-3 row",ref:j.videoDiv,children:Object(r.jsx)("div",{className:"col-md-12",children:Object(r.jsx)(Qe,{children:Object(r.jsx)(ve,Object(o.a)({},m))})})}),Object(r.jsx)("div",{className:"results-row-4 row",ref:j.websiteDiv,children:Object(r.jsx)("div",{className:"col-md-12",children:Object(r.jsx)(Qe,{children:Object(r.jsx)(Ne,Object(o.a)({},m))})})})]})]})};var lt=function(){return Object(r.jsx)("div",{className:"blank-search-screen",children:Object(r.jsx)("div",{className:"blank-search-screen__explanation",children:"Search for just about anything in or about the Libraries."})})},ot=e=>Object(r.jsx)(ct,{searchString:e.searchString}),dt=a.a.memo(ot);var ut=function({searchBox:e,searchString:t}){return Object(r.jsxs)("div",{className:"bento-results-page",children:[Object(r.jsx)("h1",{className:"sr-only sr-only-focusable",id:"main-heading",children:"Search the library"}),Object(r.jsxs)("form",{method:"get",action:window.location.pathname,className:"bento-search-box",children:[e,Object(r.jsxs)("button",{className:"btn btn-default",type:"submit",children:[Object(r.jsx)("i",{className:"fa fa-search","aria-hidden":"true"}),Object(r.jsx)("span",{className:"search-button-text",children:"Search"})]})]}),t?Object(r.jsx)(dt,{searchString:t}):Object(r.jsx)(lt,{})]})},ht=n(70),bt=n.n(ht),jt=n(102),mt=n(103),gt=n.n(mt);var xt=function({searchBoxId:e,suggestions:t,fetchSuggestions:n,clearSuggestions:i,onSuggestionSelected:a,inputProps:s}){return Object(r.jsxs)("div",{className:"bcbento-search-box",children:[Object(r.jsx)("label",{htmlFor:e,className:"bcbento-search-box__input-label sr-only",children:"Enter a search term please"}),Object(r.jsx)(gt.a,{suggestions:t,getSuggestionValue:e=>e.value,onSuggestionsFetchRequested:n,onSuggestionsClearRequested:i,renderSuggestion:e=>Object(r.jsx)("div",{className:"search-suggestion",children:e.value}),onSuggestionSelected:a,inputProps:s})]})};var ft=function({searchBoxId:e,onTyping:t,value:n,setHasFocus:i}){return Object(r.jsx)("textarea",{id:e,value:n,onChange:function(e){t(e,{newValue:e.target.value,method:"nomethod"})},onFocus:function(e){e.target.selectionStart=n.length,i(!0)},onBlur:function(e){i(!1)},name:"any",autoFocus:!0})},vt=n(245),Ot="bento-search-box__search-input";function pt(e,{suggestion:t,suggestionValue:n,suggestionIndex:r,sectionIndex:i,method:a}){if(n){var s=window.location.protocol+"//"+window.location.host+window.location.pathname.replace(/\/$/,"");window.location.href="".concat(s,"?any=").concat(n)}}var yt=function({handleTyping:e,searchString:t,onSubmit:n}){var a=Object(i.useState)([]),s=Object(l.a)(a,2),c=s[0],d=s[1],u=Object(i.useState)(t),h=Object(l.a)(u,2),b=h[0],j=h[1],m=Object(i.useState)(!b),g=Object(l.a)(m,2),x=g[0],f=g[1],v=b.length>=50,O=b.length>=50,p=(t,{newValue:r,method:i})=>{"enter"===i?n():(j(r),e(r))};function y(){return(y=Object(jt.a)(bt.a.mark((function e({value:t,reason:n}){var r,i,a;return bt.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length<3||"input-focused"===n)){e.next=2;break}return e.abrupt("return");case 2:return r="https://library.bc.edu/search-services/typeahead?any=".concat(t),i=[],e.prev=4,e.next=7,fetch(r);case 7:return a=e.sent,e.next=10,a.json();case 10:i=e.sent,e.next=17;break;case 13:e.prev=13,e.t0=e.catch(4),V("Error fetching suggestions for ".concat(t)),i=[];case 17:d(i);case 18:case"end":return e.stop()}}),e,null,[[4,13]])})))).apply(this,arguments)}var _={searchBoxId:Ot,suggestions:c,fetchSuggestions:function(e){return y.apply(this,arguments)},clearSuggestions:function(){d([])},onSuggestionSelected:pt,inputProps:{placeholder:"Search for books, articles, journals, databases",value:b,onChange:p,name:"any",id:Ot,autoFocus:x,onFocus:e=>f(!0),onBlur:e=>f(!1)}},N={onTyping:p,searchBoxId:Ot,value:b,setHasFocus:f},w=v?Object(r.jsx)(ft,Object(o.a)({},N)):Object(r.jsx)(xt,Object(o.a)({},_));return Object(r.jsx)(vt.a,{in:O,timeout:200,classNames:"searchbox-animate",children:w})};n(160);function _t(e){document.title=e?"Search - ".concat(e):"Search"}var Nt=function(){var e=function(e){e=e.replace(/[[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(window.location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))}("any");_t(e);var t=Object(i.useState)(e),n=Object(l.a)(t,2),a=n[0],s=n[1],c=Object(i.useState)(""),o=Object(l.a)(c,2),d=o[0],u=o[1],h=Object(r.jsx)(yt,{searchString:a,handleTyping:e=>u(e),handleSubmit:()=>{s(d),_t(a)}});return Object(r.jsx)(ut,{searchBox:h,searchString:a})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(r.jsx)(Nt,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((e=>{e.unregister()}))}},[[242,1,2]]]);
//# sourceMappingURL=main.cd03e164.chunk.js.map