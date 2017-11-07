var circuit = config.circuits[0];

$(function() {
  $('.animations div:first-child').addClass('active');

  $('.js-arrow').on('click', function(){
    updateClass($(this).attr('data-dir'));
  });
});

// FIXME circuit-navigator should give us the correct race animation

function updateClass (direction) {
  var current = $('.animations .active');

  if (direction == 'left' && current.index() > 0) {
    circuit = config.circuits[current.index() - 1]
    current.removeClass('active');
    // current.removeClass(circuit);
    current.prev().addClass('active');
    // current.prev().addClass(circuit);
  }
  else if (direction == 'right' && current.index() < $('.animations div:last-child').index()) {
    circuit = config.circuits[current.index() + 1]
    current.removeClass('active');
    // current.removeClass(circuit);
    current.next().addClass('active');
    // current.next().addClass(circuit);
  };
};
