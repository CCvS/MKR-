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
