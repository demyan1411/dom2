
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

  if($('popup').length) {
    Popups.init();
  }

  $('form').on('submit', function(e) {
      e.preventDefault();

      var $this = $(this);

      if (validateThis($this)) {
			     postFormData($this, function(data) {
    				if (data.status) {
    					Popups.open('#success');
    				} else {
    					Popups.open('#error');
    				}
  			});
  		}

    });
});
