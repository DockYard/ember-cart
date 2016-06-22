import Ember from 'ember';

const {
  get,
  computed,
  guidFor,
  Object: EmberObject
} = Ember;

export default EmberObject.extend({
  increment: true,
  quantity: 0,
  price: 0,

  total: computed('quantity', 'price', function() {
    return get(this, 'quantity') * get(this, 'price');
  }),

  guidProps: ['name'],

  guid: computed('guidProps', function() {
    let guidVal = get(this, 'guidProps').sort().map((prop) => {
      return get(this, prop);
    }).join('-');

    return guidFor(guidVal);
  }),

  toCartItem() {
    return this;
  }
});
