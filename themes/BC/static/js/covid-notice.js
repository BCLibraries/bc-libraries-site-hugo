$(function () {
    const $closeCov19NoticeButton = $('.covid-notice__close-button');
    const $openCov19NoticeButton = $('.covid-notice__open-button');

    if (localStorage.getItem('c19-notice-hidden') === 'true') {
        toggleNotice();
    }

    $closeCov19NoticeButton.click(function() {
        toggleNotice();
        localStorage.setItem('c19-notice-hidden', true);
    })

    $openCov19NoticeButton.click(function() {
        toggleNotice();
        localStorage.setItem('c19-notice-hidden', false);
    })

    function toggleNotice() {
        $('.covid-notice').toggleClass('covid-notice--hidden');
        $('.covid-notice__opener').toggleClass('covid-notice--hidden');
    }
});