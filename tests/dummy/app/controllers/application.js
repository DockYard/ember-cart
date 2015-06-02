import Ember from 'ember';

const {
  on
} = Ember;

const get = Ember.get;
const set = Ember.set;

export default Ember.Controller.extend({
  setItems: on('init', function() {
    let items = Ember.A();

    items.pushObject({ name: 'House', price: 44.5 });
    items.pushObject(this.container.lookupFactory('model:dog').create({name: 'Boomer', cost: 2500}));

    set(this, 'items', items);
  }),

  actions: {
    addToCart: function(item) {
      this.cart.pushItem(item);
    }
  }
});
