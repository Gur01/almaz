import './scss/main.scss';
import 'bootstrap';
import 'owl.carousel'
import i from './js/index.js';

// console.log(owl);
$(function () {
  i.scroll('#headerButtonId', '#servicesId'); // func(button, to)
  i.clickTab('#aboutTabId', '#aboutBlockId'); // func(tabs, block) 
  i.sendEmail();
  i.owl();
  i.navbarScroll();
  //owl carousel-gallery


}) 
