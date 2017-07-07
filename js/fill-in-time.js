function enterTime() {
  $(".js-fill-in-time-button").on("click", function() {
    var lap1 = prompt("Enter " + $(this).data("racer") + "'s" + " 1st lap time in milliseconds", "3000"),
        lap2 = prompt("Enter " + $(this).data("racer") + "'s" + " 2nd lap time in milliseconds", "2000"),
        lap3 = prompt("Enter " + $(this).data("racer") + "'s" + " final lap time in milliseconds", "1000"),
        lapCounter = 1;

    $(".circuit-map").append("<img data-img=\"" + $(this).data("img") + "\" src=\"" + "img/circuits/heads/" + $(this).data("img") + ".png" + "\" class=\"" + "js-circuit" + "\">");

    if (lap1, lap2, lap3 === null) {
      return;
    }

    doAnimate("luigi-circuit", parseInt(lap1));
    $(".js-lap-counter").text(lapCounter);
    console.log("Lap 1: " + lap1);

    setTimeout(function() {
      doAnimate("luigi-circuit", parseInt(lap2));
      console.log("Lap 2: " + lap2);
      lapCounter++;
      $(".js-lap-counter").text(lapCounter);

      setTimeout(function() {
        doAnimate("luigi-circuit", parseInt(lap3));
        console.log("Final lap: " + lap3);
        lapCounter++;
        $(".js-lap-counter").text(lapCounter);

        setTimeout(function() {
          $(".circuit-map img").fadeOut(2000);
        }, parseInt(lap3));
      }, parseInt(lap2));
    }, parseInt(lap1));

    function pad(n, width) {
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
    }

    var startTime = new Date(),
        totalTime = parseInt(lap1) + parseInt(lap2) + parseInt(lap3),

        _millisecond = 1,
        _second = 1000,
        _minute = _second * 60,
        _hour = _minute * 60,
        _day = _hour * 24,
        timer;

    function timeCounter() {
      var timeCounter = new Date() - startTime,

          days = Math.floor(timeCounter / _day),
          hours = Math.floor((timeCounter % _day) / _hour),
          minutes = Math.floor((timeCounter % _hour) / _minute),
          seconds = Math.floor((timeCounter % _minute) / _second),
          milliseconds = Math.floor((timeCounter % _second) / _millisecond);

      document.querySelector('.table-hrs').innerHTML = pad(hours, 1);
      document.querySelector('.table-min').innerHTML = pad(minutes, 2);
      document.querySelector('.table-sec').innerHTML = pad(seconds, 2);
      document.querySelector('.table-mil').innerHTML = pad(milliseconds, 3);

      document.querySelector('.timer-min').innerHTML = pad(minutes, 2);
      document.querySelector('.timer-sec').innerHTML = pad(seconds, 2);
      document.querySelector('.timer-mil').innerHTML = pad(milliseconds, 3);
    }

    timer = setInterval(timeCounter, 1);

    setTimeout(function() {
      clearInterval(timer);

      var days = Math.floor(totalTime / _day),
          hours = Math.floor((totalTime % _day) / _hour),
          minutes = Math.floor((totalTime % _hour) / _minute),
          seconds = Math.floor((totalTime % _minute) / _second),
          milliseconds = Math.floor((totalTime % _second) / _millisecond);

      document.querySelector('.table-hrs').innerHTML = pad(hours, 1);
      document.querySelector('.table-min').innerHTML = pad(minutes, 2);
      document.querySelector('.table-sec').innerHTML = pad(seconds, 2);
      document.querySelector('.table-mil').innerHTML = pad(milliseconds, 3);

      document.querySelector('.timer-min').innerHTML = pad(minutes, 2);
      document.querySelector('.timer-sec').innerHTML = pad(seconds, 2);
      document.querySelector('.timer-mil').innerHTML = pad(milliseconds, 3);
    }, totalTime);

  });
};

function doAnimate(animationName, animationDuration) {
  var $circuit = $('.js-circuit');
  $circuit.removeClass(animationName);

  requestAnimationFrame(function () {
    $circuit.addClass(animationName).css("animation-duration", animationDuration + "ms");
  });
}
