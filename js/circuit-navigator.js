var circuit = config.circuits[0];

$(function() {
  $('.animations div:first-child').addClass('active');

  $('.js-arrow').on('click', function(){
    updateClass($(this).attr('data-dir'));
  });
});

function updateClass (direction) {
  var current = $('.animations .active');

  if (direction == 'left' && current.index() > 0) {
    circuit = config.circuits[current.index() - 1]
    current.removeClass('active');
    current.prev().addClass('active');
  }
  else if (direction == 'right' && current.index() < $('.animations div:last-child').index()) {
    circuit = config.circuits[current.index() + 1]
    current.removeClass('active');
    current.next().addClass('active');
  };
};
