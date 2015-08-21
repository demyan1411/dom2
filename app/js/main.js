
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

var tooltips = (function() {
		var valid = false;
		var start = function() {
				_setUpListeners();
			},
			_setUpListeners = function() {
				$('form')
					.on('submit', _checkForm) // $(this) = form
					.on('keydown', '.error, .success', _removeValidator)
					.on('change', '#upload', _checkForm); // $(this) = input#upload
				//$('#add_new_project').on('submit', _validateProjectPhp);
			},
			_checkForm = function(e) {
				ie8SafePreventEvent(e);

				var $thisCheck = $(this);

				_validateForm($thisCheck);
				_addTooltips($thisCheck);

				_resetAll();

				if(_validateForm($thisCheck) && $thisCheck.is('form')) {
					addPproject.init();
					popup.close();
				}
			},
			_validateProjectPhp = function($thisCheck) {

				//if(valid === false) return false;

				var form = $thisCheck,
					url =  'add_project.php',
					serverAnswer = _ajaxForm(form, url);

				serverAnswer.done(function(ans) {
					var formSuccess = form.find('.success_mes'),
						formError = form.find('.error_mes');
					if(ans.status === 'OK') {
						formError.hide();
						//popup.close();
						//formSuccess.text(ans.text).show();
					} else {
						formSuccess.hide();
						formError.text(ans.text).show();
					};
				});
			},
			_ajaxForm = function(form, url) {

				//if(!valid) return false;

				var data = form.serialize();

				var result =  $.ajax({
					url: url,
					type: 'POST',
					dataType: 'json',
					data: data,
				})
				.fail(function(ans) {
					console.log('проблемы PHP');
					form.find('.error_mes').text('на сервере ошибка').show();
				});

				return result;

			},
			_validateForm = function($thisCheck) {
				var inputs;
				valid = true;

				if($thisCheck.is('form')) {
					inputs = $('form').find('input, textarea');
				} else {
					inputs = $('#upload');
				};
				//console.log($thisCheck);
				$.each(inputs, function() {
					var input = $(this),
						val = input.val();

					if(val === ""){
						input.addClass('error').removeClass('success');
						input.siblings('#fileformlabel').addClass('error').removeClass('success');
						valid = false;
						_validateProjectPhp($thisCheck);
					} else {
						input.removeClass('error').addClass('success');
						input.siblings('#fileformlabel').removeClass('error').addClass('success');
						input.siblings('.tooltip').remove();
					}
				});

				$('.fileform').css({
					'border' : 'none'
				});

				return valid;
			},

			_removeValidator = function() {
				var validator = $(this);
				validator.removeClass('error').removeClass('success');
				validator.siblings('.tooltip').remove();

			},
			_addTooltips = function($thisCheck) {
				var inputs = $('form').find('input, textarea');

				$.each(inputs, function() {

					var input = $(this),
						tooltipText = input.data('tooltip');

					if(input.hasClass('error')) {
						input.siblings('.tooltip').remove();
						input.closest('.label').append('<div class="tooltip">' + tooltipText + '</div>');

						var tooltipThis = input.siblings('.tooltip'),
							tooltipWidth = tooltipThis.width(),
							tooltipHeight = tooltipThis.height(),
							tooltipPlace = input.data('place');

						tooltipThis.css({
							'width' : tooltipWidth + 5 + 'px',
							'margin-top' : -(tooltipHeight + 12) / 2 + 'px'
						});

						if(tooltipPlace === 'right') {
							tooltipThis
								.css({
									'right' : -tooltipWidth - 35 + 'px',
								})
								.addClass('tooltip_right');

						} else {
							tooltipThis.css({
								'left' : -tooltipWidth - 35 + 'px',
							});
						}
					}

				});
			},
			_resetAll = function() {
				$('[type="reset"]').on('click', function() {
					$('.tooltip').hide();
					$('input, textarea, #fileformlabel').removeClass('error').removeClass('success');
				});
			}

		return {
			init: function() {
				start();

			}
		}
	})();
