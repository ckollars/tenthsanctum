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

    log: function (data){
      if( typeof console !== 'undefined'){
        console.log(data);
      }
    }


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

    filter: function(image) {
      return image.tags.indexOf('tenthsanctum') >= 0;
    },

    after: function(){
      siteGalleries.jayGallery();
      var images = $('#jay-gallery a').fancybox({
        'overlayOpacity' : '0.9',
        'overlayColor' : '#131313'
      });
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
      var maxSlide, margin;
      if( sanc._width <= 640 && sanc._width >= 480){
        maxSlide = 2;
        margin = 30;
      }
      if( sanc._width < 480){
        maxSlide = 1;
        margin = 30;
      }
      if( sanc._width > 640 && sanc._width <= 900){
        maxSlide = 3;
        margin = 50;
      }
      if( sanc._width > 900 && sanc._width <= 1024){
        maxSlide = 4;
        margin = 50;
      }
      if( sanc._width > 1024){
        maxSlide = 5;
        margin = 50;
      }
      siteGalleries.tenSancGallery(maxSlide, margin);
      siteGalleries.fiertoGallery();
      siteGalleries.tobiasGallery();
      siteGalleries.daveGallery();
      // siteGalleries.jayGallery();

      $('.btn-next, .btn-prev').on('click', function(e){
        e.preventDefault();
      });
    },

    tenSancGallery: function(maxSlideQty, margin){
      $('#ten-sanc-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 1,
        maxSlides: maxSlideQty,
        slideWidth: 172,
        slideMargin: margin,
        pager: false,
        // controls: false,
        nextSelector: '#hero .btn-next',
        prevSelector: '#hero .btn-prev',

        onSliderLoad: function(){
          if( sanc._width > 640 && sanc._width <= 768){
            // $('#ten-sanc-gallery li:nth-child(3)').css('margin', '0');
          }else{
            // $('#ten-sanc-gallery li:nth-child(5)').css('margin', '0');
          }
          $('#ten-sanc-gallery').css('opacity', '1');
        }
      });

    },

    fiertoGallery: function(){
      $('#fierto-gallery').bxSlider({
        infiniteLoop: false,
        minSlides: 1,
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
        minSlides: 1,
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
        minSlides: 1,
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
        minSlides: 1,
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

  function viewportSize(){
    sanc._height = $(window).height();
    sanc._width = $(window).width();
  }

  $(document).ready(function() {
    sanc.construct();
    sanc.init();
  });


})(jQuery);
