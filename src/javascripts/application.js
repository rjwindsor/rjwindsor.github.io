// Start jQuery
$( document ).ready(function() {
  
  // initialize Isotope
  var $container = $('.main-content').isotope({
    itemSelector: '.item',
    layoutMode: 'masonry',
    transitionDuration: '0.2s',
    isResizeBound: true,
    masonry: {
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer'
    }
  });

  // layout Isotope again after all images have loaded
  $container.imagesLoaded( function() {
    $container.isotope('layout');
  });


  // Filter items on button click
  $('header ul li').on( 'click', 'a', function() {
    var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
    $(this).addClass("active").parent("li").siblings("li").children("a").removeClass("active");
    if( $(window).width() < 1024 ) {
      $("header ul").fadeOut(200, function(){
        $('.filter, .about, .email').delay(100).fadeIn("200");
      });
    }
    event.preventDefault();
  });

  // tablet scroll 

  if( $(window).width() > 767 && $(window).width() < 1024 ) {
    $(window).scroll(function(){
      if($("header ul").is(":visible")) {
        $("header ul").fadeOut(200, function(){
          $('.filter, .about, .email').delay(100).fadeIn("200");
        });  
      }
     })
  }




  

  // Filter Button
  $(".filter").click(function(){
    $(".filter, .about, .email").fadeOut(200, function(){
      $('header ul').delay(100).fadeIn("200");
    });
    event.preventDefault();
  })

  // Overlay
  var overlay = $(".overlay");
  var overlayDark = $(".overlay-dark");


  // About Open
  $(".about").click(function(){
    $.ajax({
      url: "about.html",
      context: document.body
    }).done(function(html) {
      overlay.append(html).fadeIn("200").addClass("active");
      $('body').addClass("overlay-open");
      overlaySize();
    });
    event.preventDefault();
  })

  // Overlay Close
  $(".overlay").on( "click", ".close", function() {
    overlay.fadeOut("200", function(){
      $(this).empty().removeClass("active").removeAttr( "style" );
      $("body").removeAttr( "style" ).removeClass("overlay-open");
    });
    event.preventDefault()
  });


  // Project Open
  $(".item").click(function(){
    var itemUrl = $(this).attr("href");
    $.ajax({
      url: itemUrl,
      context: document.body
    }).done(function(html) {
      overlay.append(html).fadeIn("200").addClass("active");
      $('body').addClass("overlay-open");
    });
    event.preventDefault();
  })

  function overlaySize() {
    var windowHeight = $(window).height();
    $(".about-overlay").height(windowHeight - 20);
  }

  // Project Prev/Next
  $(".overlay").on( "click", ".pagination a", function() {
    overlayDark.fadeIn(200);
    var itemUrl = $(this).attr("href");
    $.ajax({
      url: itemUrl,
      context: document.body
    }).done(function(html) {
      overlay.empty().append(html);
    });
    overlayDark.delay(200).fadeOut(200);

    event.preventDefault()
  });

  // click link
  // project fades to black
  // new project is loaded
  // Project overl fades back in

}); //eo:jQuery

// Remove Inline Styles on re-size
$( window ).resize(function() {
  $("header").children().removeAttr( "style" );
});