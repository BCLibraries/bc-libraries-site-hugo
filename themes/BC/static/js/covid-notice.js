$(function () {
    const $closeCov19NoticeButton = $('.covid-notice__close-button');
    const $openCov19NoticeButton = $('.covid-notice__open-button');

    if (localStorage.getItem('c19-notice-hidden') === 'true') {
        hideNotice();
    }

    $closeCov19NoticeButton.click(function() {
        hideNotice();
        localStorage.setItem('c19-notice-hidden', true);
    })

    $openCov19NoticeButton.click(function() {
        showNotice();
        localStorage.setItem('c19-notice-hidden', false);
    })

    function hideNotice() {
        console.log('hiding');
        $('.covid-notice').toggleClass('covid-notice--hidden ');
        $('.covid-notice__opener').toggleClass('covid-notice--hidden ');
    }

    function showNotice() {
        $('.covid-notice__opener').toggleClass('covid-notice--hidden ');
        $('.covid-notice').toggleClass('covid-notice--hidden ');
    }
});