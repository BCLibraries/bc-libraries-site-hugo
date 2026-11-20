"use strict";
$(document).ready(function(){
    //let check_admin_path = $(location).attr('pathname');
    let bc_custom_bar = $("#bc-custom-bar-accessibility-container");

    const oldEditPathLG = window.location.pathname.includes('admin_c.php');
    const newEditPathLG = window.location.pathname.includes('/libguides/guides/edit');
    
    const DEBUG = true;
    
    class WidgetManager {
        constructor(args) {
            const {script_version, script_date, widget_container_id} = args;
            
            // make sure there is only one instance of this class
            if (WidgetManager._instance) {
                throw new Error('WidgetManager already has an instance!!!');
            }
            WidgetManager._instance = this;
            
            this.script_version = script_version;
            this.script_date = script_date;
            this.widget_container_id = widget_container_id;
            this.tests_container_id = `${this.widget_container_id}-tests_container`;
            
            this.status_message_id = `${this.widget_test_container_id}-status-message`;
        }
        
        setupWidget() {
            let elem = `<div id="${this.widget_container_id}" style="display:none;" class="bc-custom-bar-item"><h3>Accessibility Test (${this.script_version}) (last updated ${this.script_date})</h3><div class="panel-content"><div class="whatisthis"><i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp;<a href="https://bostoncollege.atlassian.net/wiki/spaces/UL/pages/58659308/LibGuides+Accessibility+Widget#Known-issues" target="_blank">What is this?</a></div><div id="${this.status_message_id}"></div><div id="${this.tests_container_id}"></div><button type="button" id="run-tests-v2">Begin Tests</button></div></div>`;
            
            bc_custom_bar.show().append(elem);
            $("#" + this.widget_container_id).fadeIn("fast");
            
            // set initial widget status message
            this.updateStatusMessage("<h4>Press the button below to check this page for common accessibility issues.</h4><p>The following tests will be run.</p>");
            
            // create main accordion
            $('#' + this.widget_container_id).accordion({
                collapsible: true,
                heightStyle: "content",
                active: 'none',
                disabled: false
            });
        }
        
        addTestToWidget(test_elem) {
            $(`#${this.tests_container_id}`).append(test_elem);
        }
        
        updateStatusMessage(message){
            $(`#${this.status_message_id}`).html(message);
        }
    }
    
    // singleton class for managing test plugins
    // TODO: Make into class object 
    const testManager = (function(){
        let instance;
        
        let plugins = {};
        
        let plugin_id = 0;
        
        let widgetManager;
        
        let createInstance = function() {
            let object = new Object("I am the instance");
            return object;
        }
        
        let getInstance = function(){
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
        
        let register = function(plugin) {
            plugins[++plugin_id] = plugin;
            plugin['setUp'](widgetManager);
            console.log(`[register] just registered plugin id: ${plugin_id} | name : ${plugin.name}`);
        }
        
        let runAllTests = function() {
            for (const key in plugins) {
                console.log(`[runAllTests] running test for ${plugins[key]['name']}`);
                plugins[key]["runTest"]();
            }
        }
        
        let clearAllResults = function() {
            for (const key in plugins) {
                console.log(`[clearAllResults] clearing test results for ${plugins[key]['name']}`);
                plugins[key]["clearResults"]();
            }
        }
        
        let listAllTests = function(){
            console.log(plugins);
            for (const key in plugins) {
                console.log(`[listAllTests] contains test id: ${key} | name : ${plugins[key]["name"]} | description: ${plugins[key]["description"]}`);
            }
        }
        
        let connectWith = function(wm) {
            widgetManager = wm;
        }

        return {
            getInstance: getInstance,
            register: register,
            runAllTests: runAllTests,
            listAllTests: listAllTests,
            clearAllResults: clearAllResults,
            connectWith: connectWith
        }
    })();
    
    // builder parent class
    class TestParent {
        constructor(args) {
            const {name, divID, description} = args;
            this.name = name || "test";
            this.divID = divID;
            this.description = description || "Accessibility Test";
            
            this.accordion_header = `#${this.divID} h3.header`;
            this.test_results = `#${this.divID} .test-content`;
            
            this.wrapper = `<div id="${this.divID}" class="wrap"><h3 class="header waiting"><span class="status waiting"></span> ${this.description}</h3><div class="test-content"></div></div>`;
        }
        
        initTest() {
            console.log(`INIT_TEST: my name: is ${this.name}`);
        }
        
        setUp(wm) {
            // add test to widgetManager
            wm.addTestToWidget(this.wrapper);
            
            $(`#${this.divID}`).accordion({
                collapsible: true,
                heightStyle: "content",
                active: 'none',
                header: '> h3.header',
                disabled: true
            });
        };
        
        getWrapper() {
            return this.wrapper;
        }
        
        clearResults() {                
            $(this.accordion_header).removeClass("fail pass waiting");
            $(this.test_results).empty();
            
            // remove red dashed borders
            $("div").removeClass("link-asset-warning");
            
            // remove anchor links
            $(".accessibility-before-link").remove();
            
            // clear away all the anchor tags and alert classes
            $(".accessibility-test-anchor").each(function(){
                $(this).next().removeClass("alert-border");
                $(this).next().removeAttr("data-tag");
                $(this).remove();
            });
        }
        
        runTest() {};
        
        disableAccordion(displayBool) {
            if (typeof displayBool == "boolean") {
                $(`#${this.divID}`).accordion({
                    disabled: displayBool
                });
            } else {
                console.error(`[${this.name}] Warning! Can't determine if accordion should be disabled.`)
            }
        }
        
        displayTestResults(results) {
            // Check that results exists
            if (typeof results == "undefined") {
                console.log(`[${this.name}] Warning! No results were found for this test`);
                return;
            }
            
            console.log(`[${this.name}] Received ${results.length} result(s):`)
            console.log(results);
            
            let test_results = $(this.test_results);
            
            // all tests passed
            if (results.length == 0) {
                // add outer layer styling
                $(this.accordion_header).find(".status").removeClass("fail waiting").addClass("pass");
                $(this.accordion_header).removeClass("fail waiting").addClass("pass");
                
                // display message
                test_results.append("<div class='pass-test'>This test passed!</div>");
                this.disableAccordion(false);
            } else {
                this.disableAccordion(true);
                // add outer layer styling for fail
                $(this.accordion_header).find(".status").removeClass("pass waiting").addClass("fail");
                $(this.accordion_header).removeClass("pass waiting").addClass("fail");
            }
            
            /*
                {
                    test_label: "test-format-nonstandard-styling"
                    test_alert: "Suspicious use of non-standard styling",
                    matches: [<span>, …],
                    content_box_id: "s-lg-content-70168490",
                    parent_id: "s-lg-box-1111111-container",
                    parent_title: "Test box 1"
                }
            */
            
            let alert_message_wrapper_element  = "<div class='accessibility-before-link'></div>";
            
            let data_tags = [];
            
            // set up test result description
            let results_header_html = `<div class=''>Found ${results.length} possible issue(s).</div>`;
            let results_list_html = "<ol class='iter_list'></ol>";
            test_results.append(results_header_html);
            test_results.append(results_list_html);
            
            let results_list = test_results.find('.iter_list');
            
            // loop through each result and mark up content
            $.each(results, function(index, element){
                let content_box = $(`#${element.content_box_id}`);
                let content_box_data_id = `${element.test_label}-${index}`;
                
                let element_to_update = content_box;
                
                // add red warning border to element if the "wrap_element" key is found in the results object
                // TODO: Check if "wrap_element" is a valid string
                if ("wrap_element" in element) {
                    let add_tag_element = $(`.${element.wrap_element}`);
                    add_tag_element.wrap( "<div class='link-asset-warning-element'></div>");
                    element_to_update = add_tag_element.parent(".link-asset-warning-element");
                }
                
                element_to_update.addClass("link-asset-warning");
                
                // add data-tag to content-box
                // TODO: This needs a better way to accommodate multiple data-tags
                let element_data_tags = element_to_update.attr("data-tag");
                element_data_tags += ` ${content_box_data_id}`;
                
                element_to_update.attr("data-tag", element_data_tags);
                
                // add anchor link pointing to data-tag
                let test_anchor = `<a class='accessibility-test-anchor' name='${content_box_data_id}'></a>`;
                $(test_anchor).insertBefore(element_to_update);
                
                // display alert messages
                // append wrapper class if it doesn't already exist for this element
                if (element_to_update.find(".accessibility-before-link").length <= 0){
                    element_to_update.prepend(alert_message_wrapper_element);
                };
                
                let alert_message_wrapper = element_to_update.find(".accessibility-before-link");
                alert_message_wrapper.append(" <span class='label label-danger'>" + element.test_alert + "</span> ");
                
                // include description text and link to anchor
                let result_issue_html = `<li><strong>Issue:</strong> ${element.test_alert}<br/><strong>Location:</strong> <a href="#${content_box_data_id}">'${element.parent_title}'</a></li>`;
                results_list.append(result_issue_html);
            });
            
            // append info message
            // TODO: Don't show the same message for every test
            let errorInfoMessage = this.falsePositiveHTMLGenerator("https://libguides.bc.edu/guidestandards/accessibility", "LibGuides Accessibility Best Practices");
            test_results.append(errorInfoMessage);
            
            this.disableAccordion(false);
        }
        
        falsePositiveHTMLGenerator(linkURL, linkLabel){
            return `<p class='test-help'><i class='fa fa-info-circle' aria-hidden='true'></i> <a target='_blank' href='${linkURL}'>${linkLabel}</a> | Find a False Positive? <a href='https://bostoncollege.atlassian.net/wiki/spaces/UL/pages/58659308/LibGuides+Accessibility+Widget#Known-issues' target='_blank'>Check known issues</a></p>`;
        }
    }
    
    class TestAltText extends TestParent {
        runTest() {
            let all_matches = [];
            
            $(".s-lib-box-container").each(function(){
                let $parent = $(this);
                let parent_title = $parent.find("h2.s-lib-box-title").clone().children().remove().end().text();
                let parent_id = $parent.attr('id');
        
                $parent.find('.s-lg-guide-admin-content img').each(function(index, element){
                    let $img = $(this);
                    let img_alt_text = $img.attr('alt');
                    
                    let $content_box = $img.parent(".s-lg-guide-admin-content");
                    let content_box_id = $content_box.attr('id');
                    let pattern_matches;
            
                    // LibGuides book widgets are a known positive 
                    // but users can't edit their alt text.
                    // Let us ignore them for now...
                    let known_widget = $(this).parents(".s-lg-book-cover");
                    if (known_widget.length) {
                        return;
                    }
                    
                    if (typeof img_alt_text == typeof undefined || img_alt_text == false || img_alt_text.length === 0) {
                        let filename = $img.attr('src').split('/').pop();
                        
                        // add unique ID to image element
                        let image_unique_id = `test-check-image-ID-${index}`;
                        $img.addClass(image_unique_id);
                        
                        let info = {
                            test_label: "test-check-alt-tags",
                            test_alert: "Missing or empty alt text",
                            parent_title: parent_title,
                            parent_id: parent_id,
                            content_box_id: content_box_id,
                            matches: [filename],
                            wrap_element: image_unique_id
                        }
                        
                        all_matches.push(info);
                    }
                });
            });
            
            this.displayTestResults(all_matches);
            console.log(`[${this.name}] Finished running test`);
        }
    }
    
    class TestFormatting extends TestParent {
        runTest() {
            let all_matches = [];
            
            $(".s-lib-box-container").each(function(){
                let $parent = $(this);
                let parent_title = $parent.find("h2.s-lib-box-title").clone().children().remove().end().text();
                let parent_id = $parent.attr('id');
                
                // loop through each content child
                $parent.find(".s-lg-guide-admin-content").each(function(){
                    let $content_box = $(this);
                    let content_box_id = $content_box.attr('id');
                    let pattern_matches;
                
                    pattern_matches = $content_box.find(".MsoNormal, .MsoListParagraphCxSpLast, [namespaceuri], meta[content='Word.Document']");
                    if(pattern_matches.length){
                        all_matches.push({
                            test_label: "test-format-ms-word",
                            test_alert: "Copied from MS Word",
                            parent_title: parent_title,
                            parent_id: parent_id,
                            content_box_id: content_box_id,
                            matches: pattern_matches
                        });
                    }
                
                    pattern_matches = $content_box.find("font");
                    if(pattern_matches.length){
                        all_matches.push({
                            test_label: "test-format-font-tags",
                            test_alert: "Using font tags",
                            parent_title: parent_title,
                            parent_id: parent_id,
                            content_box_id: content_box_id,
                            matches: pattern_matches
                        });
                    }
                
                    pattern_matches = $content_box.find("h1, h2");
                    if(pattern_matches.length){
                        all_matches.push({
                            test_label: "test-format-header-tags",
                            test_alert: "Using H1 or H2 tags",
                            parent_title: parent_title,
                            parent_id: parent_id,
                            content_box_id: content_box_id,
                            matches: pattern_matches
                        });
                    }
                
                    pattern_matches = $content_box.find("[href^='file:']");
                    if(pattern_matches.length){
                        all_matches.push({
                            test_label: "test-format-local-file-path",
                            test_alert: "Using local file path",
                            parent_title: parent_title,
                            parent_id: parent_id,
                            content_box_id: content_box_id,
                            matches: pattern_matches
                        });
                    }
                
                    pattern_matches = $content_box.find("span[style*='font-'], div[style*='font-'], p[style*='font-'], h3[style*='box-'], p[style*='box-'], div[style*='box-']");
                    if(pattern_matches.length){
                        all_matches.push({
                            test_label: "test-format-nonstandard-styling",
                            test_alert: "Suspicious use of non-standard styling",
                            parent_title: parent_title,
                            parent_id: parent_id,
                            content_box_id: content_box_id,
                            matches: pattern_matches
                        });
                    }
                });
            });
            
            this.displayTestResults(all_matches);
            console.log(`[${this.name}] Finished running test`);
        } 
    }
    
    class TestHTMLTable extends TestParent {            
        runTest() {
            let all_matches = [];
            
            $(".s-lib-box-container").each(function(index, element){
                let $parent = $(this);
                let parent_title = $parent.find("h2.s-lib-box-title").clone().children().remove().end().text();
                let parent_id = $parent.attr('id');
        
                $parent.find('.s-lg-guide-admin-content table').each(function(){
                    let $tbl = $(this);
                    
                    let $content_box = $tbl.parent(".s-lg-guide-admin-content");
                    let content_box_id = $content_box.attr('id');
                    let pattern_matches;
                    
                    // check for existence of <thead> tag
                    let table_header = $tbl.find("thead");
                    
                    if (table_header.length == 0) {                            
                        // add unique ID to table element
                        let table_unique_id = `test-check-table-ID-${index}`;
                        $tbl.addClass(table_unique_id);
                        
                        let result = {
                            test_label: "test-check-table-header",
                            test_alert: "HTML Table is missing a required header",
                            parent_title: parent_title,
                            parent_id: parent_id,
                            content_box_id: content_box_id,
                            matches: [table_unique_id],
                            wrap_element: table_unique_id
                        }
                        
                        all_matches.push(result);
                    }
                });
            });
            
            this.displayTestResults(all_matches);
            console.log(`[${this.name}] Finished running test`);
        }
    }
    
    class TestFoo extends TestParent {
        clearResults() {
            super.clearResults();
            console.log("using super on clearResults");
        }
        
        runTest() {
            let results = [
                {
                    test_label: "test-foo",
                    test_alert: "Sample test",
                    parent_title: "This is a parent title",
                    parent_id: "",
                    content_box_id: "",
                    matches: []
                }
            ];
            
            this.displayTestResults(results);
            console.log(`[${this.name}] Finished running test`);
        }
    }
    
    if (DEBUG || ((oldEditPathLG || newEditPathLG) && bc_custom_bar.length)) {
        let widget_config = {
            script_version: "v2.2",
            script_date: "2026-11-20",
            widget_container_id: "accessibility-widget-container"
        }            
        let accessibilityTestWidget = new WidgetManager(widget_config);
        
        accessibilityTestWidget.setupWidget();
        
        // attach accessibilityTestWidget to testManager
        // TODO: Find a better way to manage this relationship
        testManager.connectWith(accessibilityTestWidget);

        // instantiate tests
        // TODO: Use factory pattern for instantiating tests
        let testAltText = new TestAltText({
            name: "testAltText", 
            divID: "alt-text-test", 
            description: "Check if alt-text is present"
        });
        
        let testFormatting = new TestFormatting({
            name: "testFormatting", 
            divID: "copied-text-test", 
            description: "Check if text is formatted correctly"
        });
        
        let testHTMLTable = new TestHTMLTable({
            name: "testHTMLTable", 
            divID: "html-table-test", 
            description: "Check if HTML tables are formatted correctly"
        });

        // register tests with the manager object
        testManager.register(testAltText);
        testManager.register(testFormatting);
        testManager.register(testHTMLTable);

        // method to list all tests in the manager object
        testManager.listAllTests();

        // set up click event to start up tests
        $("#run-tests-v2").click(function(){
            // resets results display
            testManager.clearAllResults();

            // run all tests
            testManager.runAllTests();

            // update widget status message
            accessibilityTestWidget.updateStatusMessage("<h4>Press the button again to rerun the acessibility tests.</h4><p>All tests have completed. Click on each header for additional information for that test.</p>")

            $(this).html("Rerun all tests");

            // get page title for GA
            // let current_title = $(document).attr('title');
            // let regex = /^EDIT (.*)- Libraries at Boston College$/;
            // let output = regex.exec(current_title);
            // //console.log(output);
            // if (output.length){
            //     current_title = output[1];
            // }
            //
            // send GA event
            //ga('send', 'event', 'accessibility-test', 'click', current_title);
        });
    }
});