# ember-cart #

[![Build Status](https://travis-ci.org/DockYard/ember-cart.svg?branch=master)](https://travis-ci.org/DockYard/ember-cart) [![CircleCI](https://circleci.com/gh/DockYard/ember-cart.svg?style=shield)](https://circleci.com/gh/DockYard/ember-cart) [![npm version](https://badge.fury.io/js/ember-cart.svg)](https://badge.fury.io/js/ember-cart) [![Ember Observer Score](http://emberobserver.com/badges/ember-cart.svg)](http://emberobserver.com/addons/ember-cart)

**[ember-cart is built and maintained by DockYard, contact us for expert Ember.js consulting](https://dockyard.com/ember-consulting)**.

## About ##

Shopping cart primitives for Ember applications

## Installing ##

`ember install ember-cart`

## Looking for help? ##

If it is a bug [please open an issue on GitHub](https://github.com/dockyard/ember-cart/issues).

## Usage ##

ember-cart manages the adding, quantity editing, removal, and eventual
payment processing of shopping cart items.

The primitives provided are intended to give a boilerplate base to work
from. Customizing the templates is always a good place to start.

### Components

* `{{cart-items}}`

Provides a list of the shopping cart. Each line item is a {{cart-item}}.
Shows the total cost of all the items in the cart.

* `{{cart-item}}`

The line-item for each item type in the cart. Adding more than one of
the same type will increase the quantity. Also handles removal of the
item from the cart.

* `{{cart-counter}}`

A counter that displays the current number of unique items in the cart.

### `this.cart`

`this.cart` is injected into Controllers and Components. If you want to
add an item to the cart you can create an action that does
`this.cart.pushItem`:

```javascript
actions: {
  pushItem(item) {
    this.cart.pushItem(item);
  }
}
```

### Cart Items

You can push POJOs or Ember models into the cart. The basic information
that an `item` requires is **name** and **cost**. ember-cart will handle
checking to see if there is already an existing similar item in the
cart. If there is, the quantity for that item is incremented. If not the
item is added to the cart.

#### POJOs

POJOs pushed into the cart:

```js
this.cart.pushItem({
  name: 'Doggie',
  cost: 400
});
```

### Ember Models

You can push another model into the cart. However you should provide a
`toCartItem` handler on that model to typecast that model to a CartItem.

```javascript
// app/models/dog.js
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
```

### Persisting to localStorage

If you want to persist the cart to `localStorage` so the items are
available if the user comes back later you will need to set the
`localStorage` flag in the Cart service to `true`:

```js
// app/services/cart.js

import CartService from 'ember-cart/services/cart';

export default CartService.extend({
  localStorage: true
});
```

Please note: if you persist to `localStorage` you will have to handle
the security around this. For example, if a user signs out of their
account you will probably want to clear their cart:

```javscript
actions: {
  signOut() {
    // signout handler
    this.cart.clearItems();
  }
}
```

Make sure to use `clearItems()` and not `clear()` as the former will
ensure that `localStorage` is properly cleared out.

### Avoiding quantity incrementation

You may only allow one of a specific type. To enforce the quantity
doesn't increment you should set `increment: false` for the Cart Item:

```js
this.cart.pushItem({
  name: 'Foo',
  price: 100,
  increment: false
});
```

## Authors ##

* [Brian Cardarella](http://twitter.com/bcardarella)

[We are very thankful for the many contributors](https://github.com/dockyard/ember-cart/graphs/contributors)

## Versioning ##

This library follows [Semantic Versioning](http://semver.org)

## Want to help? ##

Please do! We are always looking to improve this library. Please see our
[Contribution Guidelines](https://github.com/dockyard/ember-cart/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2015

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
