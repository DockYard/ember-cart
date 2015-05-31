import Ember from 'ember';

const {
  ArrayProxy,
  computed
} = Ember;

const get = Ember.get;

export default ArrayProxy.extend({
  pushItem(item) {
    let cartItem;

    if (item.toCartItem) {
      cartItem = item.toCartItem();
    } else {
      const CartItem = this.container.lookupFactory('model:cart-item');
      cartItem = CartItem.create(item);
    }

    let foundCartItem = this.findBy('guid', get(cartItem, 'guid'));

    if (!foundCartItem) {
      this.pushObject(cartItem);
    }

    cartItem = foundCartItem || cartItem;
    cartItem.incrementProperty('quantity');
  },

  removeItem(item) {
    this.removeObject(item);
  },

  total: computed('@each.total', function() {
    return this.reduce(function(total, item) {
      return total + get(item, 'total');
    }, 0);
  }),

  counter: computed.alias('length')
});
