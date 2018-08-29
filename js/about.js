'use strict';

(function(){
  var ENTER_KEYCODE = 13;

  var articles = document.querySelectorAll(".detail");
  var DETAIL__OPEN = 'detail--open';
  var DETAIL__CLOSED = 'detail--closed';
  var DETAIL__SWITCHER = 'detail__switcher';

  var switchArticle = function(ind) {
    var currentArticle = articles[ind];
    if (currentArticle) {
      currentArticle.classList.toggle(DETAIL__CLOSED);
      currentArticle.classList.toggle(DETAIL__OPEN);
    };
  };

  var switcherKeyDownHandler = function(e) {
    if (e.keyCode === ENTER_KEYCODE) {
      e.preventDefault();
      var ind = e.target['articleNumber'] || e.currentTarget['articleNumber'];
      switchArticle(ind);
    };
  };

  var switcherClickHandler = function(e) {
    e.preventDefault();
   var ind = e.target['articleNumber'] || e.currentTarget['articleNumber'];
    switchArticle(ind);
  };

  for (var i = 0; i < articles.length; i++) {
    if (articles[i]) {
      var switcher = articles[i].querySelector('.' + DETAIL__SWITCHER);
      if (switcher) {
        switcher['articleNumber'] = i;
        switcher.addEventListener('click', switcherClickHandler);
        switcher.addEventListener('keydown', switcherKeyDownHandler);
      };
    };
  };

})();
