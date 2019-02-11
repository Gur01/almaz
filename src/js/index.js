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
}

export default new Functions;