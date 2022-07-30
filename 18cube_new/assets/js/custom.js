//datepicker set date
$('.datepick').each(function(){			
var year = (new Date).getFullYear();
	$(this).datepicker({
		format: 'yyyy-mm-dd',
		weekStart: 1,
		daysOfWeekHighlighted: "6,0",
		autoclose: true,
		todayHighlight: true
	});
});
//$('.datepick').datepicker("setDate", new Date());

//aos
AOS.init({
		 offset:200,
		 duration: 1000,
		}); //animate
	    $(document).ready(function () {
            $(document).click(function (event) {
                $('.navbar-collapse').collapse('hide');
            });
        });






/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});
/*Scroll to top when arrow up clicked END*/
	
	
/* page reload to top */
		addEventListener("load", function () {
				setTimeout(hideURLbar, 0);
			}, false);
			function hideURLbar() {
				window.scrollTo(0, 1);
			}
/* page reload to top */


//nav bar scrooll to top fixed
$(document).ready(function() {
		  $(window).scroll(function () {
			  //if you hard code, then use console
			  //.log to determine when you want the 
			  //nav bar to stick.  
			  //console.log($(window).scrollTop())
			if ($(window).scrollTop() > 280) {
			  $('#nav_bar').addClass('navbar-fixed');
			}
			if ($(window).scrollTop() < 281) {
			  $('#nav_bar').removeClass('navbar-fixed');
			}
		  });
		});
//nav bar scrooll to top fixed


//div Click
$(document).on('click', '.menubar','a[href^="#"]', function(e) {
	var id = $(this).attr('href');		   
	var $id = $(id);
	if ($id.length === 0) {
		return;
	}		   
	e.preventDefault();		   
	var pos = $id.offset().top -120; // 150 this is top margin		   
	$('body, html').animate({scrollTop: pos}, 1500);
});
     
// register form  button show
$(document).ready(function(){
	$("#register").click(function(){
		$("#showform").slideDown("slow");	
		$(this).closest('button').remove();
	});	
});

//gallery filter 
		$(document).ready(function(){
			$(".filter-button").click(function(){
				var value = $(this).attr('data-filter');				
				if(value == "all")
				{
					//$('.filter').removeClass('hidden');
					$('.filter').show('1000');
				}
				else
				{
		// $('.filter[filter-item="'+value+'"]').removeClass('hidden');
		// $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
					$(".filter").not('.'+value).hide('3000');
					$('.filter').filter('.'+value).show('3000');
					
				}
			});			
			if ($(".filter-button").removeClass("active")) {
				$(this).removeClass("active");
				}
				$(this).addClass("active");
			});

		//slick slider 
		$(document).ready(function(){
			$('.service_scroll').slick({
				slidesToShow: 3,
				slidesToScroll:1,
				autoplay: true,
				autoplaySpeed: 2500,
				arrows: true,
				dots: false,
					pauseOnHover: false,
					responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 2
					}
				}, {
					breakpoint: 520,
					settings: {
						slidesToShow: 1
					}
				}]
			});			
		});
		
		//Sevice Image 
		$(document).ready(function(){
			$('.event_list').slick({
				slidesToShow: 1,
				slidesToScroll:1,
				autoplay: true,
				autoplaySpeed: 3000,
				arrows: false,
				dots: false,
					pauseOnHover: false,
					responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 1
					}
				}, {
					breakpoint: 520,
					settings: {
						slidesToShow: 1
					}
				}]
			});			
		});
		
		

		//camera slider
		jQuery(function(){
			jQuery('#camera_wrap_3').camera({
				height: '60%',
				transPeriod: 2000,
				time: 2000,
				loader: 'bar',
				loaderColor:"#1CCDCA",
				loaderBgColor:"none",
				loaderOpacity: 1,
				loaderPadding:0,
				loaderStroke:5,
				//loader: false,
				pagination: false,
				thumbnails: false,
				hover: false,
				playPause: false,
				opacityOnGrid: false,							
				imagePath: 'assets/images/slider/',				
				alignment:'center',
				autoAdvance:true,
				easing:'easeInOutExpo', 
				mobileEasing:'',
				mobileAutoAdvance:true,
				fx:'random',
				mobileFx:'',
				gridDifference: 250, 
				hover:false,
				portrait:false,
			});
		});
		
	
		
		
// css animateClass 	
wow = new WOW({
        animateClass: 'animated',
        offset:       100,
        callback:     function(box) {
          console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
      });
    wow.init();
    /* document.getElementById('moar').onclick = function() {
      var section = document.createElement('section');
      section.className = 'section--purple wow fadeInDown';
      this.parentNode.insertBefore(section, this);
    }; */
// css animateClass 
