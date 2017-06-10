// Called by the JSONP
function loadTimes(raceList) {
  raceList.forEach(function (race) {

    if (!config.times[race.date]) { config.times[race.date] = []; }

    // The goals are a string instead of a numeric for some reason.
    // Probably as a potential gotcha in this test..
    config.times[race.date].push({
      timeRacerId: race.timeRacerId,
      totalHrs:    parseInt(race.totalHrs, 2),
      totalMin:    parseInt(race.totalMin, 2),
      totalSec:    parseInt(race.totalSec, 2),
      totalMil:    parseInt(race.totalMil, 2)
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
            timeRacer.hrs += race.totalHrs;
            timeRacer.min += race.totalMin;
            timeRacer.sec += race.totalSec;
            timeRacer.mil += race.totalMil;

            var timeMil = 1;
            var timeSec = 1000;
            var timeMin = timeSec * 60;
            var timeHrs = timeMin * 60;

            if (timeRacer.hrs > 23) {
                // Hours
                timeRacer.hrs * timeHrs % (timeRacer.hrs /= timeMin);
                console.log("hrs");
            }
            if (timeRacer.min > 59) {
                // Minutes
                timeRacer.min * timeMin % (timeRacer.min /= timeSec);
                console.log("min");
            }
            if (timeRacer.sec > 59) {
                // Seconds
                timeRacer.sec * timeSec % (timeRacer.sec /= timeMil);
                console.log("sec");
            }
            if (timeRacer.mil > 999) {
                // Milliseconds
                timeRacer.mil * timeMil % (timeRacer.mil /= timeMil);
                console.log("mil");
            }

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

// Pads single digits to 2 digits long with leading zeros
function pad(number) {
    var str = "" + number;
    while (str.length < 2) {
        str = "0" + str;
    }
    return str;
}
