// Given an array of racer objects, returns a sorted array of the current league table
function sortTimeTable() {
  return config.racers.sort(function (a, b) {
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

    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1;  }

    return 0;
  });
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
