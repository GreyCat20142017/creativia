'use strict';

(function() {
  var ENTER_KEYCODE = 13;
  var CURRENT_CLASSNAME = 'info-slider__slide--current';
  var TO_LEFT_CLASSNAME = 'info-slider__control--left';
  var ID_NAME = 'data-id';
  var PROP_NAME = 'direction';

  var infoSlides = Array.prototype.slice.call(document.querySelectorAll('.info-slider__slide'));
  var infoControls = document.querySelectorAll('.info-slider__control')


  if (infoSlides && infoControls)  {

    var switchInfoSlide = function (switchTo) {
      var nextInd = 0;
      var currentInfoSlide = document.querySelector('.' + CURRENT_CLASSNAME);
      if (currentInfoSlide && currentInfoSlide.hasAttribute(ID_NAME)) {
        var currentInd = parseInt(currentInfoSlide.getAttribute(ID_NAME), 10);
        infoSlides[currentInd].classList.toggle(CURRENT_CLASSNAME, false);
        nextInd = currentInd + switchTo;
        if (nextInd >= infoSlides.length) {
         nextInd = 0;
       };
       if (nextInd < 0) {
         nextInd = infoSlides.length - 1;
       };
     };
     if (infoSlides[nextInd]) {
      infoSlides[nextInd].classList.toggle(CURRENT_CLASSNAME, true);
    };
  };

  var InfoKeyDownHandler = function(e) {
    if (e.keyCode === ENTER_KEYCODE) {
      e.preventDefault();
      var switchTo = e.target[PROP_NAME] || e.currentTarget[PROP_NAME];
      switchInfoSlide(switchTo);
    };
  };

  var InfoClickHandler = function(e) {
    e.preventDefault();
    var switchTo = e.target[PROP_NAME] || e.currentTarget[PROP_NAME];
    switchInfoSlide(switchTo);
  };

  var initInfoSlider = function() {

    infoSlides.forEach(function(item, ind, infoSlides) {
      item.setAttribute(ID_NAME, ind);
    });

    for (var i = 0; i < infoControls.length; i++) {
      var control = infoControls[i];
      if (control)  {
        control[PROP_NAME] = control.classList.contains(TO_LEFT_CLASSNAME) ? -1 : 1;
        control.addEventListener('click', InfoClickHandler);
        control.addEventListener('keydown', InfoKeyDownHandler);
      }
    };
  };

  initInfoSlider();

};

})();
