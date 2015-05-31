import Ember from 'ember';
import layout from '../templates/components/cart-items';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ul',
  classNames: ['cart-items']
});
