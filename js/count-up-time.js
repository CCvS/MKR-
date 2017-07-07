// Called by the JSONP
function loadTimes(raceList) {
  raceList.forEach(function (race) {

    // The goals are a string instead of a numeric for some reason.
    // Probably as a potential gotcha in this test..
    config.times[race.date].push({
      timeRacerId: race.timeRacerId
    });
  });
}

// Generates the main data structure containing results / racers / league tables etc
function playTimes() {
    var tablesByDate = {};

    // May as well use the fast modern tools we have available if we don't support old browsers
    Object.keys(config.times).forEach(function (date, index, dates) {
        config.times[date].forEach(function (race) {
            var timeRacer = config.racers[race.timeRacerId];

            timeRacer.raced++;

        });

        // This is the table after all the times on a given date
        tablesByDate[date] = sortLeagueTable(config.racers);

        // Now calculate the movement of racers between matchdays
        tablesByDate[date].forEach(function (racer, position) {
            racer.position = position;

            // Gets the position from the previous matchday table
            if (dates[index - 1]) {
                tablesByDate[dates[index - 1]].forEach(function (lastRacer) {
                    if (racer.id === lastRacer.id) {
                        // LOWER position numbers are higher up the table
                        // That's why the logic seems reversed.
                        // It makes sense when working with the HTML

                        if (racer.position < lastRacer.position) {
                            racer.movement = "up";
                        } else if (racer.position > lastRacer.position) {
                            racer.movement = "down";
                        } else {
                            racer.movement = "";
                        }
                    }
                });
            }
        });
    });

    return tablesByDate;
}
