var raceMap = $(".circuit-map");

function enterTime() {
  $(".js-fill-in-time-button").on("click", function() {
    var lap1 = prompt("Enter " + $(this).data("racer") + "'s" + " 1st lap time in milliseconds"),
        lap2 = prompt("Enter " + $(this).data("racer") + "'s" + " 2nd lap time in milliseconds"),
        lap3 = prompt("Enter " + $(this).data("racer") + "'s" + " final lap time in milliseconds");

    raceMap.append("<img data-img=\"" + $(this).data("img") + "\" src=\"" + "img/circuits/heads/" + $(this).data("img") + ".png" + "\" class=\"" + "luigi-circuit-lap-1" + "\">");

    if (lap1, lap2, lap3 === null) {
      return;
    }

    setTimeout(function() {
      $(".luigi-circuit-lap-1").css("animation-duration", lap1 + "ms");
      console.log("Lap 1: " + lap1);
    });

    setTimeout(function() {
      $(".luigi-circuit-lap-1").removeClass("luigi-circuit-lap-1").addClass("luigi-circuit-lap-2").css("animation-duration", lap2 + "ms");
      console.log("Lap 2: " + lap2);
    }, lap1);

    setTimeout(function() {
      $(".luigi-circuit-lap-2").removeClass("luigi-circuit-lap-2").addClass("luigi-circuit-lap-3").css("animation-duration", lap3 + "ms");
      console.log("Final lap: " + lap3);
    }, parseInt(lap1) + parseInt(lap2));

    setTimeout(function() {
      $(".circuit-map img").fadeOut(2000);
    }, parseInt(lap1) + parseInt(lap2) + parseInt(lap3));

  });
};
