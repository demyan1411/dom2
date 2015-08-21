
 $(document).ready(function() {

 	"use strict";


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

  if($('.button_up').length) {
    upBtn.init;
  }
var tooltipNumber = 0;
    $('form').on('submit', function(e) {
        e.preventDefault();

        $('.form__input').each(function() {
            $(this).tooltip({
                position: 'left',
                content: 'qweqwe'
            });

        });


    });
});

//////////////////////

 $.fn.tooltip = function(options) {
    options = {
        position: options.position || 'right',
        content : options.content || 'Tooltip',
    };

    var markup = '<div class="tooltip tooltip_' + options.position + '">' +
                    '<div class="tooltip__inner">' + options.content + '</div>' +
                 '</div>';

    var $this = this,
        body = $('body'),
        elemLength = $('.tooltipstered').length;
    var thisElemNumber;



    if(!$this.is("[data-elem-number]")) {
      $this.attr('data-elem-number', elemLength);
    }


    if(!$this.hasClass('tooltipstered')) {
      thisElemNumber = $this.data('elem-number');
      $this
        .addClass('tooltipstered')
        .attr('data-tooltip-position', options.position);
        body.append(markup);
        _positionIt($this, body.find('.tooltip').last(), options.position);

    }

    $this.on('click', function() {
    	$('[data-tooltip-number = ' + thisElemNumber +']').remove();
      $this.removeClass('tooltipstered');
    });


      // function _resetElem(elem) {
      //   elem.removeAttr('data-tooltip-number');
      //   $('.tooltip').remove();
      // }






    // var tooltips = $('.tooltip'),
    // 	tooltipsArray = [],
    // 	tooltipstered = $('.tooltipstered'),
    // 	tooltipsteredArray = [],
    // 	tooltipNumber = 0,
    // 	elemNumber = 0;
    //
    // tooltips.each(function() {
    // 	$(this).attr('data-tooltip-number', tooltipNumber)
  	// 	tooltipNumber++;
  	// 	tooltipsArray.push($(this));
  	// });
    //
  	// tooltipstered.each(function() {
  	// 	$(this).attr('data-elem-number', elemNumber)
  	// 	elemNumber++;
  	// 	tooltipsteredArray.push($(this));
    // });



    // $(window).resize(function() {
    //
    // 	tooltipstered.each(function(index) {
    // 		var position = $(this).data('tooltip-position');
    // 		_positionIt($(this), tooltipsArray[index], position);
    // 	});
    // });


    function _positionIt(elem, tooltip, position) {
        if(!tooltip.is("[data-tooltip-number]")) {
          console.log(thisElemNumber);
          tooltip.attr('data-tooltip-number', thisElemNumber);
        }

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
