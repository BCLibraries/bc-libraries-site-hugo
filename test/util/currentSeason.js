// The seasons
const seasons = [
    {name: 'winter', startMonth: 1, startDay: 1, endMonth: 3, endDay: 31},
    {name: 'spring', startMonth: 4, startDay: 1, endMonth: 6, endDay: 20},
    {name: 'summer', startMonth: 6, startDay: 21, endMonth: 9, endDay: 22},
    {name: 'fall', startMonth: 9, startDay: 23, endMonth: 12, endDay: 20},
    {name: 'winter', startMonth: 12, startDay: 21, endMonth: 12, endDay: 31}
]

/**
 * Get the name of the current season
 *
 * Returns a lower-case name of the current season, as it should appear in any
 * seasonally-appropriate content.
 *
 * @returns {String} the name of the current season
 */
function currentSeason() {
    const today = new Date();
    const thisMonth = today.getMonth() + 1; // JS months are numbered 0-11
    const thisDate = today.getDate();

    const thisSeason = seasons.find(season => {
        if (thisMonth < season.startMonth || thisMonth > season.endMonth) {
            return false;
        }

        if (thisMonth === season.startMonth && thisDate < season.startDay) {
            return false;
        }

        if (thisMonth === season.endMonth && thisDate > season.endDay) {
            return false;
        }

        return true;
    });
    return thisSeason.name;
}

module.exports = currentSeason;
