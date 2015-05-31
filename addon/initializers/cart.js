import Ember from 'ember';
import CartService from 'ember-cart/services/cart';

export function initialize(container, application) {
  let cart = CartService.create({
    content: Ember.A(),
    container: container
  });

  application.register('cart:main', cart, { instantiate: false });
  application.inject('controller', 'cart', 'cart:main');
  application.inject('component', 'cart', 'cart:main');
  application.inject('service:cart', 'container', 'container:main');
}

export default {
  name: 'cart',
  initialize: initialize
};
