import Ember from 'ember';

const {
  on,
  getOwner,
  set,
  A,
  Controller
} = Ember;

export default Controller.extend({
  setItems: on('init', function() {
    let items = A();

    items.pushObject({ name: 'House', price: 44.5 });
    items.pushObject(getOwner(this)._lookupFactory('model:dog').create({ name: 'Boomer', cost: 2500 }));

    set(this, 'items', items);
  }),

  actions: {
    addToCart(item) {
      this.cart.pushItem(item);
    }
  }
});
