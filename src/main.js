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

  $('#owl img').click(function () {
    const src = $(this).attr('src');
    const owlGallery = $('#owl-modal');
    owlGallery.empty();
    const arr = [];
    let startFrom;

    $('#owl img').each(function (i, e) {
      const otherSrc = $(e).attr('src');
      if (src === otherSrc) {
        startFrom = i;

      };
      arr.push(otherSrc);
    });

    let tail = []
    arr.forEach((e, i) => {
      if (i >= startFrom) {
        $('<img>', { 'class': 'item', 'src': e }).appendTo(owlGallery);
      } else {
        tail.push(e)
      }
    });
    tail.forEach((e, i) => {
      $('<img>', { 'class': 'item', 'src': e }).appendTo(owlGallery);
    });

    const gal = owlGallery.owlCarousel({
      singleItem: true,
      items: 1,
      navigation: false,
    });

    gal.on('initialized.owl.carousel', function () {
      console.log('hrllo');

      owlGallery.show();

    })

    $('#modal').unbind().on('hidden.bs.modal', function () {
      gal.trigger('destroy.owl.carousel');
      owlGallery.fadeIn();
    });
  })




}) 
