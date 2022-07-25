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

// hero slider
/*const $slides = $(".owl-carousel .owl-slide");
$slides.css("height", $(window).height());
$(window).resize(() => {
  $slides.css("height", $(window).height());
});*/

$(".mainslider").on("initialized.owl.carousel", () => {
  setTimeout(() => {
    $(".owl-item.active .owl-slide-animated").addClass("is-transitioned");
    $("section").show();
  }, 200);
});

const $owlCarousel = $(".mainslider").owlCarousel({
  items: 1,
  loop: true,
  nav: true,
  navText: [
    '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>' /* icons from https://iconmonstr.com */,
  ],
});

$owlCarousel.on("changed.owl.carousel", (e) => {
  $(".owl-slide-animated").removeClass("is-transitioned");

  const $currentOwlItem = $(".owl-item").eq(e.item.index);
  $currentOwlItem.find(".owl-slide-animated").addClass("is-transitioned");

  const $target = $currentOwlItem.find(".owl-slide-text");
  doDotsCalculations($target);
});

$owlCarousel.on("resize.owl.carousel", () => {
  setTimeout(() => {
    setOwlDotsPosition();
  }, 50);
});

/*if there isn't content underneath the carousel*/
//$owlCarousel.trigger("refresh.owl.carousel");

setOwlDotsPosition();

function setOwlDotsPosition() {
  const $target = $(".owl-item.active .owl-slide-text");
  doDotsCalculations($target);
}

function doDotsCalculations(el) {
  const height = el.height();
  const { top, left } = el.position();
  const res = height + top + 20;

  $(".owl-carousel .owl-dots").css({
    top: `${res}px`,
    left: `${left}px`,
  });
}

//wow
wow = new WOW({
  boxClass: "wow", // default
  animateClass: "animated", // default
  offset: 0, // default
  mobile: true, // default
  live: true, // default
});
wow.init();
