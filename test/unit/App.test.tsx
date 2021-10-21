/**
 * @jest-environment jsdom
 */

import React from 'react';
import { it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { Router } from 'react-router';

import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { createMemoryHistory } from 'history';
import { Application } from './../../src/client/Application';
import { ExampleApi, CartApi } from '../../src/client/api';

it('Рендерится главный экран приложения', () => {
  const history = createMemoryHistory({
    initialEntries: ['/'],
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
  
  const { getByRole } = render(application);
  const rootLink = getByRole('link', { name: /Example store/i });
  const expected = 'Example store';

  expect(rootLink.textContent).toBe(expected);
})

