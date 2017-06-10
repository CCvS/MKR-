var clickName = $(".js-fill-in-time-button");

function enterTime() {
  clickName.click(function() {
    prompt('Enter time');
  });

}

enterTime();
