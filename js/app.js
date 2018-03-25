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

    if (racer.change == 1) {
      classList += "bounce";
    }

    output += "<tr class=\"" + fillInButton + " button " + classList +
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
    output += "<td class=\"" + "custom_font" + "\">" + "<span>" + pad(racer.hrs, 1) + "</span>:" +
                                                       "<span>" + pad(racer.min, 2) + "</span>:" +
                                                       "<span>" + pad(racer.sec, 2) + "</span>." +
                                                       "<span>" + pad(racer.mil, 3) + "</span></td>";
    output += "</tr>\n";
  });

  $$("table > tbody").innerHTML = output;

  updateProgressBar();

}

var $progressBar = $('.js-race-progress-bar');

function initProgressBar() {
  // Draw initial players in progress-bar-container
  config.racers.forEach(function (racer) {
    $('<img />', {
      src: 'img/time-line/' + racer.img + '.png',
      class: 'race-progress-bar__player',
      'data-rounds': racer.raced,
      'data-racer-id': racer.id
    }).appendTo($progressBar);
  })
}

function updateProgressBar() {
  config.racers.forEach(function (racer) {
    $('.race-progress-bar__player[data-racer-id="' + racer.id + '"]');

    $('.race-progress-bar__player[data-racer-id="' + racer.id + '"]').attr('data-rounds', racer.raced);
    $('.race-progress-bar__player[data-racer-id="' + racer.id + '"]').css("z-index", racer.raced);

    $('.race-progress-bar__player').css("animation-timing-function", "linear");
    $('.race-progress-bar__player').css("transition-property", "left");
    $('.race-progress-bar__player').css("transition-duration", "200000ms");
  })
  sortProgressBar();
}

function sortProgressBar() {
  return config.racers.sort(function (a, b) {

    if (a.name < b.name) { return  1; }
    if (a.name > b.name) { return -1; }

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
  updateHTML();
  initProgressBar();
  initCircuits();
};
