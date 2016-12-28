(function ($) {
  var t = $(window).height();
  $("#home").css("height", t);

  $(window).resize(function () {
    t = $(window).height(),
      $("#home").css("height", t);
  });

  var e = $.superscrollorama({triggerAtCenter: !1, playoutAnimations: !0});
  e.pin($("#home"), t, {anim: (new TimelineLite).append(TweenMax.to($(".banner--image-start"), .5, {css: {opacity: 0}}, 1000, 0))}),
    e.addTween(".introduction-effect", TweenMax.to($("#introduction"), .5, {backgroundColor: "rgb(255,255,255)"}), 600, -t);
})(jQuery);

// Show map locations.
$(document).ready(function () {
   var b = $('#B').slider({tooltip: 'always'});
		b.data('slider');
    
  $("#B").on("slideStop", function (slideEvt) {   
    changeCarousel(slideEvt.value);      
    prepareLocations(1780, slideEvt.value, 'refresh');
  });
  
 /*$("#B").on("change", function(slideEvt) {   
    changeCarousel(slideEvt.value.newValue);     
     prepareLocations(1780, slideEvt.value.newValue, 'refresh');
});*/

  var prepareLocations = function (from, to, mode) {
   // console.log(from+'--'+to);
    var locationArr = {};
    $.getJSON('json/mapdata.json', function (data) {
      $.each(data, function (i, f) {
        if (f.year <= to)
        {
          var obj = {};
          obj.lat = f.lat;
          obj.lng = f.lng;
          obj.name = f.name;
          obj.description = f.description;
          locationArr[i] = obj;
        }
      });
      //console.log(locationArr);
      simplemaps_custommap_mapdata.locations = locationArr;
      if(mode !== 'onload')
      {
        simplemaps_custommap.refresh();
      }
      else {
        simplemaps_custommap.load();
      }
    });
  }

  prepareLocations(1780, 1780, 'onload');


  var changeCarousel = function(value) {
    var timelineId = 'parish_1780_1789';
    if(value >= 1780 && value <= 1789) 
    {
      timelineId = 'parish_1780_1789';
    }
    else if (value >= 1790 && value <= 1799) {   
      timelineId = 'parish_1790_1799';
    }    
    else if (value >= 1800 && value <= 1809) {   
      timelineId = 'parish_1800_1809';
    }    
    else if (value >= 1810 && value <= 1819) {   
      timelineId = 'parish_1810_1819';
    }    
    else if (value >= 1820 && value <= 1829) {   
      timelineId = 'parish_1820_1829';
    }
    else if (value >= 1830 && value <= 1839) {   
      timelineId = 'parish_1830_1839';
    }
    else if (value >= 1840 && value <= 1849) {   
      timelineId = 'parish_1840_1849';
    }
    else if (value >= 1850 && value <= 1859) {   
      timelineId = 'parish_1850_1859';
    }
    else if (value >= 1860 && value <= 1869) {   
      timelineId = 'parish_1860_1869';
    }
    else if (value >= 1870 && value <= 1879) {   
      timelineId = 'parish_1870_1879';
    }
    else if (value >= 1880 && value <= 1889) {   
      timelineId = 'parish_1880_1889';
    }
    else if (value >= 1890 && value <= 1900) {   
      timelineId = 'parish_1890_1900';
    }
    
    $(".tm-slider-botttom-wrapper .row").removeClass('active');
     
        
      
      var fix = ('.tm-slider-botttom-wrapper .row') + '#' + timelineId;
      //$(this).children('a').addClass('active');
      //$(fix).addClass('active', 1000);
      $(fix).stop(true,true).addClass("active", 1000);
    $("#timeline-loader").show().delay(1500).fadeOut();
      //$(this).children('a').removeClass('active');
      
    
  };
});


(function ($) {
  $(document).ready(function () {
    // To show the intro banner on first visit.
    var visited = localStorage.getItem('visited');
    if (!visited) {
      localStorage.setItem('visited', true);
    }
    
    //Js for loader
    $("#siteloader").show().delay(1500).fadeOut();


    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    $('#fullscreen, #fullscreen .bg-image').css({width: windowWidth, height: windowHeight});

    // 7 sacrament icon hover show description scroller.
    $('body').on('mouseenter', '#seven-sacraments .row ul li', function () {
      var scroll_by = $(this).find('.description-scroller').height() - $(this).find('.description-container').height();
      if (scroll_by > 0) {
        $(this).find('.description-scroller').animate({marginTop: -scroll_by - 10}, scroll_by * 100);
      }
    }).on('mouseleave', '#seven-sacraments .row ul li', function () {
      $(this).find('.description-scroller').stop(true, true).css({marginTop: 0});
    });
	
	// Button mouse over.
		$(".slideshow-wrapper button.site-button").mouseover(function() {
			$('.slideshow-wrapper button.site-button .btn-value').show();
		}).mouseout(function() {
			$('.slideshow-wrapper button.site-button .btn-value').hide();
		}); 
	

    //Nav section scroll
    $('#navigation .nav-menu ul li a').click(function (e) {
      if (!visited) {
        e.preventDefault();
      }
      $('#navigation .nav-menu ul li a.active').removeClass('active');
      $(this).addClass('active');
      var getID = '#'+$(this).attr('name');
      $(getID).addClass('active');
      if (windowWidth <= 480) {
        $('html, body').animate({
          scrollTop: $(getID).offset().top - 100
        }, 1000);
      } else {
        $('html, body').animate({
          scrollTop: $(getID).offset().top - 88
        }, 1000);
      }
    });


    // Js Fixed menu 
    $(window).bind('scroll', function () {
      var navHeight = $(window).height()*2 - 90;
      if ($(window).scrollTop() > navHeight) {
        $('#navigation').addClass('fixed');
        $('#navigation .nav-menu').show();
      } else {
        $('#navigation').removeClass('fixed');
        $('#navigation .nav-menu').hide();

      }

      if ($(window).scrollTop() > navHeight && $(window).width() <= 1024) {
        $('.mobile-nav-button').show();
        $('#navigation .nav-menu').hide();
      } else {
        $('.mobile-nav-button').hide();
      }
    });

    //Js for Mobile menu
    $('.mobile-nav-button').click(function(){
      $('#navigation .nav-menu').fadeToggle('slow');
    });

    if ($(window).width() <= 1024) {
      $('.nav-menu ul li a').click(function () {
        $('#navigation .nav-menu').fadeOut('slow');
      });
    }

    // Js menu hide/show on window resize.    
    $(window).resize(function(){
      var navHeight = $(window).height() - 90;
      if ($(window).scrollTop() > navHeight && $(window).width() <= 1024) {
        $('.mobile-nav-button').show();
        $('#navigation .nav-menu').hide();
      } else {
        $('.mobile-nav-button').hide();
        $('#navigation .nav-menu').show();
      }
    });


    //Toggle article display
    $('article.section-article').hide();
    $('section.container .button-wrapper button').click(function () {
      $(this).parent().next('article.section-article').fadeToggle("slow");
    });


    // Toggle text on click more button display.
    var showChar = 140;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more";
    var lesstext = "Show less";


    $('.floated-box .image-caption-content').each(function () {
      var content = $(this).html();
      if (content.length > showChar) {
        var c = content.substr(0, showChar);
        var h = content.substr(showChar, content.length - showChar);
        var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<button class="morelink btn">' + moretext + '</button></span>';
        $(this).html(html);
      }
    });

    $(".morelink").click(function () {
      if ($(this).hasClass("less")) {
        $(this).removeClass("less");
        $(this).html(moretext);
      } else {
        $(this).addClass("less");
        $(this).html(lesstext);
      }
      $(this).parent().prev().toggle('slow');
      $(this).prev().toggle('slow');
      return false;
    });

    //Js for Image Gallery
    $('ul.first').bsPhotoGallery({
      "classes": ".col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xxs-12",
      "hasModal": true,
      // "fullHeight" : false
    });


    //Js for slider.    
    
    // Activate Carousel
    $("#myCarousel").carousel({interval: 2000, pause: "false"});
    $('#catholic-church .carousel').carousel({interval: 2000, pause: "false"});

    // Click on the button to start sliding 
    $("#myBtn").click(function () {
      $("#myCarousel").carousel("cycle");
    });

    // Click on the button to stop sliding 
    $("#myBtn2").click(function () {
      $("#myCarousel").carousel("pause");
      $('this').addclass('active');
    });

    // Enable Carousel Controls
    $(".left").click(function () {
      $("#myCarousel").carousel("prev");
      $('#catholic-church .carousel').carousel("prev");
    });
    $(".right").click(function () {
      $("#myCarousel").carousel("next");
      $('#catholic-church .carousel').carousel("next");
    });

    //Js for hide/show slider controls.
    $('#slider-controls-wrapper').hide();

    $("#myCarousel").mouseenter(function () {
      $('#slider-controls-wrapper').fadeIn('slow');
    }).mouseleave(function () {
      $('#slider-controls-wrapper').fadeOut('slow');
    });
     
    
    
  });
})(jQuery);
