/**
 * @jest-environment jsdom
 */

import React from 'react';
import { it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { initStore } from '../../../src/client/store';
import { Catalog } from '../../../src/client/pages/Catalog';
import { ExampleApi, CartApi } from '../../../src/client/api';
import {
  CartState,
  CheckoutFormData,
  ProductShortInfo
} from "../../../src/common/types";

it('Получаем список товаров на странице Catalog', () => {
  const basename = '/hw/store';
  const products = [{id: 0, name: 'one', price: 150}, {id: 0, name: 'two', price: 300}];

  class mockApi extends ExampleApi {
    constructor(basename: string) {
      super(basename);
    }

    async getProducts() {
      return await Promise.resolve(products);
    }

    async getProductById(id: number) {
      return await Promise.resolve(products[id]);
    }
  
    async checkout(form: CheckoutFormData, cart: CartState) {
      return await Promise.resolve({
        form,
        cart,
      });
    }

  }
  const api = new mockApi(basename);
  const cart = new CartApi();

  const store = initStore(api, cart);

  const catalog = (
    <Provider store={store}>
      <Catalog />
    </Provider>
  );
  const { getByRole } = render(catalog);
  screen.logTestingPlaygroundURL();
})

