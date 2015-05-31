import Ember from 'ember';
import layout from '../templates/components/cart-counter';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ['cart-counter']
});
