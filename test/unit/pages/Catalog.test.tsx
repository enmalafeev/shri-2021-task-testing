import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import { initStore } from '../../../src/client/store';
import { Catalog } from '../../../src/client/pages/Catalog'
import { Application } from '../../../src/client/Application';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import events from '@testing-library/user-event';
import { ExampleApi, CartApi } from '../../../src/client/api';

describe('Проверка Каталога товаров', () => {
  const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue([
      { id: 1, name: 'iphone', price: 150 },
      { id: 2, name: 'notebook', price: 300 },
    ]);
  
    const history = createMemoryHistory({
      initialEntries: ['/hw/store', '/hw/store/catalog'],
      initialIndex: 1,
    });
  
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
  it('Получаем список товаров на странице Catalog', async () => {
    const catalog = (
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>
    );
    await render(catalog);
  
    const links = screen.getAllByRole('link', { name: /details/i });
  
    expect(screen.getAllByTestId('1').length).not.toBe(0);
    expect(screen.getAllByTestId('2').length).not.toBe(0);
  
    expect(screen.getByText('iphone')).toBeInTheDocument();
    expect(screen.getByText('notebook')).toBeInTheDocument();
  
    expect(screen.getByText(/\$150/i)).toBeInTheDocument();
    expect(screen.getByText(/\$300/i)).toBeInTheDocument();
  
    expect(links.length).toBe(2);
  });

  it('При клике на ссылку details происходит переход на карточку товара', async () => {
    const app = (
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>
    )
    await render(app);

    events.click(screen.getByRole('link', { name: /catalog/i }));

    const links = screen.getAllByRole('link', { name: /details/i });
    events.click(links[0]);

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  })

})
