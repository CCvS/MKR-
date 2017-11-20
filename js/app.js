"use strict";
function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

var config = {
  racers:    {},
  circuits:  {}
};

function loadRacers(racerList) {
  config.racers = racerList
}
function loadCircuits(circuitList) {
  config.circuits = circuitList
}

function updateHTML(racers) {
  racers = sortTimeTable();
  var output = "", position = 0;

  var fillInButton = "js-fill-in-time-button";

  racers.forEach(function (racer) {
    var classList = "";

// TODO: Change 'change' to be -1, 0, 1 using the same comparison as in sort-time-table
    if (racer.change == 1) {
      classList += "up";
    } else if (racer.change == -1) {
      classList += "down";
    }

    // TODO: Variables to count TIME + difference between racers
    output += "<tr class=\"" + fillInButton + " " + "button" + " " + classList +
          "\" data-racer=\"" + racer.name +
            "\" data-img=\"" + racer.img +
            "\" data-id=\"" + racer.id +
            "\" data-hrs=\"" + racer.hrs +
            "\" data-min=\"" + racer.min +
            "\" data-sec=\"" + racer.sec +
            "\" data-mil=\"" + racer.mil + "\">";
    output += "<td>" + ++position + ".</td>";
    output += "<td>" + "<img src=\"" + "img/time-table/" + racer.img + ".png\"></td>";
    output += "<td>" + racer.name + "</td>";
    output += "<td>" + racer.kart + "</td>";
    output += "<td>" + racer.raced + "</td>";
    output += "<td>" + "<span>" + pad(racer.hrs, 1) + "</span>:" +
                       "<span>" + pad(racer.min, 2) + "</span>:" +
                       "<span>" + pad(racer.sec, 2) + "</span>." +
                       "<span>" + pad(racer.mil, 3) + "</span></td>";
    output += "<td>" + "+00:00.000" + "</td>";
    output += "</tr>\n";
  });

  $$("table > tbody").innerHTML = output;
}

function $$(expr) {
  if (document.querySelectorAll(expr).length === 1) {
    return document.querySelectorAll(expr)[0];
  } else {
    return document.querySelectorAll(expr);
  }
}

window.onload = function () {
  updateHTML();
};
