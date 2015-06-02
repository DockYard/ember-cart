import Ember from 'ember';

const {
  computed,
  guidFor
} = Ember;

const get = Ember.get;

export default Ember.Object.extend({
  quantity: 0,
  price: 0,

  total: computed('quantity', 'price', function() {
    return get(this, 'quantity') * get(this, 'price');
  }),

  guidProps: ['name'],

  guid: computed('guidProps', function() {
    let guidProps = get(this, 'guidProps').join('-');
    return guidFor(get(this, guidProps));
  }),

  toCartItem() {
    return this;
  }
});
