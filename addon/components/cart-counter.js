import Ember from 'ember';
import layout from '../templates/components/cart-counter';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ['cart-counter'],
  classNameBindings: ['isEmpty::cart-empty'],

  isEmpty: computed.bool('cart.counter')
});
