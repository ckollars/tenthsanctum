(function ($) {
  var hasTouch = false;

  if (('ontouchstart' in document.documentElement)) {
      document.documentElement.className += ' touch';
      hasTouch = true;
  }

  var sanc = {

    construct: function(){
      sanc._nav = $('.main-nav');
    },

    init: function(){

      // Start smoth scroll
      smoothScroll.init();

      var artistNav = $('#resident-artists').bxSlider({
        infiniteLoop: false,
        pager: false,
        controls: false
      });

      var tenSancGallery = $('#ten-sanc-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 5,
        maxSlides: 5,
        slideWidth: 172,
        slideMargin: 50,
        pager: false,
        // controls: false,
        nextSelector: '.btn-next',
        prevSelector: '.btn-prev',

        onSliderLoad: function(){
          $('#ten-sanc-gallery li:nth-child(5)').css("margin", "0");
          $('#ten-sanc-gallery').css("opacity", "1");
        }
      });

      $('.artist-nav a').on('click', function(e){
        e.preventDefault();
        artistNav.goToSlide($(this).attr('data-slide-index'));
      });

      $('.btn-next, .btn-prev').on("click", function(e){
        e.preventDefault();
      });
      // daveFeed.run();
    },



  };
  // var loadButton = $('#dave .gallery');
  var daveFeed = new Instafeed({
    get: 'user',
      userId: 266550284,
      accessToken: '266550284.456bf7f.9e8b3d0a92aa4283baa4437cba216746',
      limit: '25',
      // resolution: 'thumbnail',
      links: 'false',
      template: '<li><img src="{{image}}"></li>',
    mock: 'true',
    // custom: {
    //   images: [],
    //   currentImage: 0,
    //   showImages: function(){
    //     var result, image;
    //     image = this.options.custom.images[this.options.custom.currentImage];
    //     result = this._makeTemplate(this.options.template, {
    //       model: image,
    //       id: image.id,
    //       link: image.link,
    //       image: image.images[this.options.resolution].url,
    //       caption: this._getObjectProperty(image, 'caption.text'),
    //       likes: image.likes.count,
    //       comments: image.comments.count,
    //       location: this._getObjectProperty(image, 'location.name')
    //     });
    //     $("#instafeed").html(result);
    //   }
    // },

    filter: function(image) {
      return image.tags.indexOf('tenthsanctum') >= 0;
    },

    success: function(data){
      console.log(data);
    }

    // after: function(){
    //   if (!this.hasNext()) {
    //     loadButton.setAttribute('disabled', 'disabled');
    //   }
    // }
  });

  // loadButton.on('click', function() {
  //   daveFeed.next();
  // });

  var smoothScroll = {

    init: function(){

      console.log(sanc._nav);

      sanc._nav.on('click', 'a', function(event){
        event.preventDefault();
        console.log('nav click');
        smoothScroll.scroll( $(this).attr('href') );
      });

    },

    scroll: function(target){
      $('html, body').animate({
        scrollTop: ($(target).offset().top - 70)
      }, 'slow');
    }

  };

  $(document).ready(function() {
    sanc.construct();
    sanc.init();
  });


})(jQuery);
