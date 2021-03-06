// Start jQuery
$( document ).ready(function() {

var $body = $('body'),
    $container = $('.main-content'),
    $filters = $('header ul li'),
    $filterMenu = $('header ul'),
    $links = $('.filter, .about, a.email'),
    $filter = $('.filter'),
    $about = $('.about'),
    $overlayDark = $(".overlay-dark"),
    $item = $(".item"),
    $header = $("header");

  
  // Initialize Isotope
  // --------------------------------------------------------
  $container.isotope({
    itemSelector: '.item',
    layoutMode: 'masonry',
    transitionDuration: '0.2s',
    isResizeBound: true,
    masonry: {
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer'
    }
  });

  // layout Isotope after each image loads
  $container.imagesLoaded().progress( function() {
    $container.find('a').addClass("loaded");
    $container.isotope('layout');
  });


  // Filter items on button click
  // --------------------------------------------------------
  $filters.on( 'click', 'a', function(e) {
    e.preventDefault();
    var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
    $(this).addClass("active").parent("li").siblings("li").children("a").removeClass("active");
    if( $(window).width() < 1024 ) {
      $filterMenu.fadeOut(200, function(){
        $links.delay(100).fadeIn("200");
      });
    }
  });

  // Tablet Scroll 
  // --------------------------------------------------------
  if( $(window).width() > 767 && $(window).width() < 1024 ) {
    $(window).scroll(function(){
      if($filterMenu.is(":visible")) {
        $filterMenu.fadeOut(200, function(){
          $links.delay(100).fadeIn("200");
        });  
      }
     })
  }

  // Filter Button
  // --------------------------------------------------------
  $filter.click(function(e){
    e.preventDefault();
    $links.fadeOut(200, function(){
      $filterMenu.delay(100).fadeIn("200");
      $body.addClass("filter-open");
    });
  })

  // Fancybox
  // --------------------------------------------------------

  $(".item").fancybox({
    closeBtn      : false,
    closeClick    : false,
    fitToView     : false,
    autoSize      : false,
    arrows        : false,
    scrollOutside : false,
    type          : 'ajax',
    nextEffect    : 'fade',
    prevEffect    : 'fade',
    width         : '100%',
    height        : '100%',
    padding       : 0,
    margin        : 0,
    helpers: {
      overlay: {
        locked: true 
      }
    }
  });

  // About
  $(".about").fancybox({
    closeBtn      : false,
    closeClick    : false,
    fitToView     : false,
    autoSize      : false,
    arrows        : false,
    scrollOutside : false,
    type          : 'inline',
    nextEffect    : 'fade',
    prevEffect    : 'fade',
    width         : '100%',
    height        : '100%',
    padding       : 0,
    margin        : 0,
    helpers: {
      overlay: {
        locked: true 
      }
    }
  });



  // Close
  $body.on( "click", ".close", function(e) {
    e.preventDefault();
    jQuery.fancybox.close();
  });

  // Next
  $body.on( "click", ".next", function(e) {
    e.preventDefault();
    $overlayDark.fadeIn(200, function(){
      $.fancybox.next();
      setTimeout(function(){ $overlayDark.fadeOut(200); }, 500);
    });
  });

  // Prev
  $body.on( "click", ".prev", function(e) {
    e.preventDefault();
    $overlayDark.fadeIn(200, function(){
      $.fancybox.prev();
      setTimeout(function(){ $overlayDark.fadeOut(200); }, 500);
    });
  });

}); //eo:jQuery


// Remove Inline Styles on re-size
$( window ).resize(function() {
  $header.children().removeAttr( "style" );
});