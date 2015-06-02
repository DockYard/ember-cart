import Ember from 'ember';

export function initialize(appInstance) {
  const CartService = appInstance.container.lookupFactory('service:cart');
  let payload;

  if (window.localStorage.getItem('cart')) {
    payload = window.localStorage.getItem('cart');
    payload = JSON.parse(payload);
  }

  let cart = CartService.create({
    content: Ember.A()
  });

  if (payload && cart.localStorage) {
    cart.pushPayload(payload);
  }

  let registry = appInstance.registry;

  registry.register('cart:main', cart, { instantiate: false });
  registry.injection('controller', 'cart', 'cart:main');
  registry.injection('component', 'cart', 'cart:main');
  registry.injection('service:cart', 'container', 'container:main');
}

export default {
  name: 'cart',
  initialize: initialize
};
