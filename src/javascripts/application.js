// Start jQuery
$( document ).ready(function() {

var $body = $('body'),
    $container = $('.main-content'),
    $filters = $('header ul li'),
    $filterMenu = $('header ul'),
    $links = $('.filter, .about, .email'),
    $filter = $('.filter'),
    $about = $('.about'),
    $overlay = $(".overlay"),
    $overlayDark = $(".overlay-dark"),
    $item = $(".item");

  
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


  // $body.click(function(e){
  //   e.preventDefault();
  //   if($(this).hasClass("filter-open")){
  //     $body.removeClass("filter-open");
  //     $filterMenu.fadeOut(200, function(){
  //       $links.delay(100).fadeIn("200");
  //     });
  //   }
  // })


// Fancybox
  $(".item, .about").fancybox({
    type       : 'ajax',
    closeBtn   : false,
    closeClick : false,
    nextEffect : 'fade',
    prevEffect : 'fade',
    fitToView  : false,
    autoSize   : false,
    width      : '100%',
    height     : '100%',
    padding    : 0,
    margin     : 0,
    arrows     : false,
    nextMethod : 'fade',
    prevMethod : 'fade',
  });

  // Close
  $body.on( "click", ".close", function(e) {
    e.preventDefault();
    jQuery.fancybox.close();
  });


  // Next
  $body.on( "click", ".next", function(e) {
    e.preventDefault();
    jQuery.fancybox.next();
  });

  // Prev
  $body.on( "click", ".prev", function(e) {
    e.preventDefault();
    jQuery.fancybox.prev();
  });

}); //eo:jQuery


// Remove Inline Styles on re-size
$( window ).resize(function() {
  $("header").children().removeAttr( "style" );
});