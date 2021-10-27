const { assert } = require("chai");

describe('Example store', async function() {
  it('Рендеринг главной страницы', async function() {
    await this.browser.url('https://shri.yandex/hw/store');
    await this.browser.assertView('plain', '.Application', {
      compositeImage: true,
    });
  });
});

describe('Проверка корзины товаров', async function() {
  it('Переход в карточку товара', async function() {
    await this.browser.url('/hw/store/catalog');
    const productId = await this.browser.$('.ProductItem').getAttribute('data-testid');
    const datailsLink = await this.browser.$('.ProductItem-DetailsLink');
    await datailsLink.click();
    const url = await this.browser.url();
    const urls = url.split('/');
    assert.equal(urls[urls.length - 1], productId);
  });

  it('Товар добавляется в корзину', async function() {
    await this.browser.url(('/hw/store/catalog'));
    await this.browser.$('.ProductItem-DetailsLink').click();
    await this.browser.$('.ProductDetails-AddToCart').click();
    await this.browser.assertView('plain', '.CartBadge', {
      compositeImage: true
    });
  });

  it('Содержимое страницы сохраняется между перезагрузками страницы', async function() {
    await this.browser.url('/hw/store/catalog');
    await this.browser.$('.ProductItem-DetailsLink').click();
    await this.browser.$('.ProductDetails-AddToCart').click();
    await this.browser.url('/hw/store/cart');
    await this.browser.url('/hw/store');
    await this.browser.url('/hw/store/cart');
    await this.browser.assertView('plain', '.Cart', {
        compositeImage: true,
    });
    await this.browser.$('.Cart-Clear').click();
  });

  it('Счетчик товаров в хедере отображает 1 товар', async function () {
    await this.browser.url('/hw/store/catalog');
    await this.browser.$('.ProductItem-DetailsLink').click();
    await this.browser.$('.ProductDetails-AddToCart').click();
    await this.browser.assertView('plain', '[href="/hw/store/cart"]', {
      compositeImage: true,
    });
  });

  it('Отображение разных товаров в корзине', async function () {
    await this.browser.url('/hw/store/catalog');
    await this.browser.$('.ProductItem-DetailsLink').click();
    await this.browser.$('.ProductDetails-AddToCart').click();
    await this.browser.$('.ProductDetails-AddToCart').click();
    await this.browser.$('.ProductDetails-AddToCart').click();
    await this.browser.$('.ProductDetails-AddToCart').click();

    await this.browser.assertView('plain', '[href="/hw/store/cart"]', {
      compositeImage: true,
    });
  });

});

describe('Проверка верстки на мобилках', async function() {
  it('Главная - мобильная верстка', async function () {
    await this.browser.setWindowSize(375, 812);
    await this.browser.url('/hw/store');
    await this.browser.assertView('plain', '#root', {
      compositeImage: true,
    });
  });

  it('Контакты - мобильная верстка', async function () {
    await this.browser.setWindowSize(375, 812);
    await this.browser.url('/hw/store/contacts');
    await this.browser.assertView('plain', '#root', {
      compositeImage: true,
      allowViewportOverflow: true,
    });
  });

  it('Навигационное меню должно скрываться за "гамбургер"', async function () {
    await this.browser.setWindowSize(375, 812);
    const navigationToggler = await this.browser.$('.navbar-toggler');
    const navigationMenu = await this.browser.$('.navbar-collapse');
    
    assert.isFalse(await navigationMenu.isDisplayed());
    navigationToggler.click();
    assert.isTrue(await navigationMenu.isDisplayed());
  });
});