$(document).on("click", ".js-fill-in-time-button", function() {
  var lap1 = prompt("Enter " + $(this).data("racer") + "'s 1st lap time in milliseconds", "3000"),
      lap2 = prompt("Enter " + $(this).data("racer") + "'s 2nd lap time in milliseconds", "2000"),
      lap3 = prompt("Enter " + $(this).data("racer") + "'s final lap time in milliseconds", "1000"),
      lapCounter = 1,
      racerId = $(this).data('id'),
      racer = config.racers.find(function(racer) { return racer.id == racerId }),
      totalTime = parseInt(lap1) + parseInt(lap2) + parseInt(lap3),
      startTime = new Date();

  if (lap1, lap2, lap3 === null) {
    return;
  }

  $(".circuit-map").append("<img data-img=\"" + $(this).data("img") + "\" src=\"" + "img/circuits/heads/" + $(this).data("img") + ".png" + "\" class=\"" + "js-circuit" + "\">");

  doAnimate(circuit, parseInt(lap1));
  $(".js-lap-counter").text(lapCounter);
  console.log("Lap 1: " + lap1);

  $(".js-fill-in-time-button").css("pointer-events", "none");
  $(".js-arrow").css("pointer-events", "none");

  setTimeout(function() {
    doAnimate(circuit, parseInt(lap2));
    console.log("Lap 2: " + lap2);
    lapCounter++;
    $(".js-lap-counter").text(lapCounter);

    setTimeout(function() {
      doAnimate(circuit, parseInt(lap3));
      console.log("Final lap: " + lap3);
      lapCounter++;
      $(".js-lap-counter").text(lapCounter);

      setTimeout(function() {
        $(".circuit-map img").fadeOut(2000);

        setTimeout(function() {
          $(".circuit-map img").remove();
          $(".js-arrow").css("pointer-events", "all");
        }, 2000);
      }, parseInt(lap3));
    }, parseInt(lap2));
  }, parseInt(lap1));

  var _millisecond = 1,
    _second = 1000,
    _minute = _second * 60,
    _hour = _minute * 60,
    timer,
    racerOldTotalTime = (racer.totalTime || 0);

  changeRacersWithDiff(function () {
    racer.totalTime = racerOldTotalTime + totalTime;
    racer.raced++;
  })

  function changeRacersWithDiff (func) {
    var racersBefore = JSON.parse(JSON.stringify(sortTimeTable()));
    func()
    var index = 0;
    sortTimeTable().map(function (racer) {
      var currentIndex = index++;
      var oldIndex = racersBefore.findIndex(bracer => bracer.id === racer.id);

      racer.change = change(currentIndex, oldIndex);

      return racer;
    })
  }

  function change (currentIndex, oldIndex) {
    if (currentIndex < oldIndex) { return  1;  }
    if (currentIndex > oldIndex) { return  -1; }
    return 0;
  }

  /**
   * TODO:
   * 1. Refactor the milliseconds to H:i:s.m
   * 2. Make sure the timer is different from the racers timer (laptimer vs race timer)
   */
  function updateTimers (time) {
    var hours = Math.floor(time / _hour),
      minutes = Math.floor((time % _hour) / _minute),
      seconds = Math.floor((time % _minute) / _second),
      milliseconds = Math.floor((time % _second) / _millisecond);

    racer.hrs = hours;
    racer.min = minutes;
    racer.sec = seconds;
    racer.mil = milliseconds;

    updateHTML();
    document.querySelector('.timer-min').innerHTML = pad(minutes, 2);
    document.querySelector('.timer-sec').innerHTML = pad(seconds, 2);
    document.querySelector('.timer-mil').innerHTML = pad(milliseconds, 3);
  }

  timer = setInterval(function () {
    updateTimers(racerOldTotalTime + (new Date() - startTime));
  }, 1);

  setTimeout(function() {
    clearInterval(timer);
    updateTimers(racer.totalTime);
  }, totalTime);

});

function doAnimate(circuit, animationDuration) {
  var $circuit = $('.js-circuit');
  $circuit.removeClass(circuit.animation);

  requestAnimationFrame(function () {
    $circuit.addClass(circuit.animation).css("animation-duration", animationDuration + "ms");
  });
}
