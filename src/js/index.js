import { loadavg } from 'os';

class Functions {
  scroll(el, target) {
    $(el).click((e) => {
      let scrollHeight = $(target).offset().top;
      e.preventDefault();
      $('html, body').animate({ scrollTop: scrollHeight }, 300);
    })
  }

  clickTab(tabs, output) {
    $(tabs).find('li').click(function () {
      $(this).addClass('active').siblings('li').removeClass('active');
      const id = $(this).data('item');;
      const target = $(output).find(`[data-item='target-${id}']`)
      const cards = $(output).find('.about-tab__card');
      cards.css('visibility', 'hidden')
      target.css({ visibility: 'visible' })
    })
  }

  sendEmail() {
    $('#contact-form').on('submit', function (e) {
      e.preventDefault();
      let canSubmit = true;
      $(this).find('.form-control').each((i, e) => {
        const el = $(e);
        if (el.hasClass('required') && !e.value) {
          el.siblings('.invalid-feedback').css('display', 'inline-block');
          canSubmit = false;
        } else {
          el.siblings('.invalid-feedback').css('display', '')
        }
      });

      if (canSubmit) {
        console.log('submitting');
        console.log($(this).serialize());

        $.ajax({
          url: "https://formspree.io/gv@betwinneraffiliates.com",
          method: "POST",
          data: $(this).serialize(),
          dataType: "json"
        });

        // $(this).get(0).reset();
      }
    })
  }

  owl() {
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
  }

  navbarScroll() {
    $(window).scroll(function (e) {
      const nav = $('#header-top-id');
      const scrlTop = $(this).scrollTop();
      if (scrlTop > 300) {
        nav.addClass('fixed animated slideInDown');
      } else {
        if (nav.hasClass('fixed')) {
          nav.addClass('slideOutUp');
          setTimeout(function () {
            nav.removeClass('fixed animated slideInDown slideOutUp');
          }, 100);
        }
      }
    })
  }
}

export default new Functions;