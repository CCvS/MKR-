var raceMap = $(".circuit-map");
       lap1 = "",
       lap2 = "",
       lap3 = "";

function enterTime() {
  $(".js-fill-in-time-button").on("click", function() {
    prompt('Enter ' + $(this).data("racer") + "'s" + ' 1st lap time in milliseconds');
    prompt('Enter ' + $(this).data("racer") + "'s" + ' 2nd lap time in milliseconds');
    prompt('Enter ' + $(this).data("racer") + "'s" + ' final lap time in milliseconds');

    // TODO: Img + class will turn into two variables that will find the selected racer
    raceMap.append("<img data-img=\"" + $(this).data("img") + "\" src=\"" + "img/circuits/heads/" + $(this).data("img") + ".png" + "\" class=\"" + "luigi-circuit" + "\">");
  });
};
