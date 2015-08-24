//******* ie8 preventDefault
	function ie8SafePreventEvent(e) {
	    if (e.preventDefault) {
	        e.preventDefault()
	    } else {
	        e.stop()
	    };

	    e.returnValue = false;
	    e.stopPropagation();
	}


	// button to top

var upBtn = (function() {
	var divider = 29;
	var maxPos = $(document).height() - $('.footer').outerHeight() - 19;

	var start = function() {
		_setUpListeners();
	},
	_setUpListeners = function() {
		_upToTop();
		_scrollWindow();
	},
	_upToTop = function () {
		$('.button_up').on('click', function() {
			$('html, body').animate({scrollTop: 0}, 300);
		});
	},
	_scrollWindow = function () {
		$(window).scroll(function() {
			var btnUp = $('.button_up'),
					curPos = $(window).scrollTop() + $(window).height();
				if (curPos > maxPos) {
						btnUp.css('bottom', curPos - maxPos + divider -19);
				} else {
						btnUp.css('bottom', 10);
				}
				if ($(this).scrollTop()) {
					btnUp.addClass('button_up_active');
				} else {
					btnUp.removeClass('button_up_active');
				}
		});
	}

	return {
				init: start()
	}

}());

// select

var select = (function() {

	var start = function() {
			_setUpListeners();

		},
		_setUpListeners = function() {
			_showSelect();
			_closeSelect();
			_insertValue();
			_resetSelect();
		},
		_showSelect = function() {
			$('.form__selectValue').on('click', function() {
				var $scroller = $(this).next('.scroller');
				$scroller.slideToggle(200);
				$scroller.addClass('scrollerActive');
			});
		},
		_closeSelect = function() {
			$(document).mouseup(function (e){
				var div = $(".scrollerActive");
				if (!div.is(e.target)
					&& !div.siblings('.form__selectValue').is(e.target)) {
					div.slideUp(200);

				}
				$('.scroller').removeClass('scrollerActive');
			});
		},
		_insertValue = function() {
			$('.scroller__option').on('click', function() {
				var val = $(this).text();
				$(this).closest('.scroller').siblings('.form__selectValue').text(val).addClass('form__selectValue_active');
			});
		},
		_resetSelect = function() {
			$('[type=reset]').on('click', function() {
				$('.form__selectValue').text('01').removeClass('form__selectValue_active');
			});
		}

	return {
        init: start()
	}

}());

// scroller

var scroller = (function() {

	var start = function() {
			_setUpListeners();
		},
		_setUpListeners = function() {
			baron({
		        root: '.scroller',
		        scroller: '.scroller__contetnt',
		        bar: '.scroller__bar',
		        barOnCls: 'baron'
		    });
		}

	return {
        init: start()
	}

}());

// slider

var slider = (function() {
	var prevNext,
		check = true,
		nextSlide = 'first',
		prevSlide = 'last',
		width = 740,
		next = $('.slider__slideActive').next(),
		startCycle;

	var start = function() {
			_setUpListeners();
		},
		_setUpListeners = function() {
			$('.slider__btn').on('click', function() {

				if(check === true) {
					check = false;
					prevNext = $(this).attr('class').substr(24);
					_nextSlide();

				}
			});
			_cycleSlider();
			_sliderStop();

		},
		_cycleSlider = function() {
			startCycle = setInterval(function () {
				nextSlide = 'first';
				prevSlide = 'last';
				width = 740;
				next = $('.slider__slideActive').next();
	            _animateSlide();
	        }, 3000);
		},
		_sliderStop = function() {
			$('.slider').mouseenter(function() {
				clearInterval(startCycle);
			}).mouseleave(function() {
				_cycleSlider();
			});

		},
		_nextSlide = function() {
			if(prevNext === 'next') {
				nextSlide = 'first';
				prevSlide = 'last';
				width = 740;
				next = $('.slider__slideActive').next();

				_animateSlide();
			}
			if(prevNext === 'prev') {
				nextSlide = 'last';
				prevSlide = 'first';
				width = -740;
				next = $('.slider__slideActive').prev();

				_animateSlide();
			}
		},
		_animateSlide = function() {
			if($('.slider__slide:' + prevSlide).hasClass('slider__slideActive')) {
				next = $('.slider__slide:' + nextSlide);
			}

			$('.slider__slideActive').animate({
				left: -width
			}, 1000);
			next.css({
				'left': width + 'px',
				'z-index': 2
			}).animate({left : 0}, 1000, function() {

				$('.slider__slide').removeClass('slider__slideActive');
				next.addClass('slider__slideActive');
				check = true;
			});

		}

	return {
        init: start()
	}

}());

// Popups

var Popups = (function(){
	var	popups = $('.popup');

  var start = function() {
    _setUpListeners();
  },
  _setUpListeners = function() {
    $('.popup__close, .popup__overlay').on('click', function(e){
      e.preventDefault();
      _close()
    });
  },
  _close = 	function() {
		popups.fadeOut(300);
	}

	return {
    init: start(),

		open: function(id) {
			var	reqPopup = popups.filter(id);

			reqPopup.fadeIn(300);
		}
	}
}());

// Отправка почты

function postFormData(form, successCallback) {
  var host = form.attr('action'),
      reqFields = form.find('[name]'),
      dataObject = {};

      if(!host) {
        console.log('set action attribute to your form, you fool!!');
      }

      reqFields.each(function() {
        var $this = $(this),
            value = $this.val(),
            name = $this.attr('name');

        dataObject[name] = value;
      });

      $.post(host, dataObject, successCallback);
}

// Плагин для tooltips

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

    $this.on('mousedown', function() {
    	$('[data-tooltip-number = ' + thisElemNumber +']').remove();
      $this.removeClass('tooltipstered').removeClass('error');
    });

    $('[type="reset"]').on('click', function() {
      $('[data-elem-number]').removeClass('tooltipstered').removeClass('error');
      $('[data-tooltip-number]').remove();
    });
    
    $(window).resize(function() {
    	$('.tooltipstered').each(function() {
    		var position = $(this).data('tooltip-position'),
            resizedTooltipNumber = $(this).data('elem-number'),
            resizedTooltip = $('[data-tooltip-number = ' + resizedTooltipNumber +']');
    		_positionIt($(this), resizedTooltip, position);
    	});
    });

    function _positionIt(elem, tooltip, position) {
        if(!tooltip.is("[data-tooltip-number]")) {
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

// Валидатор

function validateThis(form) {
  var textType = form.find('[data-validation="text"]'),
      mailType = form.find('[data-validation="mail"]'),
      phoneType = form.find('[data-validation="phone"]');

  textType.each(function() {
    var $this = $(this),
        emptyField = $this.val();

    if(emptyField === '') {
      $this.tooltip({
        content: 'Заполните поле',
        position: 'left'
      });
      $this.addClass('error');
    } else {
      $this.removeClass('error')
    }
  });

  mailType.each(function() {
    var $this = $(this),
        regExp = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
        isMail = regExp.test($this.val());

    if(!isMail) {
      $this.tooltip({
        content: 'Заполните поле',
        position: 'bottom'
      });
      $this.addClass('error');
    } else {
      $this.removeClass('error')
    }
  });

  phoneType.each(function() {
    var $this = $(this),
        regExp = /[0-9]/,
        isphone = regExp.test($this.val());

    if(!isphone) {
      $this.tooltip({
        content: 'Заполните поле',
        position: 'right'
      });
      $this.addClass('error');
    } else {
      $this.removeClass('error')
    }
  });

  return form.find('.error').length === 0;
}
