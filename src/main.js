import './scss/main.scss';
import 'bootstrap';
import 'owl.carousel';
import toastr from "toastr";
import i from './js/index.js';
import "lightgallery"
import "lightgallery/dist/css/lightgallery.css"

$(function () {
  i.scroll('#headerButtonId', '#servicesId'); // scroll down
  i.scroll('#serviceLink', '#servicesId'); // services
  i.scroll('#aboutLink', '#aboutId'); // about
  i.scroll('#galleryLink', '#galleryId'); // galery
  i.scroll('#contactsLink', '#contactsId'); // contacts
  i.scroll('#callLink', '#callId'); // contacts

  i.clickTab('#contactsLink', '#aboutBlockId'); // func(tabs, block) 
  i.sendEmail(toastr);
  i.owl();
  i.navbarScroll();
  i.humburgerActive();
  i.accordion();


  //owl carousel-gallery
}) 
