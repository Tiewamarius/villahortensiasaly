( function( $ ) {
  'use strict';

  var elementor = 0;
  if ( window.location.href.indexOf('/?elementor-preview=') > -1 ) {
      elementor = 1;
  }

  /*
    general
  */
  $('.set-sticky-container').attr('data-sticky-container', '');
  $('.set-sticky-margintop100').attr('data-margin-top', '100');

  $('.login-remember label').append('<span></span>');

  $('.mphb_sc_account .mphb-account-menu ul li a').each(function(){
    if ( $(this).attr('href') === location.href ) {
      $(this).parent('li').addClass('active');
    }
  });
  
  if ( !$('.knsl-banner').length && !$('.knsl-banner-white').length && !$('.knsl-top-bar-white').length && !$('.elementor > .e-con-full:nth-child(1)').length ) {
    $('.knsl-top-bar').removeClass('knsl-top-bar-minimal');
  }
  if ( $('.knsl-app.knsl-app-minimal').length ) {
    $('body').addClass('knsl-app-minimal');
  }
  if ( $('.knsl-app.knsl-app-minimal.knsl-app-dark').length ) {
    $('body').addClass('knsl-app-dark');
  }

  /*
    preloader
  */
  $(document).ready(function() {
    $(".knsl-preloader").animate({
      opacity: 1
    }, {
      duration: 400,
    });
    setTimeout(function() {
      $('.knsl-preloader-number').each(function() {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 800,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
        });
      });
      $(".knsl-preloader-bar").animate({
        width: '100%'
      }, {
        duration: 800,
        complete: function() {
          $(".knsl-preloader-frame").addClass('knsl-hidden')
        }
      });
    }, 1000);
  });

  /*
    mobile header
  */
  function moveHeaderBtnMobile() {
    if ( document.documentElement.clientWidth <= 992 ) {
        if ( ! $('.elementor-widget-kinsley-header-menu .knsl-btn').length ) {
          $('.elementor-widget-kinsley-header-menu .elementor-widget-container').append( $('.elementor-widget-kinsley-header-buttons .knsl-btn').prop('outerHTML') );
        }
    } else {
      if ( $('.elementor-widget-kinsley-header-menu .knsl-btn').length ) {
        $('.elementor-widget-kinsley-header-menu .knsl-btn').remove();
      }
    }
  }
  moveHeaderBtnMobile();
  window.addEventListener("resize", function(){
    moveHeaderBtnMobile();
  });

  /*
    popup
  */
  $('.knsl-btn-book').on("click", function() {
    $('.knsl-popup-frame-1').toggleClass('knsl-active');
    return false;
  });

  $('.knsl-popup-frame-2').each(function(){
    var popup = $(this);
    var popup_id = popup.attr('id');
    $('a[href="#'+popup_id+'"]').on("click", function() {
      popup.toggleClass('knsl-active');
      return false;
    });
    popup.find('.knsl-close-popup').on("click", function() {
      $('.knsl-popup-frame').removeClass('knsl-active')
    });
  });

  /*
    scrollspy and smooth scroll
  */
  $('.knsl-side-menu a , .knsk-s-s').on("click", function() {
    $(".knsl-active").removeClass("knsl-active");
    $(this).closest('li a').addClass("knsl-active");
    var theClass = $(this).attr("class");
    $('.' + theClass).parent('li a').addClass('knsl-active');
    $('html, body').stop().animate({
      scrollTop: $($(this).attr('href')).offset().top - 170
    }, 600);
    return false;
  });

  /*
    parallax
  */
  $(window).on('scroll', parallax)

  function parallax() {
    var s = $(window).scrollTop();

    function parallaxDown(e, t) {
      $(e).css({
        'position': 'relative',
        'top': (s * t) + 'px'
      });
    }
    parallaxDown('.knsl-parallax', .4);
  }

  /*
    menu
  */
  $('.knsl-menu-btn').on('click', function() {
    $('.knsl-menu-btn , .knsl-right-side, .elementor-widget-kinsley-header-menu').toggleClass('knsl-active');
  });
  $('.knsl-menu ul li a').on('click', function() {
    $('.knsl-menu-btn , .knsl-right-side, .elementor-widget-kinsley-header-menu').removeClass('knsl-active');
  });
  $( "<i></i>" ).insertAfter('.knsl-menu nav > ul > li.menu-item-has-children > a');
  $('.knsl-menu ul li a').on('click', function() {
    $('.knsl-menu-btn , .knsl-right-side, .elementor-widget-kinsley-header-menu').removeClass('knsl-active');
  });
  $(window).on('scroll', function(){
  	if ($(this).scrollTop() > 100) {
  		$('.knsl-top-bar').addClass('fixed');
  	}
  	else {
  		$('.knsl-top-bar').removeClass('fixed');
  	}
  });
  if ($(window).width() < 992) {
    $('.knsl-menu ul li i').on('click', function(){
    	if($(this).hasClass('active')){
    		$(this).removeClass('active');
    		$(this).closest('li').removeClass('active');
    		$(this).closest('li').find('> ul').slideUp();
    	} else {
    		$(this).addClass('active');
    		$(this).closest('li').addClass('active');
    		$(this).closest('li').find('> ul').slideDown();
    	}
    });
  }

  /*
    minicart
  */
  $('.knsl-cart').on('click', function() {
    $('.knsl-minicart-window').toggleClass('knsl-active');
    $('.knsl-menu-btn, .knsl-right-side, .elementor-widget-kinsley-header-menu, .knsl-popup-frame').removeClass('knsl-active');
  });

  $('.woocommerce-mini-cart__buttons a').on('click', function() {
    $('.knsl-minicart-window').removeClass('knsl-active');
  });

  /*
    nice select
  */
  $(document).ready(function() {
    $('select').not('[class^="datepick"], [class^="avc-input"]').select2();
  });
  $( "<span></span>" ).insertAfter( $( ".mphb-checkbox-label input[type='checkbox'], .mphb-terms-and-conditions-accept label input[type='checkbox']" ) );

  /*
    datepicker
  */
  $('.datepicker-here').datepicker({
    language: 'en',
    minDate: new Date()
  });

  /*
    about slider
  */
  var swiper = new Swiper('.knsl-about-slider', {
    slidesPerView: 2,
    spaceBetween: 20,
    parallax: true,
    autoHeight: true,
    updateOnWindowResize: true,
    initialSlide: 1,
    centeredSlides: true,
    speed: 800,
    noSwipingSelector: 'button',
    observer: true,
    observeParents: true,
    pagination: {
      el: '.knsl-about-slider-1-pagination',
      type: "fraction",
    },
    navigation: {
      prevEl: '.knsl-about-slider-1-prev',
      nextEl: '.knsl-about-slider-1-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1600: {
        slidesPerView: 3,
      },
    },
  });

  /*
    testimonials slider
  */
  var swiper = new Swiper('.knsl-testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    parallax: true,
    autoHeight: true,
    updateOnWindowResize: true,
    initialSlide: 1,
    centeredSlides: true,
    speed: 800,
    noSwipingSelector: 'button',
    observer: true,
    observeParents: true,
    pagination: {
      el: '.knsl-testimonials-slider-1-pagination',
      type: "fraction",
    },
    navigation: {
      prevEl: '.knsl-testimonials-slider-1-prev',
      nextEl: '.knsl-testimonials-slider-1-next',
    },
  });

  /*
    testimonials slider two
  */
  var swiper = new Swiper('.knsl-testimonials-two-slider', {
    slidesPerView: 1,
    spaceBetween: 50,
    parallax: true,
    autoHeight: true,
    updateOnWindowResize: true,
    initialSlide: 1,
    centeredSlides: true,
    speed: 800,
    noSwipingSelector: 'button',
    observer: true,
    observeParents: true,
    pagination: false,
    rewind: true,
    navigation: {
      prevEl: '.knsl-two-slider-tt-prev',
      nextEl: '.knsl-two-slider-tt-next',
    },
  });

  /*
    rooms slider
  */
  var swiper = new Swiper('.knsl-uni-slider', {
    slidesPerView: 3,
    spaceBetween: 20,
    parallax: true,
    autoHeight: true,
    updateOnWindowResize: true,
    speed: 800,
    noSwipingSelector: 'button',
    observer: true,
    observeParents: true,
    pagination: {
      el: '.knsl-uni-slider-pagination',
      type: "fraction",
    },
    navigation: {
      prevEl: '.knsl-uni-slider-prev',
      nextEl: '.knsl-uni-slider-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  /*
    rooms slider two
  */
  var swiper_rooms_carousel_two = new Swiper('.knsl-carousel-two', {
    slidesPerView: 2,
    spaceBetween: 30,
    parallax: true,
    autoHeight: true,
    updateOnWindowResize: true,
    speed: 800,
    noSwipingSelector: 'button',
    observer: true,
    observeParents: true,
    pagination: false,
    rewind: true,
    navigation: {
      prevEl: '.knsl-two-slider-rm-prev',
      nextEl: '.knsl-two-slider-rm-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
      },
    },
  });

  /*
    rooms slider three
  */
  var swiper_rooms_carousel_three = new Swiper('.knsl-carousel-three', {
    slidesPerView: 1,
    spaceBetween: 30,
    parallax: true,
    autoHeight: true,
    updateOnWindowResize: true,
    speed: 800,
    noSwipingSelector: 'button',
    observer: true,
    observeParents: true,
    pagination: false,
    rewind: true,
    navigation: {
      prevEl: '.knsl-three-slider-rm-prev',
      nextEl: '.knsl-three-slider-rm-next',
    }
  });

  /*
    room details
  */
  var swiper1 = new Swiper(".knsl-rd-slider-1", {
    loop: false,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    noSwipingSelector: 'button',
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.knsl-rd-slider-1 .swiper-button-next',
      prevEl: '.knsl-rd-slider-1 .swiper-button-prev',
    },
  });
  var swiper2 = new Swiper(".knsl-rd-slider-2", {
    loop: true,
    effect: 'fade',
    parallax: true,
    noSwipingSelector: 'button',
    observer: true,
    observeParents: true,
    thumbs: {
      swiper: swiper1,
    },
    navigation: {
      nextEl: '.knsl-rd-slider-2 .swiper-button-next',
      prevEl: '.knsl-rd-slider-2 .swiper-button-prev',
    },
  });

  /*
    hero slideshow
  */
  var hero_slideshow_params_speed = $('.knsl-banner-slideshow').data('speed');
  var hero_slideshow_params_delay = $('.knsl-banner-slideshow').data('delay');
  var swiper = new Swiper('.knsl-banner-slideshow', {
    slidesPerView: 1,
    spaceBetween: 0,
    parallax: true,
    effect: 'fade',
    observer: true,
    observeParents: true,
    autoplay: {
      delay: hero_slideshow_params_delay,
    },
    speed: hero_slideshow_params_speed,
  });

  /*
    hero slider
  */
  var hero_slider_interleave_offset = 0.5;
  var hero_slider_params_speed = $('.knsl-banner-slider').data('speed');
  var hero_slider_params_autoplay = $('.knsl-banner-slider').data('autoplay');
  var mainSliderSelector = new Swiper('.knsl-banner-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: hero_slider_params_speed,
    parallax: true,
    autoplay: hero_slider_params_autoplay,
    grabCursor: true,
    watchSlidesProgress: true,
    noSwipingSelector: '.knsl-btn, .knsl-scroll-hint',
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.knsl-banner-slider-wrapper .swiper-custom-nav .next',
      prevEl: '.knsl-banner-slider-wrapper .swiper-custom-nav .prev',
    },
    on: {
      progress: function() {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
        var slideProgress = swiper.slides[i].progress,
          innerOffset = swiper.width * hero_slider_interleave_offset,
          innerTranslate = slideProgress * innerOffset;
          swiper.slides[i].querySelector('.knsl-banner-slide').style.transform = 'translateX(' + innerTranslate + 'px)';
        }
      },
      touchStart: function() {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = '';
        }
      },
      setTransition: function(swiper, speed) {
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = speed + 'ms';
          swiper.slides[i].querySelector('.knsl-banner-slide').style.transition = speed + 'ms';
        }
      }
    }
  });

  /*
    hero slider v
  */
  if ($('.knsl-banner-slider-v').length || $('.knsl-banner-slider-vt').length) {
    var hero_slider_v_params_speed = $('.knsl-banner-slider-v').data('speed');
    var hero_slider_v_params_autoplay = $('.knsl-banner-slider-v').data('autoplay');
    var mainSlidervSelector = new Swiper('.knsl-banner-slider-v', {
      direction: "vertical",
      spaceBetween: 0,
      loop: false,
      rewind: true,
      speed: hero_slider_v_params_speed,
      parallax: true,
      autoplay: false,
      watchSlidesProgress: true,
      navigation: false,
      observer: true,
      observeParents: true,
      on: {
        progress: function() {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
          var slideProgress = swiper.slides[i].progress,
            innerOffset = swiper.height * 0.5,
            innerTranslate = slideProgress * innerOffset;
            swiper.slides[i].querySelector('.knsl-banner-slide').style.transform = 'translateY(' + innerTranslate + 'px)';
          }
        },
        touchStart: function() {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = '';
          }
        },
        setTransition: function(swiper, speed) {
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + 'ms';
            swiper.slides[i].querySelector('.knsl-banner-slide').style.transition = speed + 'ms';
          }
        }
      }
    });
    var mainSlidervtSelector = new Swiper('.knsl-banner-slider-vt', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 0,
      loop: false,
      rewind: true,
      speed: hero_slider_v_params_speed,
      parallax: false,
      autoplay: hero_slider_v_params_autoplay,
      grabCursor: true,
      watchSlidesProgress: true,
      navigation: false,
      observer: true,
      observeParents: true,
    });
    mainSlidervtSelector.controller.control = mainSlidervSelector;
    mainSlidervSelector.controller.control = mainSlidervtSelector;
  }

  /*
    scroll animation
  */
  $(window).scroll(function() {
    $('.knsl-scroll-animation').each(function(i) {
      var bottom_of_object = $(this).offset().top - 600 + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if (bottom_of_window > bottom_of_object) {
        $(this).addClass('knsl-active-el');
      }
      if (bottom_of_window < bottom_of_object) {
        $(this).removeClass('knsl-active-el');
      }
    });
  });

  /*
    counters
  */
  var count = 0;
  if ($('.knsl-counters-card').length) {
    $(window).scroll(function() {
      var oTop = $('.knsl-counters-card').offset().top - window.innerHeight;
      if (count == 0 && $(window).scrollTop() > oTop) {
        $('.knsl-counter-number').each(function() {
          var $this = $(this),
            countTo = $this.attr('data-count');
          $({
            countNum: $this.text()
          }).animate({
            countNum: countTo
          }, {
            duration: 3000,
            easing: 'swing',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
            }
          });
        });
        count = 1;
      }
    });
  }

  /*
    sticky
  */
  var sticky = new Sticky('.knsl-sticky');
  if ($(window).width() < 992) {
    sticky.destroy();
  }
  
  /*
    isotope
  */
  $('.knsl-filter a').on('click', function() {
    $('.knsl-filter .knsl-current').removeClass('knsl-current');
    $(this).addClass('knsl-current');

    var selector = $(this).data('filter');
    $('.knsl-masonry-grid').isotope({
      filter: selector
    });
    return false;
  });

  var hide_all = $('.knsl-filter').hasClass('knsl-filter--hide-all');
  var first_filter = '*';
  if ( hide_all ) {
    first_filter = $('.knsl-filter .knsl-current').data('filter');
  }
  var $masonryGrid = $('.knsl-masonry-grid').isotope({
    filter: first_filter,
    itemSelector: '.knsl-masonry-grid-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.knsl-grid-sizer'
    }
  });
  $masonryGrid.imagesLoaded().progress( function() {
      $masonryGrid.isotope ({
        columnWidth: '.knsl-grid-sizer',
        isAnimated: true
    });
  });

  /*
    update Masonry grid after Lazy Load
  */
  if ( $('img.lazyload').length ) {
    $(document).on('lazyloaded', function(e){
      $masonryGrid.isotope('layout');
    });
  }

  /*
    Magnific Popups
  */
  if ( ! $('body').hasClass('elementor-default') ) {
    if(/\.(?:jpg|jpeg|gif|png)$/i.test($('.wp-block-gallery .blocks-gallery-item:first a').attr('href'))){
      $('.wp-block-gallery a').magnificPopup({
        gallery: {
            enabled: true
        },
        type: 'image',
        closeOnContentClick: false,
        fixedContentPos: false,
        closeBtnInside: false,
        callbacks: {
          beforeOpen: function() {
             this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
             this.st.mainClass = 'mfp-zoom-in';
          }
        },
      });
    }
  }
  $('[data-magnific-inline]').magnificPopup({
    type: 'inline',
    overflowY: 'auto',
    preloader: false,
    callbacks: {
      beforeOpen: function() {
         this.st.mainClass = 'mfp-zoom-in';
      }
    },
  });
  $('[data-magnific-content]').magnificPopup({
    type: 'inline',
    overflowY: 'auto',
    preloader: true,
    callbacks: {
      beforeOpen: function() {
         this.st.mainClass = 'popup-box-inline mfp-zoom-in';
      }
    },
  });
  $('[data-magnific-image]').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    fixedContentPos: false,
    closeBtnInside: false,
    callbacks: {
      beforeOpen: function() {
         this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
         this.st.mainClass = 'mfp-zoom-in';
      }
    },
  });
  $('[data-magnific-video]').magnificPopup({
    type: 'iframe',
    iframe: {
        patterns: {
            youtube_short: {
              index: 'youtu.be/',
              id: 'youtu.be/',
              src: 'https://www.youtube.com/embed/%id%?autoplay=1'
            }
        }
    },
    preloader: false,
    fixedContentPos: false,
    callbacks: {
      markupParse: function(template, values, item) {
        template.find('iframe').attr('allow', 'autoplay');
      },
      beforeOpen: function() {
         this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
         this.st.mainClass = 'mfp-zoom-in';
      }
    },
  });
  $('[data-magnific-gallery]').magnificPopup({
    gallery: {
        enabled: true
    },
    type: 'image',
    closeOnContentClick: false,
    fixedContentPos: false,
    closeBtnInside: false,
    callbacks: {
      beforeOpen: function() {
         this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
         this.st.mainClass = 'mfp-zoom-in';
      }
    },
  });
  $('[data-magnific-open-gallery]').on('click', function(){
    var gallery = $(this).attr('href');

    $(gallery).magnificPopup({
        delegate: 'a',
        type:'image',
        closeOnContentClick: false,
        mainClass: 'mfp-fade',
        removalDelay: 160,
        fixedContentPos: false,
        gallery: {
            enabled: true
        }
    }).magnificPopup('open');

    return false;
  });

  /*
    pagination
  */
  if ( ! $('.knsl-pagination > *').length ) {
    $('.knsl-pagination').hide();
  }

  /*
    scroll Top
  */
  const scrollTop = document.querySelector('#scrollTop');
  window.onscroll = function(){
      var num = window.pageYOffset;
      if ( scrollTop != undefined ) {
        if (num >= 160){
          scrollTop.classList.add('active');
        } else {
          scrollTop.classList.remove('active');
        }
      }
  }
  if ( scrollTop != undefined ) {
    scrollTop.addEventListener('click', function(){
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
      });
    });
  }

  /*
    fix scroll Top to Booking form
  */
  if ( $('body').hasClass('single-mphb_room_type') ) {
		var room_form_hash = window.location.hash;
		if ( room_form_hash.indexOf('#booking-form-') != -1 ) {
			var room_form_id = room_form_hash.replace('#', '');
			if($(''+room_form_hash).length){
				var room_form_top = $(room_form_hash).offset().top - 50 - parseFloat($('.knsl-top-bar').height());
				if ( room_form_top > 0 ) {
					setTimeout(function(){
						$('html, body').animate({scrollTop: room_form_top}, 1000);
					}, 1000);
				}
			} else {
				if ( $('.elementor-section .mphb_sc_search-form').length ) {
					var room_form_top = $('.elementor-section .mphb_sc_search-form').offset().top - 50 - parseFloat($('.knsl-top-bar').height());
					if ( room_form_top > 0 ) {
						setTimeout(function(){
							$('html, body').animate({scrollTop: room_form_top}, 1000);
						}, 1000);
					}
				}
			}
		}
	}

  /*
    fix childs selectbox update after change Adults
  */
  $('.mphb-adults-chooser select').on('change', function(){
    $(".mphb-children-chooser select").trigger('change.select2');
  });

  /*
    header menu button
  */
	$('.onovo-menu-btn').on('click', function(){
		var obj = $(this);
		if(obj.hasClass('btn--active')) {
			$('body').removeClass('onovo--noscroll');
			$('.knsl-top-bar').removeClass('header--active');
			obj.removeClass('btn--active');
			obj.addClass('onovo--notouch');
			obj.parent().find('.onovo-menu-popup').removeClass('menu--ready');
			obj.parent().find('.onovo-menu-container').addClass('onovo--noscroll');
			setTimeout(function(){
				obj.parent().find('.onovo-menu-popup').removeClass('menu--open');
			}, 300);
			setTimeout(function(){
				obj.removeClass('onovo--notouch');
				obj.parent().find('.onovo-menu-popup').removeClass('menu--visible');
			}, 1600);
		}
		else {
			$('body').addClass('onovo--noscroll');
			$('.knsl-top-bar').addClass('header--active');
			obj.addClass('btn--active');
			obj.addClass('onovo--notouch');
			obj.parent().find('.onovo-menu-popup').addClass('menu--visible');
			obj.parent().find('.onovo-menu-popup').addClass('menu--open');
			setTimeout(function(){
				obj.removeClass('onovo--notouch');
				obj.parent().find('.onovo-menu-container').removeClass('onovo--noscroll');
				obj.parent().find('.onovo-menu-popup').addClass('menu--ready');
			}, 600);
		}
		return false;
	});

	$('.onovo-menu').on('click', 'a', function(){
		if (!$(this).parent().hasClass('menu-item-has-children')){
			$('.knsl-top-bar .onovo-menu-btn.btn--active').trigger('click');
		}
	});

	/*
		header menu dropdown
	*/
  if ($('.onovo-menu').length) {
    $('.onovo-menu .menu-item-has-children > a').after('<span class="icon"></div>');
  }
	$('.onovo-menu').on('click', '.menu-item-has-children > .icon, .dropdown-link > a', function(){
		if($(this).closest('li').hasClass('opened')) {
			$(this).closest('li').removeClass('opened');
		} else {
			$(this).closest('ul').find('> li').removeClass('opened');
			$(this).closest('li').addClass('opened');
		}
		return false;
	});

  /*
		WC simple checkout
	*/
  $('#customer_details').on('click', 'h3', function(){
    if($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');
    } else {
      $(this).parent().addClass('active');
    }
    
    return false;
  });

  /*
    video
  */
	$('.kinsley-video').on('click', '.play, .image', function(){
		$(this).closest('.kinsley-video').addClass('active');
		var iframe = $(this).closest('.kinsley-video').find('.js-video-iframe');
		largeVideoPlay(iframe);
		return false;
	});
	function largeVideoPlay( iframe ) {
		var src = iframe.data('src');
		iframe.attr('src', src);
	}

  /*
    map
  */
  $(".knsl-lock").on('click', function() {
    $('.knsl-map').toggleClass('knsl-active');
    $('.knsl-lock').toggleClass('knsl-active');
    $('.knsl-lock .fas').toggleClass('fa-unlock');
  });
  if ( $("div").is("#map") ) {
    var map_zoom = $('#map').data('zoom');
    var map_lng = $('#map').data('lng');
    var map_lat = $('#map').data('lat');
    var map_style_param = $('#map').data('style');
    var map_style = 'mapbox:/'+'/styles/mapbox/streets-v11';
	  var map_key = $('#map').data('key');

    if ( map_style_param != 'default' && map_style_param != undefined ) {
      map_style = 'mapbox:/'+'/styles/mapbox/' + map_style_param;
    }

    if (map_key) {
      mapboxgl.accessToken = map_key;

      var map = new mapboxgl.Map({
        container: 'map',
        style: map_style,
        center: [map_lng, map_lat],
        zoom: map_zoom
      });
      var marker = new mapboxgl.Marker().setLngLat([map_lng, map_lat]).addTo(map);
    }
  }

} )( jQuery );
