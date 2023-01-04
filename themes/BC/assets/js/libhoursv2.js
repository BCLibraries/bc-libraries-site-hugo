/* FETCH LIBRARY HOURS */

$(document).ready(function(){

    // turn off/on showing department hours e.g., Gargan Hall
    const SHOW_DEPARTMENTS = false;

    // jQuery selector for the boxes containing the hours
    const HOURS_TABLE_SELECTOR = '.table-hours table tbody';

    // the locations we want, in order
    const locations_to_show = [
        new Location("501", "O'Neill Library", "https://libguides.bc.edu/oneill/hours", "library"),
        new Location("505", "Bapst Library", "https://libguides.bc.edu/bapst/hours", "library"),
        new Location("506", "Bapst Library - Gargan Hall", "https://libguides.bc.edu/bapst/hours", "department"),
        new Location("507", "Burns Library", "https://libguides.bc.edu/burns", "library"),
        new Location("508", "Educational Resource Center", "https://libguides.bc.edu/erc/hours", "library"),
        new Location("509", "Law Library", "https://www.bc.edu/bc-web/schools/law/sites/students/library/using/hours.html", "library"),
        new Location("510", "Social Work Library", "https://libguides.bc.edu/socialwork/hours", "library"),
        new Location("511", "Theology & Ministry Library", "https://libguides.bc.edu/tml/hours", "library")
    ].filter(loc => { return SHOW_DEPARTMENTS || loc.category !== 'department' });

    // grab each library's data from the output and place it where it needs to go
    function setHours(data){

        // no locations? for now, just die early.
        if (! 'locations' in data) {
            return;
        }

        // convert data into hash keyed by location id for easier querying.
        const location_map = {};
        data.locations.forEach(loc => {
            location_map[loc.lid] = loc;
        });

        // create a <tbody> that will hold the hours
        const new_tbody = document.createElement('tbody');

        // scroll through the locations we want to show, find them in the data, and 
        // render them
        locations_to_show.forEach(loc_to_show => {

            // skip locations that aren't in the data
            if (! location_map[loc_to_show.id]) {
                console.error(`Hours for ${loc_to_show.label} (${loc_to_show.id}) were not retrieved`);
                const error_tr = buildRow('Error retrieving hours', loc_to_show.label, loc_to_show.url);
                new_tbody.appendChild(error_tr)
                return;
            }

            // get the data for this location from the hash
            const location_data = location_map[loc_to_show.id];
            
            if (location_data.name == "O'Neill Library" && location_data.rendered.includes('*')) {
                $('.onl-asterisk-notice').show();
            }

            // libraries with an attached note to the hours will render
            // the hours string, then a new line char, then the note string.
            // we will replace the new line char with a semicolon.
            const hours = location_data.rendered.replace("\n", " ; ");

            const new_tr = buildRow(hours, loc_to_show.label, loc_to_show.url);
            new_tbody.appendChild(new_tr)
        });

        // clone the new <tbody> into the hours tables
        document.querySelectorAll(HOURS_TABLE_SELECTOR).forEach(old_tbody => {
            const new_tbody_clone = new_tbody.cloneNode(true);
            old_tbody.parentNode.replaceChild(new_tbody_clone, old_tbody);
        });
    };

    // build one row of the months table
    function buildRow(hours, label, url) {

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.textContent = label;

        const label_cell = document.createElement("td");
        label_cell.append(link);

        const hours_cell = document.createElement("td");
        hours_cell.classList.add("lib-hours");
        hours_cell.textContent = hours;

        const row = document.createElement("tr");
        row.append(label_cell);
        row.append(hours_cell);

        return row;
    }

    function Location(id, label, url, category) {
        this.id = id;
        this.label = label;
        this.url = url;
        this.category = category;
    }

    // set today's date
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const today = new Date();
    const month = months[today.getMonth()];
    const date = month + " " + today.getDate() + ", " + today.getFullYear();
    $(".hours-todays-date").text(date);

    // call to the hours api
    $.ajax({
        type: "GET",
        url: "//api3.libcal.com/api_hours_today.php?iid=609&lid=0&format=json&system_time=0",
        jsonp: "callback",
        dataType: "jsonp",
        cache: true,
        contentType: "application/javascript",
        data: {l: '0'},
        headers: {'Cache-Control': 'max-age=60'},
        success: setHours,
        error: function(){
            console.error("could not retrieve hours!");
            $(".table-hours tbody tr td:last-child").html("Error retrieving hours");
        },
    });
});