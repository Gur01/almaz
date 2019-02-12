import './scss/main.scss';
import 'bootstrap';
import 'owl.carousel'
import i from './js/index.js';

// console.log(owl);
$(document).ready(function () {
  i.scroll('#headerButtonId', '#servicesId'); // func(button, to)
  i.clickTab('#aboutTabId', '#aboutBlockId'); // func(tabs, block) 

  $('#owl').owlCarousel({
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    items: 6,
    nav: true,
  });

  const images = $('#owl img');
  images.click(function () {
    const src = $(this).attr('src');
    const owlGallery = $('#owl-modal');
    owlGallery.empty();
    let startFrom;
    let srcs = []
    images.each(function (i, e) {
      const otherSrc = $(e).attr('src');
      if (src === otherSrc) {
        startFrom = i;
      };
      srcs.push(otherSrc);
    });

    const head = srcs.slice(startFrom);
    const tail = srcs.slice(0, startFrom);
    head.concat(tail).forEach((e, i) => {
      $('<img>', { 'class': 'item', 'src': e }).appendTo(owlGallery)
    })


    owlGallery.owlCarousel({
      singleItem: true,
      items: 1,
      navigation: false,
    });

    owlGallery.on('initialized.owl.carousel', function () {
      owlGallery.show();
    })

    $('#modal').unbind().on('hidden.bs.modal', function () {
      owlGallery.trigger('destroy.owl.carousel');
      owlGallery.fadeIn();
    });
  })




}) 
