function initCircuits() {
  // Draw initial circuits in animations-container
  config.circuits.forEach(function (track) {
    $('<div />', {
      class: 'circuit-map__' + track.id + '-' + track.animation
    }).appendTo($('.animations'));

    $('<div />', {
      class: '_' + track.id + '-' + track.animation,
      text: track.id + ". " + track.name
    }).appendTo($('.tracks'));

    $('.js-nav div:first-child').addClass('active');
  })
}

var circuit = config.circuits[0];

$(function() {
  $('.js-arrow').on('click', function(){
    updateClass($(this).attr('data-dir'));
    $('.background').css("animation-name", "fadeOut");
  });
});

function updateClass (direction) {
  var current = $('.js-nav .active'),
      background = $('.background');

  if (direction == 'left' && current.index() > 0) {
    config.circuits.forEach(function () {
      circuit = config.circuits[current.index() - 1]
      current.removeClass('active');
      current.prev().addClass('active');
      background.css("background-image", "url('../mkr/img/backgrounds/" + circuit.id + '-' + circuit.animation + ".jpg')");
    })
  }
  else if (direction == 'right' && current.index() < $('.js-nav div:last-child').index()) {
    config.circuits.forEach(function () {
      circuit = config.circuits[current.index() + 1]
      current.removeClass('active');
      current.next().addClass('active');
      background.css("background-image", "url('../mkr/img/backgrounds/" + circuit.id + '-' + circuit.animation + ".jpg')");
    })
  }
};
