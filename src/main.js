import './scss/main.scss';
import 'bootstrap';
import 'owl.carousel'
import i from './js/index.js';

// console.log(owl);
$(function () {
  i.scroll('#headerButtonId', '#servicesId'); // scroll down
  i.scroll('#serviceLink', '#servicesId'); // services
  i.scroll('#aboutLink', '#aboutId'); // about
  i.scroll('#galleryLink', '#galleryId'); // galery
  i.scroll('#contactsLink', '#contactsId'); // contacts
  i.scroll('#callLink', '#callId'); // contacts

  i.clickTab('#contactsLink', '#aboutBlockId'); // func(tabs, block) 
  i.sendEmail();
  i.owl();
  i.navbarScroll();
  //owl carousel-gallery


}) 
