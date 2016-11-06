(function($) {
    'use strict';

    $(document).ready(function() {

        $('#simple-menu').sidr();

        $('#sidr button').click(function(event) {
            $.sidr('close', 'sidr');
        });

        $('#sidr ul li a[href^="#"]').click(function(event) {
            event.preventDefault();
            $.sidr('close', 'sidr');
            var aniLocation = $(this).attr('href');
            if (aniLocation != '#') {
                $('body, html').animate({
                    scrollTop: $(aniLocation).offset().top - 10
                }, {
                    duration: 1000,
                    queue: false,
                    specialEasing: {
                        width: "linear",
                        height: "easeInOutExpo"
                    }
                });
            } else {
                $('body, html').animate({
                    scrollTop: 0
                }, {
                    duration: 1000,
                    queue: false,
                    specialEasing: {
                        width: "linear",
                        height: "easeInOutExpo"
                    }
                });
            }
        });

        //Para las Habilidades dentro de Books de Personas
        jQuery('.skillbar').each(function(){
            jQuery(this).find('.skillbar-bar').animate({
                width:jQuery(this).attr('data-percent')
            },4000);
        });

        // Para Actividades dentro de Books de Personas
        //for (var i=1; i<=4; i++){
        //
        //}

        $('.circlestat').circliful({"animationstep":"0.1"});


    });


    $('.md-trigger').click(function(event) {
        event.preventDefault();
    });

    // FadeOut Preloader
    $(window).load(function() {
        $('.preloader-section').fadeOut('slow', function() {
            $(this).remove();
        });
    });

    // Add PrettyPhoto to Links with Rel
    $("a[rel^='prettyPhoto']").prettyPhoto({
        theme: 'light_square'
    });

    // Scrolling Page Effect - Menu
    $('#nav-menu li a[href^="#"], .top-main-content a, .explore').on('click', function(e) {
        e.preventDefault();
        var aniLocation = $(this).attr('href');
        if (aniLocation != '#') {
            $('body, html').animate({
                scrollTop: $(aniLocation).offset().top - 53
            }, {
                duration: 1000,
                queue: false,
                specialEasing: {
                    width: "linear",
                    height: "easeInOutExpo"
                }
            });
        } else {
            $('body, html').animate({
                scrollTop: 0
            }, {
                duration: 1000,
                queue: false,
                specialEasing: {
                    width: "linear",
                    height: "easeInOutExpo"
                }
            });
        }
    });

    $(document).ready(function() {
        // Mockups Slider Init
        $('#mockups').bxSlider({
            minSlides: 1,
            maxSlides: 3,
            moveSlides: 3,
            slideWidth: 320,
            pager: false,
            infiniteLoop: false,
            hideControlOnEnd: true,
            useCSS: false
        });


        // Mockups Slider Init
        $('.blog-slides').bxSlider({
            minSlides: 1,
            maxSlides: 5,
            moveSlides: 3,
            slideWidth: 218,
            slideMargin: 10,
            pager: false,
            infiniteLoop: false,
            hideControlOnEnd: true,
            useCSS: false
        });

        // Mockups Slider Init
        $('.products-slider-shop').bxSlider({
            minSlides: 1,
            maxSlides: 4,
            moveSlides: 3,
            slideWidth: 218,
            slideMargin: 20,
            pager: false,
            infiniteLoop: false,
            hideControlOnEnd: true,
            useCSS: false
        });

        // Parallax Slides Init
        $('.parallax-slides').bxSlider({
            controls: false,
            adaptiveHeight: true,
            infiniteLoop: false,
            hideControlOnEnd: true,
            useCSS: false
        });
    });



    // Sticky Header on Scroll
    var menu = $('#top-header');
    var origOffsetY = menu.offset().top;

    function scroll() {
        if ($(window).scrollTop() >= origOffsetY) {
            menu.addClass('sticky');
        } else {
            menu.removeClass('sticky');
        }
    }
    document.onscroll = scroll;


    $(window).load(function() {
        // Photostack Polaroid Gallery
        if ($('#section-gallery').length > 0) {
            new Photostack(document.getElementById('section-gallery'), {
                callback: function(item) {
                    //console.log(item)
                }
            });
        }
    });

    // ScrollTop Button
    $('.go-top').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });


    /*----------------------------------------------------*/
    /* MOBILE AND TABLET DETECT FUNCTION
	/*----------------------------------------------------*/

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    function parallaxInit() {
        var testMobile = isMobile.any();
        if (testMobile == null) {

            /*$(".parallax-counters").parallax("50%", 0.3);
            $(".parallax-slider-blogs").parallax("50%", 0.3);
            $(".parallax-slider-shop").parallax("50%", 0.3);
            $(".parallax-new-facts").parallax("50%", 0.3);
            $(".parallax-contact").parallax("50%", 0.3);
            $(".parallax-our-services").parallax("50%", 0.3);
            $(".parallax-twitter").parallax("50%", 0.2);
            $(".parallax-testimonials").parallax("50%", 0.2);
            $(".parallax-lines").parallax("50%", 0.2);
            $(".parallax-slider").parallax("50%", 0.2);
            $(".parallax-squares").parallax("50%", 0.2);*/

           // Waypoint Animations
           $('.waypoint-element').css('opacity', 0);

           $('.waypoint-element').waypoint(function() {
             $(this).addClass('fadeInUp animated');
             $(this).css('opacity', 1);
           }, { offset: '80%' });
        }
    }

    $(window).load(function() {
        parallaxInit();
    });




    if ($(window).width() < 625) {
        // Mobile portfolio Categories
        $('.mobile-filters, #filters li a').click(function(event) {
            $('#filters').slideToggle();
        });
    }




})(jQuery);
