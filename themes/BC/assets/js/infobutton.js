$(document).ready(function(){
    /* function that takes in an object of k:v pairs and returns an html string. */
    var buildBoxHTML = function(boxValues) {
        var boxHTML = "";
        $.each(boxValues, function(k,v){
            boxHTML += "<p><span class='box-label'>"+k+":</span> <span class='box-value'>"+v+"</p>";
        });
        return boxHTML;
    };

    /* only trigger in Edit Mode
    // find every box that has a title, which indicates there is probably content inside */
    $(".edit-mode .s-lib-box-title").each(function(index){
        /* get the box wrapper ID string of this box */
        var boxWrapperID = $(this).parents("div[class^='s-lg-box-wrapper-']").attr("id");
        /* get the box ID string of this box
        // this is used for constructing the CSS for hiding the box title */
        var boxID = $(this).parents(".s-lib-box").attr("id");
        /* create a special ID string for the corresponding dialog box */
        var dialogID = "dialog-" + boxWrapperID;
        /* get box title string */
        var boxTitle = $(this).clone().children().remove().end().text();
        /* set up an object of k:v pairs that will then be used to build out
        // the inner content of the dialog box. 
        // order of k:v pairs is how they will be placed within the dialog box. */
        var boxValues = {
            "Box Title": boxTitle,
            "Anchor Tag": "#"+boxWrapperID,
            "Hide Box title": "Add this custom CSS to the guide<textarea><style>\n\t.view-mode #"+boxID+" .s-lib-box-title {display:none;}\n</style></textarea>"
        };
        var boxHTML = buildBoxHTML(boxValues);
        /* when clicked. this button that will open a dialog box */
        var buttonHTML = "<a class='more-info' id='" + boxWrapperID + "'><i title='Additional box information' class='fa fa-info-circle'></i></a><div id='" + dialogID + "' class='dialog' style='display:none;' title='Box information'>" + boxHTML + "</div>";
        /* append the button html to the box */
        $(this).find(".float-end").append(buttonHTML);
        /* make sure the dialog box doesn't auto open */
        $("div#" + dialogID).dialog({
           autoOpen: false
        });
    });

    /* click event for the dialog box */
    $(".more-info").click(function(){
        var mydialogID = $(this).attr('id');
        $("#dialog-" + mydialogID).dialog({
            width: 600, 
            modal: true, 
            buttons: [
                {
                  text: "OK",
                  click: function(){
                      $(this).dialog("close");
                  }
                }
            ],
            focus: function(){
                $(this).parents('.ui-dialog-buttonpane button:eq(0)').focus();
            }
        });
        $("#dialog-" + mydialogID).dialog("open");
    });
});