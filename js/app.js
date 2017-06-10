"use strict";

var config = {
    racers:  {},
    times:   {}
};

function loadRacers(racerList) {
  racerList.forEach(function (racer) {
    config.racers[racer.id] = {
      id:         racer.id,
      img:        racer.img,
      name:       racer.name,
      kart:       racer.kart
    };
  });
}

function updateHTML(table) {
  var output = "";
  table.forEach(function (racer) {
    var classList = "";
    if (racer.movement === "up") {
      classList = "animated fadeInUp up";
    } else if (racer.movement === "down") {
      classList = "animated fadeInDown down";
    }

    var positions = document.getElementsByTagName("table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;

    output += "<tr class=\"" + classList + "\">";
    output += "<td>" + positions + "." + "</td>";
    output += "<td>" + racer.img + "</td>";
    output += "<td class=" + '"js-fill-in-time-button">' + racer.name + "</td>";
    output += "<td>" + racer.kart + "</td>";
    output += "<td>" + "0" + "</td>";
    output += "<td>" + "00:00.000" + "</td>";
    output += "<td>" + "+00:00.000" + "</td>";
    output += "</tr>\n";
  });

  $("table > tbody").innerHTML = output;
}


function bootstrap() {
  var initialTable = [];
  for (var i = 1; i < 26; i++) {
    initialTable.push(config.racers[i]);
  }

  initialTable.sort(function (a, b) {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1;  }
    return 0;
  });

  return initialTable;
}

function $(expr) {
  if (document.querySelectorAll(expr).length === 1) {
      return document.querySelectorAll(expr)[0];
  } else {
      return document.querySelectorAll(expr);
  }
}

window.onload = function () {
    updateHTML(bootstrap());
};
