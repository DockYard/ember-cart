import Ember from 'ember';

const {
  ArrayProxy,
  computed,
  observer,
  on
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

    if (get(cartItem, 'increment') || get(cartItem, 'quantity') === 0) {
      cartItem.incrementProperty('quantity');
    }
  },

  localStorage: false,

  cartItemProperties: ['name', 'price', 'quantity'],

  payload() {
    return this.map((item) => {
      return item.getProperties(this.cartItemProperties);
    });
  },

  pushPayload(payload) {
    const CartItem = this.container.lookupFactory('model:cart-item');

    payload.forEach((item) => {
      this.pushObject(CartItem.create(item));
    });
  },

  removeItem(item) {
    this.removeObject(item);
  },

  clearItems() {
    this.clear();
  },

  total: computed('@each.total', function() {
    return this.reduce(function(total, item) {
      return total + get(item, 'total');
    }, 0);
  }),

  isEmpty: computed.empty('content'),
  isNotEmpty: computed.not('isEmpty'),

  counter: computed.alias('length'),

  _dumpToLocalStorage: observer('[]', '@each.quantity', on('init', function() {
    if (this.localStorage) {
      window.localStorage.setItem('cart', JSON.stringify(this.payload()));
    }
  }))
});
