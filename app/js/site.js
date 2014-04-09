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

      // Load Jay's Instagram feed.
      jayFeed.run();

      // Startup all galleries
      siteGalleries.init();

      var artistNav = $('#resident-artists').bxSlider({
        infiniteLoop: false,
        pager: false,
        controls: false
      });

      $('.artist-nav a').on('click', function(e){
        e.preventDefault();
        artistNav.goToSlide($(this).attr('data-slide-index'));
      });


    },



  };
  // var loadButton = $('#dave .gallery');
  var jayFeed = new Instafeed({
    get: 'user',
      userId: 266550284,
      accessToken: '266550284.456bf7f.9e8b3d0a92aa4283baa4437cba216746',
      limit: '25',
      links: 'false',
      resolution: 'standard_resolution',
      target: 'jay-gallery',
      template: '<li><a rel="group" class="facybox" href="{{image}}"><img class="fancybox" src="{{image}}"></a></li>',
    // mock: 'true',
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


    // success: function(data){
    //   console.log(data);
    // }

    after: function(){
      // if (!this.hasNext()) {
      //   loadButton.setAttribute('disabled', 'disabled');
      // }
      siteGalleries.jayGallery();
      var images = $('#jay-gallery a').fancybox();
    }
  });

  // loadButton.on('click', function() {
  //   daveFeed.next();
  // });

  var smoothScroll = {

    init: function(){

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

  var siteGalleries = {

    init: function(){
      siteGalleries.tenSancGallery();
      siteGalleries.fiertoGallery();
      siteGalleries.tobiasGallery();
      siteGalleries.daveGallery();
      // siteGalleries.jayGallery();

      $('.btn-next, .btn-prev').on('click', function(e){
        e.preventDefault();
      });
    },

    tenSancGallery: function(){

      $('#ten-sanc-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 5,
        maxSlides: 5,
        slideWidth: 172,
        slideMargin: 50,
        pager: false,
        // controls: false,
        nextSelector: '#hero .btn-next',
        prevSelector: '#hero .btn-prev',

        onSliderLoad: function(){
          $('#ten-sanc-gallery li:nth-child(5)').css('margin', '0');
          $('#ten-sanc-gallery').css('opacity', '1');
        }
      });

    },

    fiertoGallery: function(){
      $('#fierto-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 5,
        maxSlides: 5,
        slideWidth: 172,
        slideMargin: 50,
        pager: false,
        // controls: false,
        nextSelector: '#fierto .btn-next',
        prevSelector: '#fierto .btn-prev',

        onSliderLoad: function(){
          $('#fierto-gallery li:nth-child(5)').css('margin', '0');
          $('#fierto-gallery').css('opacity', '1');
        }
      });
    },

    tobiasGallery: function(){
      $('#tobias-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 5,
        maxSlides: 5,
        slideWidth: 172,
        slideMargin: 50,
        pager: false,
        // controls: false,
        nextSelector: '#tobias .btn-next',
        prevSelector: '#tobias .btn-prev',

        onSliderLoad: function(){
          $('#tobias-gallery li:nth-child(5)').css('margin', '0');
          $('#tobias-gallery').css('opacity', '1');
        }
      });
    },

    daveGallery: function(){
      $('#dave-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 5,
        maxSlides: 5,
        slideWidth: 172,
        slideMargin: 50,
        pager: false,
        // controls: false,
        nextSelector: '#dave .btn-next',
        prevSelector: '#dave .btn-prev',

        onSliderLoad: function(){
          $('#dave-gallery li:nth-child(5)').css('margin', '0');
          $('#dave-gallery').css('opacity', '1');
        }
      });
    },

    jayGallery: function(){
      $('#jay-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 5,
        maxSlides: 5,
        slideWidth: 172,
        slideMargin: 50,
        pager: false,
        // controls: false,
        nextSelector: '#jay .btn-next',
        prevSelector: '#jay .btn-prev',

        onSliderLoad: function(){
          $('#jay-gallery li:nth-child(5)').css('margin', '0');
          $('#jay-gallery').css('opacity', '1');
        }
      });
    },

  };

  $(document).ready(function() {
    sanc.construct();
    sanc.init();
  });


})(jQuery);
