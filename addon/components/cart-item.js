import Ember from 'ember';
import layout from '../templates/components/cart-item';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'li',
  classNames: ['cart-item']
});
