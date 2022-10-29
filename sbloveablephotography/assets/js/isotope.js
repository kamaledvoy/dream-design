$(document).ready(function () {
  "use strict";

  var $portfoliogrid = $(".portfolio-grid .isotope");
  $portfoliogrid.isotope({
    itemSelector: ".item",
    transitionDuration: "0.7s",
    percentPosition: true,
  });
  $(".portfolio-grid .isotope-filter").on("click", ".button", function () {
    var filterValue = $(this).attr("data-filter");
    $portfoliogrid.isotope({
      filter: filterValue,
    });
  });
  $(".portfolio-grid .button-group").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", ".button", function () {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });
  $portfoliogrid.imagesLoaded(function () {
    $portfoliogrid.isotope("layout");
  });
});
