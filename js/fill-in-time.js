$(document).on("click", ".js-fill-in-time-button", function() {
  var lap1 = prompt("Enter " + $(this).data("racer") + "'s 1st lap time in milliseconds", "3000"),
      lap2 = prompt("Enter " + $(this).data("racer") + "'s 2nd lap time in milliseconds", "2000"),
      lap3 = prompt("Enter " + $(this).data("racer") + "'s final lap time in milliseconds", "1000"),
      lapCounter = 1,
      racerId = $(this).data('id'),
      racer = config.racers.find(function(racer) { return racer.id == racerId }),
      totalTime = parseInt(lap1) + parseInt(lap2) + parseInt(lap3),
      startTime = new Date();

  if (lap1, lap2, lap3 === null) { return; }

  $(".lap-1").text("");
  $(".lap-2").text("");
  $(".lap-3").text("");

  $(".lap-1").removeClass("attention-bounce");
  $(".lap-2").removeClass("attention-bounce");
  $(".lap-3").removeClass("attention-bounce");

  $("table > tbody").css("pointer-events", "none");
  $(".js-arrow").css("pointer-events", "none");

  $(".circuit-map").append("<img data-img=\"" + $(this).data("img") + "\" src=\"" + "img/circuits/heads/" + $(this).data("img") + ".png" + "\" class=\"" + "js-circuit" + "\">");

  doAnimate(circuit, parseInt(lap1));
  $(".js-lap-counter").text(lapCounter);
  console.log("Lap 1: " + lap1);

  setTimeout(function() {
    doAnimate(circuit, parseInt(lap2));
    console.log("Lap 2: " + lap2);
    lapCounter++;
    $(".js-lap-counter").text(lapCounter);
    $(".lap-1").append('<span class="lap-1-min">00</span>:<span class="lap-1-sec">00</span>.<span class="lap-1-mil">000</span>');
    $(".lap-1").addClass("attention-bounce");

    setTimeout(function() {
      doAnimate(circuit, parseInt(lap3));
      console.log("Final lap: " + lap3);
      lapCounter++;
      $(".js-lap-counter").text(lapCounter);
      $(".lap-2").append('<span class="lap-2-min">00</span>:<span class="lap-2-sec">00</span>.<span class="lap-2-mil">000</span>');
      $(".lap-2").addClass("attention-bounce");

      setTimeout(function() {
        $(".lap-3").append('<span class="lap-3-min">00</span>:<span class="lap-3-sec">00</span>.<span class="lap-3-mil">000</span>');
        $(".lap-3").addClass("attention-bounce");
        $(".circuit-map img").fadeOut(2000);

        setTimeout(function() {
          $(".circuit-map img").remove();
          $(".js-arrow").css("pointer-events", "all");
          $("table > tbody").css("pointer-events", "all");
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
   * 2. Make sure the timer is different from the racers timer (laptimers vs race timer)
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
  }

  timer = setInterval(function () {
    updateTimers(racerOldTotalTime + (new Date() - startTime));
  }, 1);

  setTimeout(function() {
    clearInterval(timer);
    updateTimers(racer.totalTime);
  }, totalTime);

  function stopWatch(swtime) {
    var swhours = Math.floor(swtime / _hour),
      swminutes = Math.floor((swtime % _hour) / _minute),
      swseconds = Math.floor((swtime % _minute) / _second),
      swmilliseconds = Math.floor((swtime % _second) / _millisecond);

    document.querySelector('.timer-min').innerHTML = pad(swminutes, 2);
    document.querySelector('.timer-sec').innerHTML = pad(swseconds, 2);
    document.querySelector('.timer-mil').innerHTML = pad(swmilliseconds, 3);
  }

  stopWatchTimer = setInterval(function () {
    stopWatch(new Date() - startTime);
  }, 1);

  setTimeout(function() {
    clearInterval(stopWatchTimer);
    stopWatch(totalTime);
  }, totalTime);

  function lapOne(lontime) {
    var lonhours = Math.floor(lontime / _hour),
      lonminutes = Math.floor((lontime % _hour) / _minute),
      lonseconds = Math.floor((lontime % _minute) / _second),
      lonmilliseconds = Math.floor((lontime % _second) / _millisecond);

    document.querySelector('.lap-1-min').innerHTML = pad(lonminutes, 2);
    document.querySelector('.lap-1-sec').innerHTML = pad(lonseconds, 2);
    document.querySelector('.lap-1-mil').innerHTML = pad(lonmilliseconds, 3);
  }
  function lapTwo(ltwtime) {
    var ltwhours = Math.floor(ltwtime / _hour),
      ltwminutes = Math.floor((ltwtime % _hour) / _minute),
      ltwseconds = Math.floor((ltwtime % _minute) / _second),
      ltwmilliseconds = Math.floor((ltwtime % _second) / _millisecond);

    document.querySelector('.lap-2-min').innerHTML = pad(ltwminutes, 2);
    document.querySelector('.lap-2-sec').innerHTML = pad(ltwseconds, 2);
    document.querySelector('.lap-2-mil').innerHTML = pad(ltwmilliseconds, 3);
  }
  function lapThree(lthtime) {
    var lthhours = Math.floor(lthtime / _hour),
      lthminutes = Math.floor((lthtime % _hour) / _minute),
      lthseconds = Math.floor((lthtime % _minute) / _second),
      lthmilliseconds = Math.floor((lthtime % _second) / _millisecond);

    document.querySelector('.lap-3-min').innerHTML = pad(lthminutes, 2);
    document.querySelector('.lap-3-sec').innerHTML = pad(lthseconds, 2);
    document.querySelector('.lap-3-mil').innerHTML = pad(lthmilliseconds, 3);
  }

  setTimeout(function() {
    lapOne(lap1);
    setTimeout(function() {
      lapTwo(lap2);
      setTimeout(function() {
        lapThree(lap3);
      }, parseInt(lap3));
    }, parseInt(lap2));
  }, parseInt(lap1));

});

function doAnimate(circuit, animationDuration) {
  var $circuit = $('.js-circuit');
  $circuit.removeClass(circuit.animation);

  requestAnimationFrame(function () {
    $circuit.addClass(circuit.animation).css("animation-duration", animationDuration + "ms");
  });
}
