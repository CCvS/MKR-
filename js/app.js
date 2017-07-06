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

var position = $('.time-table tr').length;

function updateHTML(table) {
  var output = "";
  var fillInButton = "js-fill-in-time-button";

  table.forEach(function (racer) {
    var classList = "";
    if (racer.movement === "up") {
      classList = "animated fadeInUp up";
    } else if (racer.movement === "down") {
      classList = "animated fadeInDown down";
    }

    // TODO: Variables to count TIME + difference between racers
    output += "<tr class=\"" + classList + "\">";
    output += "<td>" + position++ + "." + "</td>";
    output += "<td>" + "<img src=\"" + "img/time-table/" + racer.img + ".png" + "\">" + "</td>";
    output += "<td class=\"" + fillInButton + "\" data-racer=\"" + racer.name + "\" data-img=\"" + racer.img + "\">" + racer.name + "</td>";
    output += "<td>" + racer.kart + "</td>";
    output += "<td>" + "0" + "</td>";
    output += "<td>" + "<span class=\"" + "table-hrs" + "\">" + "0" + "</span>" + ":" +
                       "<span class=\"" + "table-min" + "\">" + "00" + "</span>" + ":" +
                       "<span class=\"" + "table-sec" + "\">" + "00" + "</span>" + "." +
                       "<span class=\"" + "table-mil" + "\">" + "000" + "</span>" + "</td>";
    output += "<td>" + "+00:00.000" + "</td>";
    output += "</tr>\n";
  });

  $$("table > tbody").innerHTML = output;
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

function $$(expr) {
  if (document.querySelectorAll(expr).length === 1) {
      return document.querySelectorAll(expr)[0];
  } else {
      return document.querySelectorAll(expr);
  }
}

window.onload = function () {
    updateHTML(bootstrap());
    enterTime();
};
