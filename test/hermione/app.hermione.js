describe('Example store', async function() {
  it('Рендеринг главной страницы', async function() {
    await this.browser.url('https://shri.yandex/hw/store');
    await this.browser.assertView('plain', '.Application', {
      compositeImage: true,
    });
  });
});