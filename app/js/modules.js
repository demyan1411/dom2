
// var tooltip = (function() {

// 	var init = function() {
// 			_setUpListeners();
// 			// то, что должно произойти сразу
// 		},
// 		_setUpListeners = function() {
// 			// прослушка событий

// 		};

// 		return {
// 			init: init
// 		};

// })();





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
//Tooltips && Validator



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
				$(this).next('.scroller').slideToggle(200);
				$(this).next('.scroller').addClass('scrollerActive');
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
				$(this).closest('.scroller').siblings('.form__selectValue').text(val);
			});
		},
		_resetSelect = function() {
			$('[type=reset]').on('click', function() {
				$('.form__selectValue').text('01');
			});
		}

	return {
        init: start()
	}

}());

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