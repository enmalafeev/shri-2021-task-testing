import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';

import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { createMemoryHistory } from 'history';
import { Application } from '../../src/client/Application';
import { ExampleApi, CartApi } from '../../src/client/api';
import userEvent from '@testing-library/user-event'
 
describe('Проверка работы роутера', () => {
  it('Работает переход на страницу Catalog', () => {
    const history = createMemoryHistory({
      initialEntries: ['/hw/store/catalog'],
      initialIndex: 0
    });
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
  
    const store = initStore(api, cart);
  
    const application = (
      <Router history={history}>
        <Provider store={store}>
            <Application />
        </Provider>
      </Router>
    );
    
    const { getByTestId, getByRole } = render(application);
    userEvent.click(getByTestId('link-catalog'));
    const header = getByRole('heading', { name: /catalog/i });

    expect(header).toBeInTheDocument();
  })
  it('Работает переход на страницу Delivery', () => {
    const history = createMemoryHistory({
      initialEntries: ['/hw/store/delivery'],
      initialIndex: 0
    });
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
  
    const store = initStore(api, cart);
  
    const application = (
      <Router history={history}>
        <Provider store={store}>
            <Application />
        </Provider>
      </Router>
    );
    
    const { getByTestId, getByRole } = render(application);
    userEvent.click(getByTestId('link-delivery'));
    const header = getByRole('heading', { name: /delivery/i });

    expect(header).toBeInTheDocument();
  })
  it('Работает переход на страницу Contacts', () => {
    const history = createMemoryHistory({
      initialEntries: ['/hw/store/contacts'],
      initialIndex: 0
    });
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
  
    const store = initStore(api, cart);
  
    const application = (
      <Router history={history}>
        <Provider store={store}>
            <Application />
        </Provider>
      </Router>
    );
    
    const { getByTestId, getByRole } = render(application);
    userEvent.click(getByTestId('link-contacts'));
    const header = getByRole('heading', { name: /contacts/i });

    expect(header).toBeInTheDocument();
  })
  it('Работает переход на страницу Cart', () => {
    const history = createMemoryHistory({
      initialEntries: ['/hw/store/cart'],
      initialIndex: 0
    });
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
  
    const store = initStore(api, cart);
  
    const application = (
      <Router history={history}>
        <Provider store={store}>
            <Application />
        </Provider>
      </Router>
    );
    
    const { getByTestId, getByRole } = render(application);
    userEvent.click(getByTestId('link-cart'));
    const header = getByRole('heading', { name: /shopping cart/i })

    expect(header).toBeInTheDocument();
  })
})
 
 