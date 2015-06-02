import Ember from 'ember';

const get = Ember.get;

export default Ember.Object.extend({
  toCartItem() {
    let CartItem = this.container.lookupFactory('model:cart-item');

    return CartItem.create({
      name: get(this, 'name'),
      price: get(this, 'cost')
    });
  }
});
