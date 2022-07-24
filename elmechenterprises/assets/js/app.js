//right click disabled
document.addEventListener(
  "contextmenu",
  function (event) {
    event.preventDefault();
    //alert('elmech enterpricess');
  },
  false
);

//preloader
window.onload = function () {
  setTimeout(function () {
    document.querySelector(".loader").style.display = "none";
  }, 500);
};

function counter() {
  var count = setInterval(function () {
    var c = parseInt($(".counter").text());
    $(".counter").text((++c).toString());
    if (c == 100) {
      clearInterval(count);
      $(".counter").addClass("counterhide");
    }
  }, 100);
}
counter();

//header
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

//bottom to top
window.addEventListener("scroll", function () {
  var scroll = document.querySelector(".scrollTop");
  scroll.classList.toggle("active", window.scrollY > 500);
});
function scrollToTop() {
  window.scroll({
    top: 0,
    behaviour: "smooth",
  });
}

$(document).ready(function () {
  $(".menu-button").on("click", function () {
    $(".menu-button .line:nth-of-type(1)").toggleClass("line-1");
    $(".menu-button .line:nth-of-type(2)").toggleClass("line-2");
    $(".menu-button .line:nth-of-type(3)").toggleClass("line-3");
    $(data - target).toggleClass("show");
    return false;
  });

  $(".productslide").owlCarousel({
    loop: false,
    margin: 30,
    dots: false,
    nav: true,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    autoplay: true,
    autoplayHoverPause: true,
    autoHeight: false,
    autoWidth: false,
    lazyEffect: "fade",
    lazyLoad: true,
    rewind: false,
    rewindNav: false,
    fallbackEasing: "swing",
    rtl: false,
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    responsiveClass: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        margin: 10,
        stagePadding: 8,
        nav: true,
      },
      768: {
        items: 2,
        margin: 10,
        stagePadding: 8,
        nav: true,
      },
      1000: {
        items: 3,
        margin: 28,
        stagePadding: 8,
      },

      1280: {
        items: 3,
        margin: 20,
        stagePadding: 8,
      },
    },
  });

  $(".bananaslide").owlCarousel({
    loop: false,
    margin: 30,
    dots: false,
    nav: true,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    autoplay: true,
    autoplayHoverPause: true,
    autoHeight: false,
    autoWidth: false,
    lazyEffect: "fade",
    lazyLoad: true,
    rewind: false,
    rewindNav: false,
    fallbackEasing: "swing",
    rtl: false,
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    responsiveClass: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        margin: 25,
        stagePadding: 8,
        nav: true,
      },
      768: {
        items: 2,
        margin: 25,
        stagePadding: 8,
        nav: true,
      },
      1000: {
        items: 3,
        margin: 28,
        stagePadding: 8,
      },

      1280: {
        items: 3,
        margin: 20,
        stagePadding: 8,
      },
    },
  });

  $(".serviceslide").owlCarousel({
    loop: false,
    margin: 30,
    dots: false,
    nav: true,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    autoplay: true,
    autoplayHoverPause: true,
    autoHeight: false,
    autoWidth: false,
    lazyEffect: "fade",
    lazyLoad: true,
    rewind: false,
    rewindNav: false,
    fallbackEasing: "swing",
    rtl: false,
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    responsiveClass: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      768: {
        items: 2,
        margin: 10,
        stagePadding: 8,
        nav: true,
      },
      1000: {
        items: 3,
      },
    },
  });

  $(".teamSider").owlCarousel({
    loop: false,
    margin: 30,
    dots: false,
    nav: true,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    autoplay: true,
    autoplayHoverPause: true,
    autoHeight: false,
    autoWidth: false,
    lazyEffect: "fade",
    lazyLoad: true,
    rewind: false,
    rewindNav: false,
    fallbackEasing: "swing",
    rtl: false,
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    responsiveClass: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        margin: 25,
        stagePadding: 8,
        nav: true,
      },
      600: {
        items: 1,
        margin: 10,
        stagePadding: 8,
      },
      1000: {
        items: 1,
        margin: 10,
        stagePadding: 8,
      },
    },
  });
});

//wow
wow = new WOW({
  boxClass: "wow", // default
  animateClass: "animated", // default
  offset: 0, // default
  mobile: true, // default
  live: true, // default
});
wow.init();
