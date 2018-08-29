'use strict';

(function () {

  var SLIDE_CLASS = 'hexa-slider__slide';
  var STATES = {'LEFT': 'hexa-slider__slide--left', 'CENTER': 'hexa-slider__slide--center', 'RIGHT': 'hexa-slider__slide--right'};
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hexa-slider__slide'));

  var hexaStatus = (slides.length === 3);

  if (hexaStatus) {

    var switchClasses = function(slideNumber)   {
      var currentCenter = document.querySelector('.' + STATES['CENTER']);
      if (currentCenter) {
        var nextCenter = slides[slideNumber];       
        var newClass = nextCenter.classList.contains(STATES['LEFT']) ? STATES['LEFT'] :  STATES['RIGHT'];

        nextCenter.classList.add(STATES['CENTER']);
        nextCenter.classList.remove(newClass);  
        currentCenter.classList.remove(STATES['CENTER']);
        currentCenter.classList.add(newClass);
      };
    };

    var hexaClickHandler = function(e) {
      e.preventDefault();   
      var el = e.target.classList.contains(SLIDE_CLASS) ? e.target :e.target.parentElement; 
      if (!el.classList.contains(STATES.CENTER)) {         
        switchClasses(el['slideNumber']);
      }
    };


  var initHexaSlider = function () {
    slides.forEach(function(item, i, slides) {
      item['slideNumber'] = i;
      item.addEventListener('click', hexaClickHandler);
    });
  };

  initHexaSlider(); 

}
})();
