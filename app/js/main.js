 $(document).ready(function() {

 	"use strict";

 	var divider = 29;
 	var maxPos = $(document).height() - $('.footer').outerHeight() - 19;

    $(window).scroll(function() {
    	var btnUp = $('.button_up'),
        	curPos = $(window).scrollTop() + $(window).height();
        if (curPos > maxPos) {
            btnUp.css('bottom', curPos - maxPos + divider -19);
        } else {
            btnUp.css('bottom', 10);
        }
        if ($(this).scrollTop()) {
        	btnUp.fadeIn();
        } else {
        	btnUp.fadeOut();
        }

    });

 	$('.button_up').on('click', function() {
 		$('html, body').animate({scrollTop: 0}, 300);
 	});

//Запуск модулей


	if($('.scroller').length) {
	    scroller.init;
    }

    if($('.form__selectValue').length) {
	    select.init;
    }

    if($('.slider').length) {
	    slider.init;
    }

});