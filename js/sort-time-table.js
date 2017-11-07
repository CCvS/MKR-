// Given an array of racer objects, returns a sorted array of the current league table
function sortTimeTable() {
  return config.racers.sort(function (a, b) {

    if (a.raced < b.raced) { return  1;  }
    if (a.raced > b.raced) { return  -1; }

    if (a.totalTime < b.totalTime) { return  -1; }
    if (a.totalTime > b.totalTime) { return  1;  }

    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1;  }

    return 0;

  });
}
