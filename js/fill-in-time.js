var raceMap = $(".circuit-map");
       lap1 = "",
       lap2 = "",
       lap3 = "";

function enterTime() {
  $(".js-fill-in-time-button").on("click", function() {
    prompt('Enter ' + 'racer.name' + "'s" + ' 1st lap (milliseconds)');
    prompt('Enter ' + 'racer.name' + "'s" + ' 2nd lap (milliseconds)');
    prompt('Enter ' + 'racer.name' + "'s" + ' final lap (milliseconds)');

    // TODO: Img + class will turn into two variables that will find the selected racer
    raceMap.append("<img src=\"" + "img/circuits/heads/" + "babd" + ".png" + "\" class=\"" + "luigi-circuit" + "\">");
  });
};
