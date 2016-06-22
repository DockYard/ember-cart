import Ember from 'ember';

const {
  get,
  getOwner,
  ArrayProxy,
  computed,
  observer,
  on
} = Ember;

const Service = ArrayProxy.extend({
  localStorage: false,

  pushItem(item) {
    let cartItem;

    if (item.toCartItem) {
      cartItem = item.toCartItem();
    } else {
      cartItem = getOwner(this)._lookupFactory('model:cart-item').create(item);
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

  cartItemProperties: ['name', 'price', 'quantity', 'increment', 'guidProps'],

  payload() {
    return this.map((item) => {
      return item.getProperties(this.cartItemProperties);
    });
  },

  pushPayload(payload) {
    payload.forEach((item) => {
      let cartItem = getOwner(this)._lookupFactory('model:cart-item').create(item);
      this.pushObject(cartItem);
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

Service.reopenClass({
  isServiceFactory: true
});

export default Service;
