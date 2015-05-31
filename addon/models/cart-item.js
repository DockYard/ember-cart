import Ember from 'ember';

const {
  computed,
  guidFor
} = Ember;

const get = Ember.get;

export default Ember.Object.extend({
  quantity: 0,
  cost: 0,

  total: computed('quantity', 'cost', function() {
    return get(this, 'quantity') * get(this, 'cost');
  }),

  guidProp: 'name',

  guid: computed('guidProp', function() {
    let guidProp = get(this, 'guidProp');
    return guidFor(get(this, guidProp));
  })
});
