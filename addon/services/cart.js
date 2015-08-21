import Ember from 'ember';

const {
  ArrayProxy,
  Evented,
  on,
  computed,
  computed: { alias, empty, not }
} = Ember;

const get = Ember.get;

export default ArrayProxy.extend(Evented, {
  cartItemProperties: [ 'name', 'price', 'quantity', 'increment', 'guidProps' ],
  localStorage: false,
  isServiceFactory: true,
  isEmpty: empty('content'),
  isNotEmpty: not('isEmpty'),
  counter: alias('content.length'),
  items: alias('content'),

  total: computed('items.@each.total', {
    get() {
      const items = get(this, 'items');
      return items.reduce((total, item) => total + get(item, 'total'), 0);
    }
  }),

  payload: computed('items.[]', 'items.@each.quantity', 'cartItemProperties.[]', {
    get() {
      const items = get(this, 'items');
      const cartItemProperties = get(this, 'cartItemProperties');
      const payload = items.map((item) => item.getProperties(cartItemProperties));

      return this._dumpToLocalStorage(payload);
    }
  }),

  dumpToLocalStorage: on('itemsDidChange', function(payload = get(this, 'payload')) {
    this._dumpToLocalStorage(payload);
  }),

  init() {
    this._dumpToLocalStorage(get(this, 'payload'));
  },

  pushItem(item) {
    const items = get(this, 'items');
    let cartItem;

    if (item.toCartItem) {
      cartItem = item.toCartItem();
    } else {
      const CartItem = this.container.lookupFactory('model:cart-item');
      cartItem = CartItem.create(item);
    }

    let foundCartItem = items.findBy('guid', get(cartItem, 'guid'));

    if (!foundCartItem) {
      items.pushObject(cartItem);
    }

    cartItem = foundCartItem || cartItem;

    if (get(cartItem, 'increment') || get(cartItem, 'quantity') === 0) {
      cartItem.incrementProperty('quantity');
    }

    this.trigger('itemsDidChange');
  },

  pushPayload(payload) {
    const CartItem = this.container.lookupFactory('model:cart-item');

    payload.forEach((item) => {
      this.pushObject(CartItem.create(item));
    });
    this.trigger('itemsDidChange');
  },

  removeItem(item) {
    this.removeObject(item);
    this.trigger('itemsDidChange');
  },

  clearItems() {
    this.clear();
    this.trigger('itemsDidChange');
  },

  _dumpToLocalStorage(payload) {
    if (this.localStorage) {
      window.localStorage.setItem('cart', JSON.stringify(payload));
    }

    return payload;
  }
});
