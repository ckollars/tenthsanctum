(function ($) {
  var hasTouch = false;

  if (('ontouchstart' in document.documentElement)) {
      document.documentElement.className += ' touch';
      hasTouch = true;
  }

  var sanc = {

    construct: function(){
      sanc._nav = $('.main-nav');
      sanc._width = $(window).width();
      sanc._height = $(window).height();
    },

    init: function(){

      // Start smoth scroll
      smoothScroll.init();

      // Load Jay's Instagram feed.
      jayFeed.run();
      // daveFeed.run();
      // fiertoFeed.run();
      tobiasFeed.run();
      tenSancFeed.run();

      // Startup all galleries
      siteGalleries.init();

      // Artist Slider
      var artistNav = $('#resident-artists').bxSlider({
        infiniteLoop: false,
        adaptiveHeight: true,
        pager: false,
        controls: false
      });

      $('.artist-nav a').on('click', function(e){
        e.preventDefault();
        artistNav.goToSlide($(this).attr('data-slide-index'));
      });

      $('.icon-mobile-menu').on('click', function(e){
        e.preventDefault();
        $('body').toggleClass('show-mobile-menu');
      });

      $( window ).on( 'orientationchange', function( event ) {
        console.log( "This device is in " + event.orientation + " mode!" );
        siteGalleries.size('tenSancGallery');
      });

    },

    log: function (data){
      if( typeof console !== 'undefined'){
        console.log(data);
      }
    }


  };

  var jayFeed = new Instafeed({
    get: 'user',
      userId: 266550284,
      accessToken: '266550284.456bf7f.9e8b3d0a92aa4283baa4437cba216746',
      limit: '25',
      links: 'false',
      resolution: 'standard_resolution',
      target: 'jay-gallery',
      template: '<li><a rel="group" class="facybox" href="{{image}}"><img class="fancybox" src="{{image}}"></a></li>',

    filter: function(image) {
      return image.tags.indexOf('tenthsanctum') >= 0;
    },

    after: function(){
      siteGalleries.size('jay');
      var images = $('#jay-gallery a').fancybox({
        'overlayOpacity' : '0.9',
        'overlayColor' : '#131313'
      });
    }
  });

  var daveFeed = new Instafeed({
    get: 'user',
      userId: 266550284,
      accessToken: '266550284.456bf7f.9e8b3d0a92aa4283baa4437cba216746',
      limit: '25',
      links: 'false',
      resolution: 'standard_resolution',
      target: 'dave-gallery',
      template: '<li><a rel="group" class="facybox" href="{{image}}"><img class="fancybox" src="{{image}}"></a></li>',

    filter: function(image) {
      return image.tags.indexOf('tenthsanctum') >= 0;
    },

    after: function(){
      siteGalleries.daveGallery();
      var images = $('#dave-gallery a').fancybox({
        'overlayOpacity' : '0.9',
        'overlayColor' : '#131313'
      });
    }
  });

  var fiertoFeed = new Instafeed({
    get: 'user',
      userId: 266550284,
      accessToken: '266550284.456bf7f.9e8b3d0a92aa4283baa4437cba216746',
      limit: '25',
      links: 'false',
      resolution: 'standard_resolution',
      target: 'fierto-gallery',
      template: '<li><a rel="group" class="facybox" href="{{image}}"><img class="fancybox" src="{{image}}"></a></li>',

    filter: function(image) {
      return image.tags.indexOf('tenthsanctum') >= 0;
    },

    after: function(){
      siteGalleries.fiertoGallery();
      var images = $('#fierto-gallery a').fancybox({
        'overlayOpacity' : '0.9',
        'overlayColor' : '#131313'
      });
    }
  });

  var tobiasFeed = new Instafeed({
    get: 'user',
      userId: 25697171,
      accessToken: '25697171.467ede5.1d5156539dc4433081ef6246807084fe',
      limit: '25',
      links: 'false',
      resolution: 'standard_resolution',
      target: 'tobias-gallery',
      template: '<li><a rel="group" class="facybox" href="{{image}}"><img class="fancybox" src="{{image}}"></a></li>',

    filter: function(image) {
      return image.tags.indexOf('tenthsanctum') >= 0;
    },

    after: function(){
      // siteGalleries.tobiasGallery();
      siteGalleries.size('tobias');
      var images = $('#tobias-gallery a').fancybox({
        'overlayOpacity' : '0.9',
        'overlayColor' : '#131313'
      });
    }
  });

  var tenSancFeed = new Instafeed({
    get: 'user',
      userId: 905159076,
      accessToken: '905159076.467ede5.96f5f0f35c8d41f0abae6b77a9a6ec30',
      limit: '50',
      links: 'false',
      resolution: 'standard_resolution',
      target: 'ten-sanc-gallery',
      template: '<li><a rel="group" class="facybox" href="{{image}}"><img class="fancybox" src="{{image}}"></a></li>',

    // filter: function(image) {
    //   return image.tags.indexOf('tenthsanctum') >= 0;
    // },

    after: function(){
      // siteGalleries.tenSancGallery();
      siteGalleries.size('tenSancGallery');
      var images = $('#ten-sanc-gallery a').fancybox({
        'overlayOpacity' : '0.9',
        'overlayColor' : '#131313'
      });
    }
  });

  var smoothScroll = {

    init: function(){

      sanc._nav.on('click', 'li a', function(event){
        event.preventDefault();
        $('body').toggleClass('show-mobile-menu');
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

    _maxSlide: null,
    _margin: null,
    _tenSancGal: null,
    _jayGal: null,

    init: function(){
      siteGalleries.size();

      // Temporary call of galleries until everyone is on instafeed.
      // siteGalleries.tenSancGallery(siteGalleries._maxSlide, siteGalleries._margin);
      // siteGalleries.fiertoGallery(siteGalleries._maxSlide, siteGalleries._margin);
      // siteGalleries.tobiasGallery(siteGalleries._maxSlide, siteGalleries._margin);
      // siteGalleries.daveGallery(siteGalleries._maxSlide, siteGalleries._margin);

      $('.btn-next, .btn-prev').on('click', function(e){
        e.preventDefault();
      });
    },

    // TODO: Rework resize to only fire after the resize is done. This is a nice to have.
    size: function(gallery){
      if( sanc._width <= 640 && sanc._width > 480){
        siteGalleries._maxSlide = 2;
        siteGalleries._margin = 20;
      }
      if( sanc._width <= 480){
        siteGalleries._maxSlide = 1;
        siteGalleries._margin = 0;
      }
      if( sanc._width > 640 && sanc._width <= 900){
        siteGalleries._maxSlide = 3;
        siteGalleries._margin = 30;
      }
      if( sanc._width > 900 && sanc._width <= 1024){
        siteGalleries._maxSlide = 4;
        siteGalleries._margin = 20;
      }
      if( sanc._width > 1024 && sanc._width <= 1200){
        siteGalleries._maxSlide = 5;
        siteGalleries._margin = 10;
      }
      if( sanc._width > 1200){
        siteGalleries._maxSlide = 5;
        siteGalleries._margin = 50;
      }
      switch(gallery){
        case 'jay':
          siteGalleries.jayGallery(siteGalleries._maxSlide, siteGalleries._margin);
          break;
        case 'dave':
          siteGalleries.daveGallery(siteGalleries._maxSlide, siteGalleries._margin);
          break;
        case 'fierto':
          siteGalleries.fiertoGallery(siteGalleries._maxSlide, siteGalleries._margin);
          break;
        case 'tobias':
          siteGalleries.tobiasGallery(siteGalleries._maxSlide, siteGalleries._margin);
          break;
        case 'tenSancGallery':
          // siteGalleries._tenSancGal.destroySlider();
          // console.log("ten");
          siteGalleries.tenSancGallery(siteGalleries._maxSlide, siteGalleries._margin);
          break;
      }
    },

    tenSancGallery: function(maxSlideQty, margin){
      siteGalleries._tenSancGal = $('#ten-sanc-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 1,
        maxSlides: maxSlideQty,
        slideWidth: 172,
        slideMargin: margin,
        pager: false,
        nextSelector: '#hero .btn-next',
        prevSelector: '#hero .btn-prev',

        onSliderLoad: function(){
          // $('#ten-sanc-gallery').css('opacity', '1');
        }
      });

    },

    fiertoGallery: function(maxSlideQty, margin){
      $('#fierto-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 1,
        maxSlides: maxSlideQty,
        slideWidth: 172,
        slideMargin: margin,
        pager: false,
        nextSelector: '#fierto .btn-next',
        prevSelector: '#fierto .btn-prev',

        onSliderLoad: function(){
          $('#fierto-gallery li:nth-child(5)').css('margin', '0');
          $('#fierto-gallery').css('opacity', '1');
        }
      });
    },

    tobiasGallery: function(maxSlideQty, margin){
      $('#tobias-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 1,
        maxSlides: maxSlideQty,
        slideWidth: 172,
        slideMargin: margin,
        pager: false,
        nextSelector: '#tobias .btn-next',
        prevSelector: '#tobias .btn-prev',

        onSliderLoad: function(){
          $('#tobias-gallery li:nth-child(5)').css('margin', '0');
          $('#tobias-gallery').css('opacity', '1');
        }
      });
    },

    daveGallery: function(maxSlideQty, margin){
      $('#dave-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 1,
        maxSlides: maxSlideQty,
        slideWidth: 172,
        slideMargin: margin,
        pager: false,
        nextSelector: '#dave .btn-next',
        prevSelector: '#dave .btn-prev',

        onSliderLoad: function(){
          $('#dave-gallery li:nth-child(5)').css('margin', '0');
          $('#dave-gallery').css('opacity', '1');
        }
      });
    },

    jayGallery: function(maxSlideQty, margin){
      $('#jay-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 1,
        maxSlides: maxSlideQty,
        slideWidth: 172,
        slideMargin: margin,
        pager: false,
        nextSelector: '#jay .btn-next',
        prevSelector: '#jay .btn-prev',

        onSliderLoad: function(){
          $('#jay-gallery li:nth-child(5)').css('margin', '0');
          $('#jay-gallery').css('opacity', '1');
        }
      });
    },

  };

  function viewportSize(){
    sanc._height = $(window).height();
    sanc._width = $(window).width();
  }

  $(document).ready(function() {
    sanc.construct();
    sanc.init();
  });



})(jQuery);
