(function ($) {
  var hasTouch = false;

  if (('ontouchstart' in document.documentElement)) {
      document.documentElement.className += ' touch';
      hasTouch = true;
  }

  var sanc = {

    construct: function(){

    },

    init: function(){
      $('#resident-artists').bxSlider({
        slideSelector: 'div.artists',
        pager: false,
        // controls: false
      });
    }

  };

  $(document).ready(function() {
    // sanc.init();
  });


})(jQuery);
