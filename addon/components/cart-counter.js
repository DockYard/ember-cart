import Ember from 'ember';
import layout from '../templates/components/cart-counter';

const {
  computed,
  Component
} = Ember;

export default Component.extend({
  layout,
  tagName: 'span',
  classNames: ['cart-counter'],
  classNameBindings: ['isEmpty::cart-empty'],

  isEmpty: computed.bool('cart.counter')
});
