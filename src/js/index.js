class Functions {
  scroll(el, target) {
    const scrollHeight = $(target).offset().top;
    $(el).click(() => {
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
}

export default new Functions;