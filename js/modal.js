'use strict';

(function() {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var linksModal = document.querySelectorAll(".modal__link");
  var popupModal = document.querySelector(".modal__popup");
  if (popupModal) {
    var closeModal = popupModal.querySelector(".modal__close");
  }

  if (linksModal && popupModal && closeModal)  {

    var showPopup = function() {
      popupModal.classList.toggle("modal__popup--show", true);
      closeModal.addEventListener('click', closeClickHandler);
      closeModal.addEventListener('keydown', closeKeyDownHandler);
    };

    var hidePopup = function() {
      closeModal.removeEventListener('click', closeClickHandler);
      closeModal.removeEventListener('keydown', closeKeyDownHandler);
      popupModal.classList.toggle("modal__popup--show", false);
    };

    var linkKeyDownHandler = function(e) {
      if (e.keyCode === ENTER_KEYCODE) {
        e.preventDefault();
        showPopup();
      };
    };

    var linkClickHandler = function(e) {
      e.preventDefault();
      showPopup();
    };

    var closeKeyDownHandler = function(e) {
      if (e.keyCode === ENTER_KEYCODE) {
        e.preventDefault();
        hidePopup();
      };
    };

    var closeClickHandler = function(e) {
      e.preventDefault();
      hidePopup();
    };

    var escKeyDownHandler = function(e) {
      if (e.keyCode === ESC_KEYCODE) {
        e.preventDefault();
        hidePopup();
      };
    };

    for (var i = 0; i < linksModal.length; i++) {
      var link = linksModal[i];
      link.addEventListener('click', linkClickHandler);
      link.addEventListener('keydown', linkKeyDownHandler);
    };

    document.addEventListener('keydown', escKeyDownHandler);

  };

})();
