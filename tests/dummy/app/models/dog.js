import Ember from 'ember';

const {
  get,
  Object: EmberObject,
  getOwner
} = Ember;

export default EmberObject.extend({
  toCartItem() {
    let CartItem = getOwner(this)._lookupFactory('model:cart-item');

    return CartItem.create({
      name: get(this, 'name'),
      price: get(this, 'cost')
    });
  }
});
