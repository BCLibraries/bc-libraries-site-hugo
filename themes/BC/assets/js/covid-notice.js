(function () {
    const cookie = ShowCOVIDNoticeCookie();

    if (cookie.isValidForThisDomain()) {
        runWhenReady(showCOVID19Notice);
    }

    function runWhenReady(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    function showCOVID19Notice() {

        const notice = document.createElement('div');
        notice.innerHTML = '<div class="covid-notice__opener">' +
        '<button class="covid-notice__open-button">' +
        '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' +
        '<span class="sr-only">Show COVID-19 notice</span>' +
        '</button>' +
        '</div>' +
        '<div class="covid-notice covid-notice--hidden">' +
        '<a href="https://libguides.bc.edu/servicesupdate">BC Libraries Update - COVID-19</a>' +
        '<div class="closed-notice" style="font-size: 16px">Most libraries are open, but only to the BC students and staff and with limited hours. The Law Library will open on August 24th. The Burns Library is open by appointment only.' +
        '</div>' +
        '<button class="covid-notice__close-button">Close</button>' +
        '</div>';
        document.body.append(notice);

        const banner = document.querySelector('.covid-notice');
        const opener = document.querySelector('.covid-notice__opener');

        if (!cookie.noticeIsClosed()) {
            showBanner();
        }

        document.querySelector('.covid-notice__close-button').addEventListener('click', hideBanner, false);
        document.querySelector('.covid-notice__open-button').addEventListener('click', showBanner, false);
        
        function showBanner() {
            banner.className = 'covid-notice';
            opener.className = 'covid-notice__opener covid-notice--hidden';
            cookie.set(true);
        }
    
        function hideBanner() {
            banner.className = 'covid-notice  covid-notice--hidden';
            opener.className = 'covid-notice__opener';
            cookie.set(false);
        }
    }
})();

function ShowCOVIDNoticeCookie() {

    const hostname = window.location.hostname.replace(/^[^\.]*\./, '.');
    const allowedDomains = ['.bc.edu', 'localhost', '.hosted.exlibrisgroup.com'];
    const cookieName = 'bcl-note-open';

    function set(status) {
        const value = status ? 1 : 0;
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 3);
        document.cookie = cookieName + "=" + value + ";expires=" + expiresAt + ";domain=" + hostname + ";path=/";
    }

    function noticeIsClosed() {
        return document.cookie.split(';').some(function (item) {
            return item.indexOf(cookieName + '=0') >= 0
        });
    }

    function isValidForThisDomain() {
        return allowedDomains.some(function (domain) {
            return domain === hostname;
        });
    }

    return {
        set: set,
        noticeIsClosed: noticeIsClosed,
        isValidForThisDomain: isValidForThisDomain
    };
}