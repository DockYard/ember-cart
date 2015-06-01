import Ember from 'ember';
import layout from '../templates/components/cart-items';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ul',
  classNames: ['cart-items'],
  classNameBindings: ['isEmpty::cart-empty'],

  isEmpty: computed.bool('cart.counter')
});
