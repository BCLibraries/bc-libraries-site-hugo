const noticeHTML = '<div class="covid-notice__opener">' +
    '<button class="covid-notice__open-button">' +
        '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' +
        '<span class="sr-only">Show COVID-19 notice</span>' +
    '</button>' +
'</div>' + 
'<div class="covid-notice covid-notice--hidden">' +
    '<a href="https://libguides.bc.edu/servicesupdate">BC Libraries Services Update - COVID-19</a>' +
    '<div class="closed-notice" style="font-size: 16px">All BC Libraries are closed. However, <a href="https://libguides.bc.edu/servicesupdate">remote services remain operational</a>.' +
    '</div>' +
    '<button class="covid-notice__close-button">Close</button>' +
'</div>';

$(function () {
    const hostname = window.location.hostname.replace(/^[^\.]*\./,'.');
    const cookieName = 'bcl-note-open';

    if ((hostname.toLowerCase().indexOf("bc.edu") !== -1) ||
        (hostname.toLowerCase().indexOf("localhost") !== -1)) {
        $('body').append(noticeHTML);
    }

    const $closeCov19NoticeButton = $('.covid-notice__close-button');
    const $openCov19NoticeButton = $('.covid-notice__open-button');

    if (! noticeIsClosed()) {
        toggleNotice();
    }

    $closeCov19NoticeButton.click(function() {
        toggleNotice();
        setCookie(false);
    })

    $openCov19NoticeButton.click(function() {
        toggleNotice();
        setCookie(true);
    })

    function toggleNotice() {
        $('.covid-notice').toggleClass('covid-notice--hidden');
        $('.covid-notice__opener').toggleClass('covid-notice--hidden');
    }

    function setCookie(status) {
        const value = status ? 1 : 0;
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 3);
        document.cookie = cookieName + "=" + value + ";expires=" + expiresAt + ";domain=" + hostname + ";path=/";
        console.log(document.cookie);
    }

    function noticeIsClosed() {
        return document.cookie.split(';').some(function(item) {
            return item.indexOf(cookieName + '=0') >= 0
        });
    }
});