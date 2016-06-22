import Ember from 'ember';

const {
  A
} = Ember;

export function initialize(appInstance) {
  let CartService = appInstance._lookupFactory('service:cart');

  let payload;

  if (window.localStorage.getItem('cart')) {
    payload = window.localStorage.getItem('cart');
    payload = JSON.parse(payload);
  }

  let cart = CartService.create({
    content: A()
  });

  if (payload && cart.localStorage) {
    cart.pushPayload(payload);
  }

  appInstance.register('cart:main', cart, { instantiate: false });
  appInstance.inject('controller', 'cart', 'cart:main');
  appInstance.inject('component', 'cart', 'cart:main');
}

export default {
  name: 'cart',
  initialize
};
