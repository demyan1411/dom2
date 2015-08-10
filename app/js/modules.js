// input[type="file"] - вывод названия картинки

	var getNameForImg = (function() {

		var _fieldForName,
			change = function(id) {
				_fieldForName = $('#' + id).siblings('span').attr('id');
				$('#' + id).on('change', function() {
					_getName($(this).val());
					//console.log($(this));
				});
			},
			_getName = function(str) {
			    if (str.lastIndexOf('\\')){
			        var i = str.lastIndexOf('\\')+1;
			    }
			    else{
			        var i = str.lastIndexOf('/')+1;
			    }
			    var filename = str.slice(i);
			    var uploaded = $('#' + _fieldForName);
			    uploaded.text(filename);
			}

		return {
	        init: function(id) {
	            change(id);
	        }
		}

	}());

//*****
// Popup



	//addPproject.init;

	var popup = (function() {

		var start = function(buttonClass) {
				_setUpListeners(buttonClass);
			},
			_setUpListeners = function(buttonClass) {
				_centerPopup();
				_showPopup(buttonClass);

				$('.popup_overlay, .popup_close').on('click', popup.close);
			},
			_centerPopup = function() {
				var popupHeight = $('.popup').innerHeight(),
					popupWidth = $('.popup').width();

				$('.popup').css({
					'margin-top' : (- popupHeight / 2) + 'px',
					'margin-left' : (- popupWidth / 2) + 'px'
				});
			},
			_showPopup = function(buttonClass) {
				$('.' + buttonClass).on('click', function(e) {
					ie8SafePreventEvent(e);
					$('.popup_overlay').fadeIn(800);
					$('.popup').addClass('active_popup');
					//$('#upload').siblings('#fileformlabel');
				});
			},
			closePopup = function() {
				$('.popup_overlay').fadeOut(800);
			 	$('.popup').removeClass('active_popup');
			 	_clearPopup();
			},
			_clearPopup = function() {
				$('.tooltip, .server_mes').hide();
				$('input, textarea, #fileformlabel').removeClass('error').removeClass('success');
				$('.fileform').css({
					'border' : '1px solid #48cbe8'
				});
				$('#upload').siblings('#fileformlabel').text('');
				var inputs = $('form').find('input, textarea');
				$.each(inputs, function() {
					$(this).val('');
				});
			 }

		return {
			init: function(buttonClass) {
				start(buttonClass);
			},
			close: function() {
				closePopup();
			}
		};

	})();

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

var addPproject = (function() {

	var start = function() {
			_setUpListeners();
		},
		_setUpListeners = function() {
			_addProjectToPage();
		},
		_addProjectToPage = function() {
			var projectName = $('#project_name').val(),
				projectUrl = $('#project_url').val(),
				projectText = $('#project_text').val(),
				projectImg = $('#fileformlabel').text();

			$('#add_project').before('<div class="work_block apennded"><div class="work_block_img"><img src="img/sites/' + projectImg + '" class="work_block_img_site" alt=""><div class="img_overlay"><a href="https://' + projectUrl + '" class="img_overlay_name">' + projectName + '</a></div></div><a href="https://' + projectUrl + '" class="mini_italic">' + projectUrl + '</a><p class="work_block_p">' + projectText + '</p></div>')
		}

	return {
        init: function() {
			start();
		}
	}

}());