"use strict";
function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

var config = {
    racers:  {}
};

function loadRacers(racerList) {
  config.racers = racerList
}

function updateHTML(racers) {
  racers = sortTimeTable();
  var output = "", position = 0;

  var fillInButton = "js-fill-in-time-button";

  racers.forEach(function (racer) {
    var classList = "";
    if (racer.movement === "up") {
      classList = "animated fadeInUp up";
    } else if (racer.movement === "down") {
      classList = "animated fadeInDown down";
    }

    // TODO: Variables to count TIME + difference between racers
    output += "<tr class=\"" + fillInButton + " " + classList +
          "\" data-racer=\"" + racer.name +
            "\" data-img=\"" + racer.img +
            "\" data-id=\"" + racer.id +
            "\" data-hrs=\"" + racer.hrs +
            "\" data-min=\"" + racer.min +
            "\" data-sec=\"" + racer.sec +
            "\" data-mil=\"" + racer.mil + "\">";
    output += "<td>" + ++position + ".</td>";
    output += "<td>" + "<img src=\"" + "img/time-table/" + racer.img + ".png\"</td>";
    output += "<td>" + racer.name + "</td>";
    output += "<td>" + racer.kart + "</td>";
    output += "<td>" + racer.raced + "</td>";
    output += "<td>" + "<span class=\"" + "table-hrs" + "\">" + pad(racer.hrs, 1) + "</span>" + ":" +
                       "<span class=\"" + "table-min" + "\">" + pad(racer.min, 2) + "</span>" + ":" +
                       "<span class=\"" + "table-sec" + "\">" + pad(racer.sec, 2) + "</span>" + "." +
                       "<span class=\"" + "table-mil" + "\">" + pad(racer.mil, 3) + "</span>" + "</td>";
    output += "<td>" + "+00:00.000" + "</td>";
    output += "</tr>\n";
  });

  $$("table > tbody").innerHTML = output;
}

function bootstrap() {
  config.racers.sort(function (a, b) {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1;  }
    return 0;
  });
}

function $$(expr) {
  if (document.querySelectorAll(expr).length === 1) {
      return document.querySelectorAll(expr)[0];
  } else {
      return document.querySelectorAll(expr);
  }
}

window.onload = function () {
  bootstrap();
  updateHTML();
};
