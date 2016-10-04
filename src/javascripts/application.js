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
    });
  })


  // About Open
  // --------------------------------------------------------
  $about.click(function(e){
    e.preventDefault();
    $.ajax({
      url: "about.html",
      context: document.body
    }).done(function(html) {
      $overlay.append(html).fadeIn("200").addClass("active");
      $body.addClass("overlay-open");
      overlaySize();
    });
  })

  // Overlay Close
  // --------------------------------------------------------
  $overlay.on( "click", ".close", function(e) {
    e.preventDefault();
    $overlay.fadeOut("200", function(){
      $(this).empty().removeClass("active").removeAttr( "style" );
      $body.removeAttr( "style" ).removeClass("overlay-open");
    });
  });


  // Project Open
  // --------------------------------------------------------
  $item.click(function(e){
    e.preventDefault();
    var itemUrl = $(this).attr("href");
    $.ajax({
      url: itemUrl,
      context: document.body
    }).done(function(html) {
      $overlay.append(html).fadeIn("200").addClass("active");
      $body.addClass("overlay-open");
    });
    
  })

  function overlaySize() {
    var windowHeight = $(window).height();
    $(".about-overlay").height(windowHeight - 20);
  }

  // Project Prev/Next
  // --------------------------------------------------------
  $overlay.on( "click", ".pagination a", function(e) {
     e.preventDefault();
    $overlayDark.fadeIn(200);
    var itemUrl = $(this).attr("href");
    $.ajax({
      url: itemUrl,
      context: document.body
    }).done(function(html) {
      $overlay.empty().append(html);
    });
    $overlayDark.delay(200).fadeOut(200);
  });

}); //eo:jQuery


// Remove Inline Styles on re-size
$( window ).resize(function() {
  $("header").children().removeAttr( "style" );
});