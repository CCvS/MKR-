// Trivial app, but it's always good to be strict
/* exported loadRacers,loadTimes  */
"use strict";

// Global vars to put the JSONP stuff into, and config
var config = {
    racers:   {},
    times:    {},
    tickTime: 500 // Time in ms between each day
};

// Called by the JSONP
function loadRacers(racerList) {
    racerList.forEach(function (racer) {
        config.racers[racer.id] = {
            id:              racer.id,
            name:            racer.name,
            kart:            racer.kart,
            raced:           0,
            hrs:             0,
            min:             0,
            sec:             0,
            mil:             0
        };
    });
}

// Called by the JSONP
function loadTimes(raceList) {
    raceList.forEach(function (race) {

        if (!config.times[race.date]) { config.times[race.date] = []; }

        // The goals are a string instead of a numeric for some reason.
        // Probably as a potential gotcha in this test..
        config.times[race.date].push({
            date:        race.date,
            timeRacerId: race.timeRacerId,
            totalHrs:    parseInt(race.totalHrs, 10),
            totalMin:    parseInt(race.totalMin, 10),
            totalSec:    parseInt(race.totalSec, 10),
            totalMil:    parseInt(race.totalMil, 10)
        });
    });
}


// Given an array of racer objects, returns a sorted array of the current league table
function sortLeagueTable(racers) {
    var sortedTable = [];

    // REALLY ugly way to clone an object. Normally would use a library that's cleaner...
    var clonedTable = JSON.parse(JSON.stringify(racers));

    Object.keys(clonedTable).forEach(function (key) {
        sortedTable.push(clonedTable[key]);
    });

    sortedTable.sort(function (a, b) {

        if (a.raced < b.raced) { return  1;  }
        if (a.raced > b.raced) { return  -1; }

        if (a.hrs < b.hrs) { return  -1; }
        if (a.hrs > b.hrs) { return  1;  }

        if (a.min < b.min) { return  -1; }
        if (a.min > b.min) { return  1;  }

        if (a.sec < b.sec) { return  -1; }
        if (a.sec > b.sec) { return  1;  }

        if (a.mil < b.mil) { return  -1; }
        if (a.mil > b.mil) { return  1;  }

        return 0;
    });

    return sortedTable;
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


// Given a table array, generates the tbody portion of the HTML table.
// Normally I'd use a templating library like mustache
function updateHTML(table) {
    var output = "";
    table.forEach(function (racer) {
        var classList = "";
        if (racer.movement === "up") {
            classList = "animated fadeInUp up";
        } else if (racer.movement === "down") {
            classList = "animated fadeInDown down";
        }

        output += "<tr class=\"" + classList + "\">";
        output += "<td>" + racer.name + "</td>";
        output += "<td>" + racer.kart + "</td>";
        output += "<td>" + racer.raced + "</td>";
        output += "<td>" + racer.hrs + ":" + racer.min + ":" + racer.sec + "." + racer.mil + "</td>";
        output += "<td>" + "+0:0.0" + "</td>";
        output += "</tr>\n";
    });

    $("table > tbody").innerHTML = output;
}


// Sets up the table in it's initial state
function bootstrap() {
    var initialTable = [];
    for (var i = 1; i < 26; i++) {
        initialTable.push(config.racers[i]);
    }

    // Sort the table alphabetically
    // That's how it's always sorted on the first day of the season
    initialTable.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1;  }
        return 0;
    });

    return initialTable;
}


// given a date like "dd/mm/yy", returns a nicer date like "January 1st 1970"
// Would normally use moment.js for stuff like this, date math is hard
function humaniseDate(date) {
    var monthNames = [
        "",       "January",   "February", "March",
        "April",  "May",       "June",     "July",
        "August", "September", "October",  "November", "December"
    ];

    // Technically I wrote this before the test, so it should count as a library
    // But it's a common algorithm, and I wrote it out long form instead of the golf'd shortened way.
    function getOrdinal(number) {
        // Using the explicit method instead of implicit conversion because this is a test
        var end = parseInt(number.toString().slice(-1), 10);

        if (number > 3 && number < 21) {
            return "th";
        } else if (end === 1) {
            return "st";
        } else if (end === 2) {
            return "nd";
        } else if (end === 3) {
            return "rd";
        } else {
            return "th";
        }
    }

    var d = date.split("/");
    var humanDate = monthNames[parseInt(d[1], 10)] +
                    " " +
                    parseInt(d[0], 10) +
                    "<sup>" +
                    getOrdinal(parseInt(d[0], 10)) +
                    "</sup> 20" +
                    d[2];

    return humanDate;
}

// Date math is HARD - I would never do. this in real life
// See this great talk for reasons why it's silly to actually use this code
// http://youtu.be/OhjOXrFHL7o

// Gives us a nice list of dates for 2011 and 2012
// 2012 is a leap year, but 2011 isn't. We don't include Feb 2011 in our calculations
// So this doesn't matter. A non-trivial application would have to take this into account
function createDateRange() {
    var years = [11, 12];
    var monthLengths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var dates = [];
    // Native forEach loops are cool
    years.forEach(function (year) {
        monthLengths.forEach(function (monthLength, monthNumber) {
            for (var monthDay = 0; monthDay < monthLength; monthDay++) {
                // All the month related stuff is zero indexed. Have to add 1 for display to humans
                dates.push(pad(monthDay + 1) + "/" + pad(monthNumber + 1) + "/" + year);
            }
        });
    });


    // Pads single digits to 2 digits long with leading zeros
    function pad(number) {
        var str = "" + number;
        while (str.length < 2) {
            str = "0" + str;
        }
        return str;
    }


    // We only need August 12th, 2011 - May 13th, 2012
    return dates.slice(224, 500);
}


// Kicks off the animation - attached to the button onclick
function startAnimation() {
    /*jshint validthis:true*/
    // Make sure we can't set it running twice!
    var button = this;
    button.disabled = true;
    button.innerText = "Animation Running";

    var allDates = createDateRange();

    var tablesByDate = playTimes();
    var raceDates = Object.keys(tablesByDate);

    // We update the header every day, but not every day has a match on it
    var i = 0;
    function animate() {
        var j = raceDates.indexOf(allDates[i]);
        if (j !== -1) {
            // Today's date is a match day, so update the table
            updateHTML(tablesByDate[raceDates[j]]);
        } else {
            // Fade out the positional marker since it's not a match day
            // and the movement is irrelevant
            var elems = $(".up, .down");
            for (var x = 0; x < elems.length; x++) {
                if (elems[x].className.match(/up/)) {
                    elems[x].className = "animated fadeOutUpColor";
                } else {
                    elems[x].className = "animated fadeOutDownColor";
                }
            }
        }

        $("h1").innerHTML = humaniseDate(allDates[i]);
        i++;

        // 276 days from start to end of the season
        if (i === 276) {
            clearInterval(interval);
            button.innerText = "Animation Finished";

            var e = $(".up, .down");
            for (var y = 0; y < e.length; y++) {
                e[y].className = "";
            }
        }
    }

    // Don't delay by 500ms after the first click. Animate now, and the time will get the second race
    animate();
    var interval = setInterval(animate, config.tickTime);
}


// gives a nice jQuery-like way of selecting things
function $(expr) {
    if (document.querySelectorAll(expr).length === 1) {
        return document.querySelectorAll(expr)[0];
    } else {
        return document.querySelectorAll(expr);
    }
}


// All DOM stuff should wait until we have a DOM
window.onload = function () {
    updateHTML(bootstrap());

    $("button").onclick = startAnimation;
};
