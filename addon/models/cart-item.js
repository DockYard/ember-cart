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

  guidProp: 'name',

  guid: computed('guidProp', function() {
    let guidProp = get(this, 'guidProp');
    return guidFor(get(this, guidProp));
  })
});
