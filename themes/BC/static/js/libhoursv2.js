/* FETCH LIBRARY HOURS */

$(document).ready(function () {

    // turn off/on showing department hours e.g., Gargan Hall
    const SHOW_DEPARTMENTS = false;

    // jQuery selector for the boxes containing the hours
    const HOURS_TABLE_SELECTOR = '.table-hours table tbody';

    // the locations we want, in order
    const locations_to_show = [
        new Location("501", "O'Neill Library", "https://libguides.bc.edu/oneill/hours", "library", "onl"),
        new Location("505", "Bapst Library", "https://libguides.bc.edu/bapst/hours", "library", "bapst"),
        new Location("506", "Bapst Library - Gargan Hall", "https://libguides.bc.edu/bapst/hours", "department", "gargan"),
        new Location("507", "Burns Library", "https://libguides.bc.edu/burns/hours", "library", "burns"),
        new Location("508", "Educational Resource Center", "https://libguides.bc.edu/erc/hours", "library", "erc"),
        new Location("509", "Law Library", "https://www.bc.edu/bc-web/schools/law/sites/students/library/using/hours.html", "library", "law"),
        new Location("510", "Social Work Library", "https://libguides.bc.edu/socialwork/hours", "library", "swl"),
        new Location("511", "Theology and Ministry Library", "https://libguides.bc.edu/tml/hours", "library", "tml")
    ].filter(loc => {
        return SHOW_DEPARTMENTS || loc.category !== 'department'
    });

    // set today's date
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const options = {
        hour12: false,
        weekday: "long",
        hour: "numeric"
    };
    const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
    const [dayOfWeek, comma, hour] = dateTimeFormat.formatToParts(today);
    const allNightStatus = getTodaysTwentyfourHourStatus(dayOfWeek, hour);
    const oneillHours = getOneillHours(dayOfWeek, hour);
    const month = months[today.getMonth()];
    const date = month + " " + today.getDate() + ", " + today.getFullYear();

    // grab each library's data from the output and place it where it needs to go
    function setHours(data) {

        console.log(allNightStatus);

        // no locations? for now, just die early.
        if (!'locations' in data) {
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
            if (!location_map[loc_to_show.id]) {
                console.error(`Hours for ${loc_to_show.label} (${loc_to_show.id}) were not retrieved`);
                const error_tr = buildRow('Error retrieving hours', loc_to_show.label, loc_to_show.url);
                new_tbody.appendChild(error_tr)
                return;
            }

            // get the data for this location from the hash
            const location_data = location_map[loc_to_show.id];

            // libraries with an attached note to the hours will render
            // the hours string, then a new line char, then the note string.
            // we will replace the new line char with a semicolon.
            const hours = location_data.rendered.replace("\n", " ; ");

            // Add a row to the hours table
            const new_tr = buildRow(hours, loc_to_show.label, location_data.url);
            new_tbody.appendChild(new_tr);

            // Insert the hours into any other places it needs to appear on the page.
            replaceHours(loc_to_show.code, hours);
        });

        // clone the new <tbody> into the hours tables
        document.querySelectorAll(HOURS_TABLE_SELECTOR).forEach(old_tbody => {
            const new_tbody_clone = new_tbody.cloneNode(true);
            old_tbody.parentNode.replaceChild(new_tbody_clone, old_tbody);
        });
    }

    /**
     * Replace hours text in an element
     *
     * Looks for cells with classes "lib-<code>"—where <code> is the library's code—and
     * replaces them with today's hours.
     *
     * @param {string} lib_code
     * @param {string} hours
     */
    function replaceHours(lib_code, hours) {
        const to_replace = `todays-hours-lib-${lib_code}`;
        const matches = document.getElementsByClassName(to_replace);
        for (let match of matches) {
            match.innerHTML = hours;
        }
    }

    /**
     * Build one row of the hours table
     *
     * @param {string} hours
     * @param {string} label
     * @param {string} url
     * @return {HTMLTableRowElement}
     */
    function buildRow(hours, label, url) {

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.textContent = label;

        const label_cell = document.createElement("td");
        label_cell.append(link);

        const hours_cell = document.createElement("td");
        hours_cell.classList.add("lib-hours");
        hours_cell.textContent = hours.replace('(*)', '');

        if (hours.includes('*')) {
            hours_cell.textContent = oneillHours;
            const twenty_four_hour_notice = document.createElement('span');
            twenty_four_hour_notice.className = 'badge badge-primary twenty-four-hours-notice';
            twenty_four_hour_notice.textContent = allNightStatus;
            hours_cell.appendChild(twenty_four_hour_notice);
        }

        const row = document.createElement("tr");
        row.append(label_cell);
        row.append(hours_cell);

        return row;
    }

    /**
     * A single location
     *
     * @param {string} libcal_id
     * @param {string} label
     * @param {string} default_url
     * @param {string} category library or department?
     * @param {string} code the letter-code for the library
     * @constructor
     */
    function Location(libcal_id, label, default_url, category, code) {
        this.id = libcal_id;
        this.label = label;
        this.url = default_url;
        this.category = category;
        this.code = code;
    }


    /**
     * Fetch the hours and update them
     *
     * @return {Promise<void>}
     */
    async function getHours() {
        const url = "https://library.bc.edu/bc-hours/api_hours_today.php";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const locations = await response.json();
            setHours(locations);
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     *
     * @param {DateTimeFormatPart} localWeekday
     * @param {DateTimeFormatPart} localHour
     */
    function getTodaysTwentyfourHourStatus(localWeekday, localHour) {

        console.log(localHour);
        const open24Hours = 'Level One Open 24 Hours';
        const openUntilTwoAM = 'Level One Open Until 2:00am';

        switch (dayOfWeek.value) {
            case 'Monday':
            case 'Tuesday':
            case 'Wednesday':
            case 'Thursday':
                return open24Hours;
            case 'Friday':
                if (localHour.value < 7) {
                    return open24Hours;
                } else {
                    return openUntilTwoAM;
                }
            case 'Saturday':
                return openUntilTwoAM;
            case 'Sunday':
                if (localHour.value < 7) {
                    return openUntilTwoAM;
                } else {
                    return open24Hours;
                }
        }

        // Between Monday @ 7am and Friday @ 7am - 7:00a - 2:00a, Level One Open 24 hours
        // Between Friday @ 7am and Saturday @ 9am -  7:00a - 10:00p, Level One Open Until 2am
        // Between Saturday @ 9am and Sunday @ 9am - 9:00a - 10:00p, Level One Open Until 2am
        // Between Sunday @ 9am and Monday @ 7am - 9:00a - 10:00p, Level One Open 24 hours
    }

    function getOneillHours(localWeekday, localHour) {

        const weekdayHours = '7:00am - 2:00am';
        const fridayHours = '7:00am - 10:00pm';
        const saturdayHours = '9:00am - 10:00pm';
        const sundayHours = '9:00am - 2:00am';

        switch (dayOfWeek.value) {
            case 'Monday':
            case 'Tuesday':
            case 'Wednesday':
            case 'Thursday':
                return weekdayHours;
            case 'Friday':
                if (localHour.value < 7) {
                    return weekdayHours;
                } else {
                    return fridayHours;
                }
            case 'Saturday':
                return saturdayHours;
            case 'Sunday':
                return sundayHours
        }

        // Between Monday @ 7am and Friday @ 7am - 7:00a - 2:00a, Level One Open 24 hours
        // Between Friday @ 7am and Saturday @ 9am -  7:00a - 10:00p, Level One Open Until 2am
        // Between Saturday @ 9am and Sunday @ 9am - 9:00a - 10:00p, Level One Open Until 2am
        // Between Sunday @ 9am and Monday @ 7am - 9:00a - 10:00p, Level One Open 24 hours
    }

    $(".hours-todays-date").text(date);
    getHours().then();
});