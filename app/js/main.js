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

    $('form').on('submit', function(e) {
        e.preventDefault();

        $('.form__input').each(function() {
            $(this).tooltip({
                position: 'right',
                content: 'qweqwe'
            });
        });


    });
});

 $.fn.tooltip = function(options) {
    options = {
        position: options.position || 'right',
        content : options.content || 'Tooltip',
    };

    var markup = '<div class="tooltip tooltip_' + options.position + '">' +
                    '<div class="tooltip__inner">' + options.content + '</div>' +
                 '</div>';

    var $this = this,
        body = $('body');

    body.append(markup);

    _positionIt($this, body.find('.tooltip').last(), options.position);

    function _positionIt(elem, tooltip, position) {

        var elemWidth = elem.outerWidth(true),
            elemHeight = elem.outerHeight(true),
            topEdge = elem.offset().top,
            bottomEdge = topEdge + elemHeight,
            leftEdge = elem.offset().left,
            rightEdge = leftEdge + elemWidth;

        var tooltipWidth = tooltip.outerWidth(true),
            tooltipHeight = tooltip.outerHeight(true),
            leftCentered = (elemWidth / 2) - (tooltipWidth / 2),
            topCentered = (elemHeight / 2) - (tooltipHeight / 2);

        var positions = {};

        switch(position) {
            case 'right' :
                positions = {
                    left: rightEdge,
                    top: topEdge + topCentered
                };
                break;
            case 'top' :
                positions = {
                    left: leftEdge + leftCentered,
                    top: topEdge - tooltipHeight
                };
                break;
            case 'bottom' :
                positions = {
                    left: leftEdge + leftCentered,
                    top: bottomEdge
                };
                break;
            case 'left' :
                positions = {
                    left: leftEdge - tooltipWidth,
                    top: topEdge + topCentered
                };
                break;
        }

        tooltip
            .offset(positions)
            .css({
                'opacity': 1
            });


    }

};
