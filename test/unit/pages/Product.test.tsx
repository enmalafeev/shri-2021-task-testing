import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as redux from 'react-redux';
import React from 'react';
import { Provider } from 'react-redux';
import { Product } from '../../../src/client/pages/Product';
import { CartApi, ExampleApi } from '../../../src/client/api';
import { initStore } from '../../../src/client/store';
import { BrowserRouter } from 'react-router-dom';

describe('Проверка карточки товара', () => {
  const spy = jest.spyOn(redux, 'useSelector');
  spy.mockReturnValue({
    id: 1,
    name: 'notebook',
    price: 300,
    description: 'some description about the product',
    material: 'steel',
    color: 'grey',
  });

  const basename = '/hw/store/catalog/:id';
  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  it('Shows info about product', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Product />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByRole('heading', { name: /notebook/i })).toBeInTheDocument();
    expect(screen.getByText(/some description about the product/i)).toBeInTheDocument();
    expect(screen.getByText(/color/i)).toBeInTheDocument();
    expect(screen.getByText(/material/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });
});