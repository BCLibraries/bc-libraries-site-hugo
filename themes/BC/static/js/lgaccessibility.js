/* This script will add in an accessibility widget in the LibGuides edit screen */
$(document).ready(function(){
    const oldEditPathLG = window.location.pathname.includes('admin_c.php');
    const newEditPathLG = window.location.pathname.includes('/libguides/guides/edit');
    // var check_admin_path = $(location).attr('pathname');
    //var bc_custom_bar = $("#bc-custom-bar");
    var bc_custom_bar = $("#bc-custom-bar-accessibility-container");
    var accordian_container_a11y = "accordion-bc";
    var test_container_a11y = "bc-custom-bar-inner";
    var script_version = "v1 BETA"
    var all_tests = [];

    function setupTests(all_tests){
        console.log(all_tests);
        var elem = '<div id="' + test_container_a11y + '" style="display:none;" class="bc-custom-bar-item"><h3>Accessibility Test (' + script_version + ')</h3><div class="panel-content"><div class="whatisthis"><i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp;<a href="https://bcwiki.bc.edu/display/UL/LibGuides+Accessibility+Widget" target="_blank">What is this?</a></div><div id="status-message"></div><div id="'+ accordian_container_a11y + '"></div><button type="button" id="run-tests">Begin Tests</button></div></div>';

        bc_custom_bar.show().append(elem);
        $("#" + test_container_a11y).fadeIn("fast");

        $("#run-tests").click(function(){
            clearAll();
            runAllTests(all_tests);
            $("#status-message").html("<h4>Press the button again to rerun the acessibility tests.</h4><p>All tests have completed. Click on each header for additional information for that test.</p>");
            $(this).html("Rerun all tests");

            var current_title = $(document).attr('title');
            var regex = /^EDIT (.*)- Libraries at Boston College$/;
            var output = regex.exec(current_title);
            //console.log(output);
            if (output.length){
                current_title = output[1];
            }
            ga('send', 'event', 'accessibility-test', 'click', current_title);
        });

        $("#status-message").html("<h4>Press the button below to check this page for common accessibility issues.</h4><p>The following tests will be run.</p>");

        // main container
        $('#' + test_container_a11y).accordion({
            collapsible: true,
            heightStyle: "content",
            active: 'none',
            disabled: false
        });

        // tests container - initially disabled
        $('#' + accordian_container_a11y).accordion({
            collapsible: true,
            heightStyle: "content",
            active: 'none',
            header: '> div.wrap > h3',
            disabled: true
        });

        // set up for each test - add container to accordion widget
        $.each(all_tests, function(key, testObj){
            console.log("set up test: " + testObj.name);
            testObj.setup(++key);
        });
    }

    function clearAll(){
        $("#" + accordian_container_a11y + " h3").removeClass("fail pass waiting");
        $("#" + accordian_container_a11y +  " .test-content").empty();

        $(".accessibility-before-link").remove();

        // clear away all the anchor tags and alert classes
        $(".accessibility-test-anchor").each(function(){
            $(this).next().removeClass("alert-border");
            $(this).next().removeAttr("data-tag");
            $(this).remove();
        });
    }

    function resetAccordion(isDisabled){
        // below only works with jquery ui v1.10+
        // $('#accordion-bc').accordion("refresh");
        //
        // instead, use must this version
        $('#' + accordian_container_a11y).accordion("destroy").accordion({
            collapsible: true,
            heightStyle: "content",
            active : 'none',
            header: '> div.wrap > h3',
            disabled: isDisabled
        });

        // effect to highlight selected item
        $('#' + accordian_container_a11y + ' a').click(function(e){
            var bar = $(this).attr('href').substr(1);
            $("a[name='" + bar + "']").next().fadeTo('slow', 0.5).fadeTo('slow', 1.0);
        });
    }

    function FormattedTextTestObj(name){
        this.name = name;
        this.accordion_header = "copied-text-test";
        this.accordion_header_id = "#" + this.accordion_header;
        this.number_of_matches = 0;
        this.all_matches = [];
        this.getNumberOfMatches = function(){
            console.log(this.name + ": number_of_matches: " + this.number_of_matches);
        };
        this.getAllMatches = function(){
            console.log(this.all_matches);
        };
    }

    FormattedTextTestObj.prototype = {
        constructor: FormattedTextTestObj,
        setup: function(num){
            if ( $(this.accordion_header_id).length === 0 ){
                var frame = '<div class="wrap"><h3 id="' + this.accordion_header + '" class="waiting"><span class="status waiting"></span>Test ' + num + ': Text is Formatted Properly</h3><div class="test-content"></div></div>';
                $("#" + test_container_a11y + " #" + accordian_container_a11y).append(frame);
            } else {
                $(this.accordion_header_id).parent().find(".test-content").empty();
            }
        },
        runtest: function(){
            // refer to parent's scope
            var par = this;
            par.number_of_matches = 0;
            par.all_matches = [];

            var matches = [];
            var ms_matches = [];
            var font_matches = [];
            var headings_matches = [];
            var localfilepath_match = [];
            var fontfamilystyle_match = [];

            var test_results = $(this.accordion_header_id).next(".test-content");
            test_results.append("<h4>Checking for properly formatted text</h4>");

            $(".s-lg-guide-admin-content").each(function(){
                var $this = $(this);

                var this_match = {
                    id: null,
                    match_parent: null,
                    box_title: $this.parents(".s-lib-box-container").find("h2.s-lib-box-title").clone().children().remove().end().text(),
                    matches: [],
                    errors_list: [],
                }

                // OK  check for 'style="font-family' , font-size 
                // OK  check for <font ...>
                //     possible check for empty content tags blockquote
                // OK  namespaceuri='urn:schemas-microsoft-com:office'
                // OK  href="file:..."
                // OK  class="MsoNormal"
                // OK  meta:'content="Word.Document"'

                //var foo_matches = $this.find("p:contains('foo'), div:contains('foo')");
                //processFoundMatches(foo_matches, "foo");

                //var meta_matches = $this.find("meta[content='Word.Document']");
                //processFoundMatches(meta_matches, "meta tag");

                //var namespaceuri_match = $this.find("[namespaceuri]");
                //processFoundMatches(namespaceuri_match, "namespace tag");

                matches = $this.find(".MsoNormal, .MsoListParagraphCxSpLast, [namespaceuri], meta[content='Word.Document']");
                if(matches.length){
                    this_match.matches = matches; 
                    this_match.match_parent = matches.parents(".s-lg-guide-admin-content");
                    ms_matches.push(this_match);
                }

                matches = $this.find("font");
                if(matches.length){
                    this_match.matches = matches; 
                    this_match.match_parent = matches.parents(".s-lg-guide-admin-content");
                    font_matches.push(this_match);
                }

                matches = $this.find("h1, h2");
                if(matches.length){
                    this_match.matches = matches; 
                    this_match.match_parent = matches.parents(".s-lg-guide-admin-content");
                    headings_matches.push(this_match);
                }

                matches = $this.find("[href^='file:']");
                if(matches.length){
                    this_match.matches = matches; 
                    this_match.match_parent = matches.parents(".s-lg-guide-admin-content");
                    localfilepath_match.push(this_match);
                }

                // TODO ignore <i> tags from fontawesome
                matches = $this.find("span[style*='font-'], div[style*='font-'], p[style*='font-'], h3[style*='box-'], p[style*='box-'], div[style*='box-']");
                if(matches.length){
                    this_match.matches = matches; 
                    this_match.match_parent = matches.parents(".s-lg-guide-admin-content");
                    fontfamilystyle_match.push(this_match);
                }
            });


            function processFoundMatches(objs, label){
                var message_accessibility_match = "<span class='label label-danger'>" + label + "</span>"
                var message_accessibility_label  = "<div class='accessibility-before-link'>" + message_accessibility_match + "</div>";

                $.each(objs, function(key,val){
                    //console.log(val);
                    var match = val.matches;
                    //console.log(match);
                    var parent_a = match.parents(".s-lg-guide-admin-content");
                    var parent = val.match_parent;

                    // sigh, we need to strip out content
                    var box_title = val.box_title;
                    //console.log(key + ": title: " + box_title);

                    // check if we've already tagged this element
                    var found_tag = parent.attr('data-tag');

                    // if there is a match in master list
                    if (found_tag && found_tag.length) {
                        // find data-tag in text_iter_array
                        var matches = $.grep(par.all_matches, function(obj) {
                            return obj.id === found_tag;
                        });
                        var foo = matches[0];

                        // update error_list list
                        foo.errors_list.push(label);
                    } else { // there is no match, add match to master list
                        parent.addClass("link-asset-warning");
                        anchor_tag = "text-formatting-" + par.number_of_matches;
                        
                        data_tag = anchor_tag;
                        parent.attr("data-tag", data_tag);

                        var my_error_list = [];
                        my_error_list.push(label);

                        var info = {
                            id: data_tag,
                            anchor: anchor_tag,
                            box_title: box_title,
                            errors_list: my_error_list,
                        }

                        par.all_matches.push(info);
                        parent.before("<a class='accessibility-test-anchor' name='" + anchor_tag + "'></a>");
                        parent.prepend(message_accessibility_label);
                        par.number_of_matches += 1;
                    }
                });
            }

            processFoundMatches(ms_matches, "Copied from MS Word");
            processFoundMatches(font_matches, "Using font tags");
            processFoundMatches(headings_matches, "Using h1 or h2 tags");
            processFoundMatches(localfilepath_match, "Using local file path");
            processFoundMatches(fontfamilystyle_match, "Suspicious use of non-standard styling");

            if(this.number_of_matches){
                var text_iter_text = "<div>Found " + this.number_of_matches + " content box" + (this.number_of_matches==1 ? "" : "es") + " with possible formatting issues.</div>"
                test_results.append(text_iter_text);
                text_iter_list = "<ol class='iter_list'>";
                $.each(par.all_matches, function(key,val){
                    text_iter_list += "<li><a href='#" + val.anchor + "'>Found in box '" + val.box_title + "'</a> Found: [" + val.errors_list.join(", ") + "]</li>";
                });
                text_iter_list += "</ol>";
                test_results.append(text_iter_list);
                test_results.append("<p class='test-help'><i class='fa fa-info-circle' aria-hidden='true'></i>Â <a target='_blank' href='http://libguides.bc.edu/guidestandards/accessibility#s-lg-box-wrapper-5821306'>How to remove unnecessary formatting</a> | Find a False Positive? <a href='https://bcwiki.bc.edu/display/UL/LibGuides+Accessibility+Widget#LibGuidesAccessibilityWidget-knownissues' target='_blank'>Check known issues</a></p>");

                $(this.accordion_header_id).addClass("fail");
            } else {
                test_results.append("<div class='pass-test'>This test passed!</div>");
                $(this.accordion_header_id).find(".status").addClass("pass");
                $(this.accordion_header_id).addClass("pass");
            }
        },
        clearResults: "",
    }

    function AltTextTestObj(name){
        this.name = name;
        this.accordion_header = "alt-text-test";
        this.accordion_header_id = "#" + this.accordion_header;
        this.setup = function(num){
            if ( $("#alt-text-test").length === 0 ){
                var frame = '<div class="wrap"><h3 id="' + this.accordion_header + '" class="waiting"><span class="status waiting"></span>Test ' + num + ': Images Have Alt Text</h3><div class="test-content"></div></div>';
                $("#" + test_container_a11y + " #" + accordian_container_a11y).append(frame);
            } else {
                $(this.accordion_header_id).parent().find(".test-content").empty();
            }
        };
        this.runtest = function(){
            var test_results = $(this.accordion_header_id).next(".test-content");

            test_results.append("<h4>Checking for alt text tags</h4>");
            var img_iter = 0;
            var img_iter_array = [];

            $('#midlevelcontainer #content .s-lg-guide-admin-content img').each(function(){
                //console.log($(this));
                var $img = $(this);
                var img_attr = $(this).attr('alt');

                // LibGuides book widgets are a known positive but users can't edit their alt text
                // let us ignore them for now...
                var known_widget = $(this).parents(".s-lg-book-cover");
                
                if (known_widget.length == 0 && (typeof img_attr == typeof undefined || img_attr == false || img_attr.length === 0)) {
                    $img.addClass("alert-border");
                    anchor_tag = "no-alt-" + img_iter;

                    // sigh, we need to strip out content
                    var parent_title = $img.parents(".s-lib-box-container").find("h2.s-lib-box-title").clone().children().remove().end().text();

                    data_tag = anchor_tag;
                    $img.attr("data-tag", data_tag);

                    var filename = $img.attr('src').split('/').pop();

                    var info = {
                        id: data_tag,
                        anchor: anchor_tag,
                        parent_title: parent_title,
                        filename: filename,
                        errors: ["missing alt text or empty alt text"],
                    }
                    img_iter_array.push(info);
                    $img.before("<a class='accessibility-test-anchor' name='" + anchor_tag + "'></a>");
                    img_iter += 1;
                }
            });

            if(img_iter){
                var img_iter_text = "<div>Found " + img_iter + " image" + (img_iter==1 ? "" : "s") + " with missing alt text.</div>"
                test_results.append(img_iter_text);
                img_iter_list = "<ol class='iter_list'>";
                $.each(img_iter_array, function(key,val){
                    img_iter_list += "<li><a href='#" + val.anchor + "'>Found in box '" + val.parent_title + "'</a> [image filename: " + val.filename + "]</li>";
                });
                img_iter_list += "</ol>";
                test_results.append(img_iter_list);
                test_results.append("<p class='test-help'><i class='fa fa-info-circle' aria-hidden='true'></i>Â <a target='_blank' href='http://libguides.bc.edu/guidestandards/accessibility#s-lg-box-wrapper-5821855'>How to add alt text</a> | Find a False Positive? <a href='https://bcwiki.bc.edu/display/UL/LibGuides+Accessibility+Widget#LibGuidesAccessibilityWidget-knownissues' target='_blank'>Check known issues</a></p>");
                $(this.accordion_header_id).addClass("fail");

            } else {
                test_results.append("<div class='pass-test'>This test passed!</div>");
                $(this.accordion_header_id).find(".status").addClass("pass");
                $(this.accordion_header_id).addClass("pass");
            }
        }
    }

    function runAllTests(all_tests){
        // process each test object's 'runtest' method
        $.each(all_tests, function(key, testObj){
            console.log("running test: " + testObj.name);
            testObj.runtest(++key);
            //testObj.getNumberOfMatches();
            //testObj.getAllMatches();
        });

        // this version of jqueryui needs to be 'destroyed' to allow for dynamic content
        resetAccordion(false);
    }

    if ((oldEditPathLG || newEditPathLG) && bc_custom_bar.length) {
        // create test objects
        var formattedTextTest = new FormattedTextTestObj("formatted text");
        var altTextTestObj    = new AltTextTestObj("alt text");

        // add test objs to array - order here indicates the order they will be displayed
        all_tests.push(altTextTestObj);
        all_tests.push(formattedTextTest);

        // set up DOM
        setupTests(all_tests);

        // jquery accordion widget needs to be reset after dynamically adding content
        resetAccordion(true);
    }
});