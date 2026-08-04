/**
 * @preserve
 * Project: Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Version: v2.2.1
 * Contributors: Mattia Larentis
 * Dependencies: Bootstrap's Dropdown plugin, jQuery
 * Description: A simple plugin to enable Bootstrap dropdowns to active on hover and provide a nice user experience.
 * License: MIT
 * Homepage: http://cameronspear.com/blog/bootstrap-dropdown-on-hover-plugin/
 * GitHub: https://github.com/mdbootstrap/bootstrap-hover-dropdown
 */
;(function ($, window, undefined) {
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();

    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function (options) {
        if (this.length > 0) {
            console.log("activated " + this.length + " menu items:");
            console.log(this);
        }
        // don't do anything if touch is supported
        // (plugin causes some issues on mobile)
        if('ontouchstart' in document) return this; // don't want to affect chaining

        // the element we really care about
        // is the dropdown-toggle's parent
        // EDIT this is a list of all elements that have classname ".dropdown"
        $allDropdowns = $allDropdowns.add(this.parent(".dropdown"));
        
        if ($allDropdowns.length > 0) {
            console.log("collected " + $allDropdowns.length + " parent .dropdowns elements:");
            console.log($allDropdowns);
        }

        return this.each(function () {    
            var $that = $(this),
                $thatName = this.text,
                $parent = $that.parent(".dropdown"),
                $childMenu = $that.parent().find(".dropdown-menu"),
                defaults = {
                    delay: 500,
                    hoverDelay: 0,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    hoverDelay: $(this).data('hover-delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                showEvent   = 'show.bs.dropdown',
                hideEvent   = 'hide.bs.dropdown',
                // shownEvent  = 'shown.bs.dropdown',
                // hiddenEvent = 'hidden.bs.dropdown',
                settings = $.extend(true, {}, defaults, options, data),
                timeout, timeoutHover;
                
            // we need this for jQuery animation effects to work
            $childMenu.css({"display": "none"});
                
            console.log("processing menu item: '" + $thatName + "' ... Done!");

            $parent.hover(function (event) {
                // so a neighbor can't open the dropdown
                if(!$parent.hasClass('show') && !$that.is(event.target)) {
                    // stop this event, stop executing any code
                    // in this callback but continue to propagate
                    console.log("ignore - ignore neighbor's event");
                    return true;
                }

                console.log("triggering '" + event.type + "' event for for '" + $thatName + "'");
                openDropdown(event);
            }, function () {
                console.log("triggering '" + event.type + "' event for for '" + $thatName + "'");
                closeDropdown(event);
            });

            // this helps with button groups!
            // EDIT: not sure what this is used for...
            /*
            $that.hover(function (event) {
                // this helps prevent a double event from firing.
                // see https://github.com/CWSpear/bootstrap-hover-dropdown/issues/55
                if(!$parent.hasClass('show') && !$parent.is(event.target)) {
                    // stop this event, stop executing any code
                    // in this callback but continue to propagate
                    console.log("ignore - prevent double event from firing");
                    return true;
                }
                
                //console.log("what is going on here?");
                //openDropdown(event);
            });
            */

            // handle submenus
            // EDIT: commenting out since we don't use submenus
            /*
            $parent.find('.dropdown-submenu').each(function (){
                var $that = $(this);
                var subTimeout;
                $that.hover(function () {
                    window.clearTimeout(subTimeout);
                    $that.children('.dropdown-menu').show();
                    // always close submenu siblings instantly
                    $that.siblings().children('.dropdown-menu').hide();
                }, function () {
                    var $submenu = $that.children('.dropdown-menu');
                    subTimeout = window.setTimeout(function () {
                        $submenu.hide();
                    }, settings.delay);
                });
            });
            */

            function openDropdown(event) {
                console.log("\t↳ here in openDropdown for event '" + event.type + "'");
                if($that.parents(".navbar").find(".navbar-toggle").is(":visible")) {
                    // If we're inside a navbar, don't do anything when the
                    // navbar is collapsed, as it makes the navbar pretty unusable.
                    console.log("ignore - navbar isn't visible");
                    return;
                }

                // clear dropdown timeout here so it doesn't close before it should
                window.clearTimeout(timeout);
                
                // restart hover timer
                window.clearTimeout(timeoutHover);
                
                // delay for hover event.
                timeoutHover = window.setTimeout(function () {
                    $allDropdowns.find(':focus').blur();

                    if(settings.instantlyCloseOthers === true)
                        $allDropdowns.removeClass('show');
                    
                    // clear timer for hover event
                    window.clearTimeout(timeoutHover);
                    $that.attr('aria-expanded', 'true');
                    $parent.addClass('show');
                    $that.addClass('show');
                    $childMenu.addClass('show');
                    $that.trigger(showEvent);
                    $childMenu.css({"display": "block"}); // we need this for jQuery animation effects to work
                }, settings.hoverDelay);
            }
            
            function closeDropdown(event) {
                console.log("\t↳ here in closeDropdown for event '" + event.type + "'");
                // clear timer for hover event
                window.clearTimeout(timeoutHover)
                timeout = window.setTimeout(function () {
                    $that.attr('aria-expanded', 'false');
                    $parent.removeClass('show');
                    $that.removeClass('show');
                    $childMenu.removeClass('show');
                    $that.trigger(hideEvent);
                }, settings.delay);
            }
        });
    };

    $(document).ready(function () {
        // apply dropdownHover to all elements with the data-hover="dropdown" attribute
        $('[data-hover="dropdown"]').dropdownHover();
    });
})(jQuery, window);