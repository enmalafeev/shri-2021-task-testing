import React from 'react';
import { it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';

import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { createMemoryHistory } from 'history';
import { Application } from './../../src/client/Application';
import { ExampleApi, CartApi } from '../../src/client/api';

jest.mock('../../src/client/api');


it('Рендерится главный экран приложения', () => {
  const history = createMemoryHistory({
    initialEntries: ['/'],
    initialIndex: 0
  });
  const basename = '/hw/store';
  const mockExampleApi = new ExampleApi(basename);
  const mockCartApi = new CartApi();

  const store = initStore(mockExampleApi, mockCartApi);

  const application = (
    <Router history={history}>
      <Provider store={store}>
          <Application />
      </Provider>
    </Router>
  );
  
  render(application);
  screen.logTestingPlaygroundURL();
})

