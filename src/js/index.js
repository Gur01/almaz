class Functions {
  scroll(el, target) {
    $(el).click((e) => {
      let scrollHeight = $(target).offset().top;
      let headerHeight = $('#header-top-id').height();
      e.preventDefault();
      $('html, body').animate({ scrollTop: scrollHeight - headerHeight }, 300);
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

  sendEmail(toastr) {
    toastr.options = {
      positionClass: 'toast-bottom-right'
    }
    $('#contact-form').on('submit', function (e) {
      e.preventDefault();
      let canSubmit = true;
      $(this).find('.form-control').each((i, e) => {
        const el = $(e);
        if (el.hasClass('required') && !e.value) {
          el.css('border-color', '#dc3545')
          el.siblings('.invalid-feedback').css('display', 'inline-block');
          canSubmit = false;
        } else {
          el.css('border-color', '');
          el.siblings('.invalid-feedback').css('display', '');
        }
      });

      if (!canSubmit) {
        toastr.error("Заполните обязательные поля", 'Заявка не отправлена')
      } else {
        const onSuccess = () => {
          toastr.success('Мы свяжемся с Вами в ближайшее время', 'Заявка отправлена');
          $(this).find('.form-control').val('');
          $(this).find('.button-text').css('visibility', 'visible')
          $(this).find('span.spinner').css('display', 'none');
        }
        const onError = (error) => {
          toastr.error('Заявка не отправлена')
          $(this).find('.button-text').css('visibility', 'visible')
          $(this).find('span.spinner').css('display', 'none');
        }
        $(this).find('.button-text').css('visibility', 'hidden');
        $(this).find('span.spinner').css('display', 'inline-block');

        let message = [];
        const data = $("#contact-form").find('.form-control').each((i, e) => {
          message += `${e.name} : ${e.value} \n`
        });

        $.post('https://postmail.invotes.com/send',
          { "access_token": "s88zf1ka8efjwksygzya2uet", subject: 'Message from site Almaz', text: message },
          onSuccess
        ).fail(onError);

        return false;
      }
    })
  }

  owl() {
    $('#owl').on('initialized.owl.carousel', function () { })

    $('#owl').owlCarousel({
      autoPlay: 3000,
      items: 4,
      nav: true,
      margin: 5,
      mouseDrag: false,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'>"],
      dots: true,
      responsive: true,
      responsive: {
        // breakpoint from 0 up
        0: {
          items: 1
        },
        // breakpoint from 480 up
        480: {
          items: 2
        },
        // breakpoint from 768 up
        768: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
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
      let dynamic = []
      head.concat(tail).forEach((e, i) => {
        dynamic.push({ src: e })
      })

      $(this).lightGallery({
        addClass: 'fixed-size',
        mode: 'lg-fade',
        dynamic: true,
        dynamicEl: dynamic,
        download: false,
      })

    });
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

  humburgerActive() {
    const nav = $('#nav')
    const hamburger = $('#hamburger');
    hamburger.click(function () {
      $(this).toggleClass('active');
      nav.toggleClass('in');
    });
    nav.find('li').click(function () {
      nav.removeClass('in');
      hamburger.removeClass('active')
    })
  }

  accordion() {
    const tab = $("#accordion").find(".about-tab")
    tab.first().addClass('active');
    tab.click(function () {
      if ($(this).hasClass('active')) return;
      $(this).siblings('div').removeClass('active');
      $(this).addClass('active');
      $(this).siblings('div').not(".active").next().slideUp()
      $(this).next().slideToggle();
    })
  }
}

export default new Functions;