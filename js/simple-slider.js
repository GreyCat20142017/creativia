'use strict';

(function() {
  var ENTER_KEYCODE = 13;

  var controls = document.querySelectorAll(".simple-slider__control");
  var slides = document.querySelectorAll(".simple-slider__slide");
  var CURRENT_SLIDE_CLASSNAME = 'simple-slider__slide--current';
  var CURRENT_CONTROL_CLASSNAME = 'simple-slider__control--current';

  if (controls && slides)  {

    var switchSlides = function(switchTo) {
      var fixIEToggle = function (el, className) {
         if (el.classList.contains(className)) { 
            el.classList.remove(className);
          };
      };

      for (var j = 0; j < controls.length; j++) {
        if (slides[j] && controls[j]) {
          fixIEToggle(slides[j], CURRENT_SLIDE_CLASSNAME);
          fixIEToggle(controls[j], CURRENT_CONTROL_CLASSNAME);
        }
      };

      if (slides[switchTo] && controls[switchTo]) {
        slides[switchTo].classList.add(CURRENT_SLIDE_CLASSNAME);
        controls[switchTo].classList.add(CURRENT_CONTROL_CLASSNAME);
      }
    };

   var controlKeyDownHandler = function(e) {
    if (e.keyCode === ENTER_KEYCODE) {
      e.preventDefault();
      var switchTo = e.target['slideNumber'] || e.currentTarget['slideNumber'];
      switchSlides(switchTo);
    };
  };

  var controlClickHandler = function(e) {
    e.preventDefault();
    var switchTo = e.target['slideNumber'] || e.currentTarget['slideNumber'];
    switchSlides(switchTo);
  };

  for (var i = 0; i < controls.length; i++) {
    var control = controls[i];
    control['slideNumber'] = i;
    control.addEventListener('click', controlClickHandler);
    control.addEventListener('keydown', controlKeyDownHandler);
  };

};

})();
