var raceMap = $(".circuit-map");

function enterTime() {
  $(".js-fill-in-time-button").on("click", function() {
    var lap1 = prompt("Enter " + $(this).data("racer") + "'s" + " 1st lap time in milliseconds", "2500"),
        lap2 = prompt("Enter " + $(this).data("racer") + "'s" + " 2nd lap time in milliseconds", "5000"),
        lap3 = prompt("Enter " + $(this).data("racer") + "'s" + " final lap time in milliseconds", "10000");

    raceMap.append("<img data-img=\"" + $(this).data("img") + "\" src=\"" + "img/circuits/heads/" + $(this).data("img") + ".png" + "\" class=\"" + "luigi-circuit" + "\">");

    if (lap1, lap2, lap3 === null) {
      return;
    }

    setTimeout(function() {
      $(".luigi-circuit").css("animation-duration", lap1 + "ms");
      console.log(lap1);
    });

    setTimeout(function() {
      $(".luigi-circuit").css("animation-duration", lap2 +"ms");
      console.log(lap2);
    }, lap1);

    setTimeout(function() {
      $(".luigi-circuit").css("animation-duration", lap3 + "ms");
      console.log(lap3);
    }, lap2);

  });
};
