import './scss/main.scss';
import 'owl.carousel'
import i from './js/index.js';

// console.log(owl);
$(document).ready(function () {
  i.scroll('#headerButtonId', '#servicesId'); // func(button, to)
  i.clickTab('#aboutTabId', '#aboutBlockId'); // func(tabs, block) 
  $('.owl-carousel').owlCarousel({
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    items: 6
  });
}) 
