"use strict";

tabsContainer.addEventListener('click', function (e) {
  var clicked = e.target.closest('.operations__tab'); // Guard clause

  if (!clicked) return; // Remove active classes

  tabs.forEach(function (t) {
    return t.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(function (c) {
    return c.classList.remove('operations__content--active');
  }); // Activate tab

  clicked.classList.add('operations__tab--active'); // Activate content area

  document.querySelector(".operations__content--".concat(clicked.dataset.tab)).classList.add('operations__content--active');
});