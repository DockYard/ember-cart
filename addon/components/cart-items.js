import Ember from 'ember';
import layout from '../templates/components/cart-items';

const {
  computed,
  Component
} = Ember;

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['cart-items'],
  classNameBindings: ['isEmpty::cart-empty'],

  isEmpty: computed.bool('cart.counter')
});
