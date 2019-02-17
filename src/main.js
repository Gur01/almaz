import './scss/main.scss';
import 'bootstrap';
import 'owl.carousel'
import i from './js/index.js';

// console.log(owl);
$(document).ready(function () {
  i.scroll('#headerButtonId', '#servicesId'); // func(button, to)
  i.clickTab('#aboutTabId', '#aboutBlockId'); // func(tabs, block) 
  i.sendEmail();
  //owl carousel-gallery
  $('#owl').owlCarousel({
    autoPlay: 3000,
    items: 4,
    nav: true,
    margin: 5
  });
  const images = $('#owl img');
  images.click(function () {
    $('#modal').find('.loader').css('display', 'inline-block');

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

    owlGallery.on('initialized.owl.carousel', function () {
      setTimeout(() => {
        $('#modal').find('.loader').css('display', 'none');
        $('#modal').find('.modal-content').css({ display: 'block', opacity: 1 });
        $('#modal').find('.owl-item').css({ display: 'block', opacity: 1 });
      }, 1000);
    })

    owlGallery.owlCarousel({
      items: 1,
      nav: true,
    });

    $('#modal').unbind().on('hidden.bs.modal', function () {
      owlGallery.trigger('destroy.owl.carousel');
      $('#modal').find('.modal-content').css({ display: '', opacity: '' });
      $('#modal').find('.modal-dialog').css({ display: '', opacity: '' })
    });
  })

}) 
