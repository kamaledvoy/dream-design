//gallery grid
$(document).ready(function (){
    $('.button').on('click', function(){
      $(".button .line:nth-of-type(1)").toggleClass("line-1");
      $(".button .line:nth-of-type(2)").toggleClass("line-2");
      $(".button .line:nth-of-type(3)").toggleClass("line-3");
      $(data-target).toggleClass("show");
      return false;
  });
  $('.grid').packery({
    itemSelector: '.grid-item',
    gutter: 10, 
    percentPosition: true,    
  });

  //gallery 
  $(".fancybox").fancybox({
    openEffect: "none",
    closeEffect: "none"
  });
});

$(document).ready(function(){
    $('.serviceslide').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        navText : ["<i class='fa fa-angle-left fa-lg'></i>","<i class='fa fa-angle-right fa-lg'></i>"],
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 1500,
        smartSpeed: 500,
        autoHeight: false,
        autoWidth: false, 
        lazyEffect: "fade",
        lazyLoad: true,
        rewind: false,
        rewindNav:false,
        fallbackEasing: 'swing', 
        rtl: false,     
        refreshClass: 'owl-refresh',
        loadedClass: 'owl-loaded',
        loadingClass: 'owl-loading',
        transitionStyle: "fade",
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        responsiveClass: true,          
        responsive: {
          0: {
            items: 1,
            margin: 0,
            stagePadding: 0,
            nav: false,
          },
          768: {
            items: 3,
            margin: 0,
            stagePadding: 0,
            nav: false
          },
          1000: {
            items: 2, 
            margin: 0,
            stagePadding: 0,             
          },
                 
          1280: {
            items: 2, 
            margin: 0,
            stagePadding: 0,             
          }        
        }
      });        
});


