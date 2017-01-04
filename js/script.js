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
  // Initialize map and its options.
  var myOptions = {
    center: new google.maps.LatLng(42.324458, -72.001991),
    zoom: 8,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: false,
    /*styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [
          {visibility: "off"}
        ]
      }
    ]*/
  };
  var map = new google.maps.Map(document.getElementById("map"),
    myOptions);

  var markers = [];
  // Adds a marker to the map and push to the array.
  function addMarker(location, title, map) {
    var pinColor = "BD922D";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: title,
      icon: pinImage,
    });
    markers.push(marker);
    return marker;
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers(map) {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers(map) {
    clearMarkers(map);
    markers = [];
  }
  // Global Infowindow shown on the map.
  var infowindow = new google.maps.InfoWindow();

  function setMarkers(map, locations, from, to) {
    //console.log(markers);
    var marker, i;
    deleteMarkers(map);
    for (i = 0; i < locations.length; i++)
    {
      var obj = locations[i];
      if (obj.year <= to)
      {
        var title = obj.name;
        var lat = obj.lat;
        var long = obj.lng;
        var content = obj.description;

        latlngset = new google.maps.LatLng(lat, long);

        var marker = addMarker(latlngset, title, map);

        google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
          return function () {
            infowindow.close();
            infowindow.setContent(content);
            infowindow.open(map, marker);
          };
        })(marker, content, infowindow));
      }
    }
    showMarkers(map);
  }

  // Timeline Slider initialization.
  $("#B").slider({
    id: 'BC',
    tooltip: 'hide',
    ticks: [1780, 1790, 1800, 1810, 1820, 1830, 1840, 1850, 1860, 1870, 1880, 1890, 1900],
    ticks_labels: ['1780', '1790', '1800', '1810', '1820', '1830', '1840', '1850', '1860', '1870', '1880', '1890', '1900'],
    handle: 'round',
  });

  $(".tm-slider-botttom-wrapper .tm-content-row:first-child").css('opacity', '1');

  $("#B").on("slideStop", function (slideEvt) {
    changeCarousel(slideEvt.value);
    prepareLocations(1780, slideEvt.value, 'refresh');
  });


  var prepareLocations = function (from, to) {
    $.getJSON('json/mapdata.json', function (data) {
      setMarkers(map, data, from, to);
    });
  }

  prepareLocations(1780, 1780);


  var changeCarousel = function (value) {
    var timelineId = 'parish_1780_1789';
    if (value >= 1780 && value <= 1789)
    {
      timelineId = 'parish_1780_1789';
    } else if (value >= 1790 && value <= 1799) {
      timelineId = 'parish_1790_1799';
    } else if (value >= 1800 && value <= 1809) {
      timelineId = 'parish_1800_1809';
    } else if (value >= 1810 && value <= 1819) {
      timelineId = 'parish_1810_1819';
    } else if (value >= 1820 && value <= 1829) {
      timelineId = 'parish_1820_1829';
    } else if (value >= 1830 && value <= 1839) {
      timelineId = 'parish_1830_1839';
    } else if (value >= 1840 && value <= 1849) {
      timelineId = 'parish_1840_1849';
    } else if (value >= 1850 && value <= 1859) {
      timelineId = 'parish_1850_1859';
    } else if (value >= 1860 && value <= 1869) {
      timelineId = 'parish_1860_1869';
    } else if (value >= 1870 && value <= 1879) {
      timelineId = 'parish_1870_1879';
    } else if (value >= 1880 && value <= 1889) {
      timelineId = 'parish_1880_1889';
    } else if (value >= 1890 && value <= 1900) {
      timelineId = 'parish_1890_1900';
    }

    $(".tm-slider-botttom-wrapper .tm-content-row").removeClass('active');
    //$(".tm-slider-botttom-wrapper .row").fadeOut();
    $("#timeline-loader").show().delay(500).fadeOut();

    var fix = ('.tm-slider-botttom-wrapper .tm-content-row') + '#' + timelineId;

    $(fix).addClass('active').animate({opacity: 1.0}, 1500);

  }
});


(function ($) {
  $(document).ready(function () {
  
    //Js for loader
    $("#siteloader").show().delay(1000).fadeOut();


    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    $('#fullscreen, #fullscreen .bg-image, #siteloader').css({width: windowWidth, height: windowHeight});

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
    $(".content-popup-wrapper button.site-button").mouseover(function () {
      $('.content-popup-wrapper button.site-button .btn-value').show();
    }).mouseout(function () {
      $('.content-popup-wrapper button.site-button .btn-value').hide();
    });

    //Js for apply window width to navigation wrapper.
      $('#navigation').width(windowWidth);
    

    //Nav section scroll
    $('#navigation .nav-menu ul li a').click(function (e) {
      e.preventDefault();
      $('#navigation .nav-menu ul li a.active').removeClass('active');
      $(this).addClass('active');
      var getID = '#' + $(this).attr('name');
      $(getID).addClass('active');
      if (windowWidth <= 480) {
        $('html, body').animate({
          scrollTop: $(getID).offset().top - 80
        }, 1000);
      } else {
        $('html, body').animate({
          scrollTop: $(getID).offset().top - 88
        }, 1000);
      }
    });
    
    
    //Js for Scroll down arrow.
    $('a.scroll-down-arrow').click(function (e) {
      e.preventDefault();
      var getID = '#' + $(this).attr('name');
      $('#navigation .nav-menu ul li:first-child a').addClass('active');
      $(getID).addClass('active');
      if (windowWidth <= 480) {
        $('html, body').animate({
          scrollTop: $(getID).offset().top - 80
        }, 1000);
      } else {
        $('html, body').animate({
          scrollTop: $(getID).offset().top - 88
        }, 1000);
      }
    });


    // Js Fixed menu
    $(window).bind('scroll', function () {
      var navHeight = $(window).height() * 2 - 90;
      if ($(window).scrollTop() > navHeight) {
        $('#navigation').addClass('fixed');
        $('#navigation .nav-menu').show();
      } else {
        $('#navigation').removeClass('fixed');
        $('#navigation .nav-menu').hide();
      }

      //Js for Mobile menu show/hide
      if ($(window).scrollTop() > navHeight && $(window).width() <= 1140) {
        $('#navigation .nav-menu').hide();
        //$('.mobile-nav-button').show();
        $('.mobile-nav-button').css('display', 'inline-block');
      } else {
        $('.mobile-nav-button').hide();
      }
    });

    //Js for Mobile menu
    $('.mobile-nav-button').click(function () {
      $('#navigation .nav-menu').fadeToggle('slow');
    });

    //Js for hide nav after clicking on link when mobile menu enable
    if ($(window).width() <= 1140) {
      $('.nav-menu ul li a').click(function () {
        $('#navigation .nav-menu').fadeOut('slow');
      });
    }

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
    
    
    // Js for timeline slideshow caption.
//     var CaptionshowChar = 50;
//     var Captionellipsestext = "...";
//    $('#timeline-content-container .content-popup-wrapper .tm-slideshow-caption').each(function () {
//      var tmCaption = $(this).html();
//      if (tmCaption.length > CaptionshowChar) {
//        var Captioncuttext = tmCaption.substr(0, showChar);
//        var html = Captioncuttext + '&nbsp' + Captionellipsestext;
//        $(this).html(html);
//      }
//    });
    
    

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
  
    
    
    // Js menu hide/show on window resize.
    $(window).on("resize", function () {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    $('#siteloader').css({width: windowWidth, height: windowHeight});
    $('#fullscreen, #fullscreen .bg-image').css({'width': windowWidth, 'height': windowHeight, 'background-position': 'center center'});
    var navHeight = $(window).height() - 90;
    if ($(window).scrollTop() > navHeight && $(window).width() <= 1140) {
      //$('.mobile-nav-button').show();
      $('.mobile-nav-button').css('display', 'inline-block');
      $('#navigation .nav-menu').hide();
    } else {
      $('.mobile-nav-button').hide();
    }
    
    //Js for apply window width to navigation wrapper.
    $('#navigation').width(windowWidth);

  }).resize();
    
    
})(jQuery);
