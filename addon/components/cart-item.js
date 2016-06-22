import Ember from 'ember';
import layout from '../templates/components/cart-item';

const {
  Component
} = Ember;

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['cart-item'],

  actions: {
    removeItem(item) {
      this.cart.removeItem(item);
    }
  }
});
