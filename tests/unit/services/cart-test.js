import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import Dog from 'dummy/models/dog';

const get = Ember.get;
const set = Ember.set;

moduleFor('service:cart', 'Unit | Service | cart', {
  needs: ['model:cart-item'],
  beforeEeach() {
    window.localStorage.removeItem('cart');
  }
});

test('pushItem - pojo', function(assert) {
  let cart = this.subject({
    content: Ember.A()
  });

  assert.equal(get(cart, 'counter'), 0);

  cart.pushItem({
    name: 'Foo',
    price: 100
  });

  assert.equal(get(cart, 'counter'), 1);
  
  let cartItem = get(cart, 'firstObject');

  assert.equal(get(cartItem, 'quantity'), 1);

  cart.pushItem({
    name: 'Foo',
    price: 100
  });

  assert.equal(get(cart, 'counter'), 1);
  assert.equal(get(cartItem, 'quantity'), 2);
  assert.equal(get(cart, 'total'), 200);
});

test('pushItem - model', function(assert) {
  let cart = this.subject({
    content: Ember.A()
  });

  let dog = Dog.create({
    container: get(cart, 'container'),
    name: 'Boomer',
    cost: 150
  });

  assert.equal(get(cart, 'counter'), 0);

  cart.pushItem(dog);

  assert.equal(get(cart, 'counter'), 1);
  
  let cartItem = get(cart, 'firstObject');

  assert.equal(get(cartItem, 'quantity'), 1);

  cart.pushItem(dog);

  assert.equal(get(cart, 'counter'), 1);
  assert.equal(get(cartItem, 'quantity'), 2);
  assert.equal(get(cart, 'total'), 300);
});

test('removeItem', function(assert) {
  let cart = this.subject({
    content: Ember.A()
  });

  cart.pushItem({
    name: 'Foo',
    price: 100
  });

  cart.pushItem({
    name: 'Bar',
    price: 200
  });

  let cartItem = get(cart, 'firstObject');

  assert.equal(get(cart, 'counter'), 2);
  cart.removeItem(cartItem);
  assert.equal(get(cart, 'counter'), 1);
});

test('clearItems', function(assert) {
  let cart = this.subject({
    content: Ember.A()
  });

  cart.pushItem({
    name: 'Foo',
    price: 100
  });

  cart.pushItem({
    name: 'Bar',
    price: 200
  });

  assert.equal(get(cart, 'counter'), 2);
  cart.clearItems();
  assert.equal(get(cart, 'counter'), 0);
});

test('payload dump', function(assert) {
  let cart = this.subject({
    content: Ember.A()
  });

  cart.pushItem({
    name: 'Foo',
    price: 100
  });

  cart.pushItem({
    name: 'Foo',
    price: 100
  });

  cart.pushItem({
    name: 'Bar',
    price: 150
  });

  let payload = cart.payload();

  assert.deepEqual(payload, [
    { increment: true, name: 'Foo', price: 100, quantity: 2 },
    { increment: true, name: 'Bar', price: 150, quantity: 1 }
  ]);
});

test('pushing an item that cannot be incremented', function(assert) {
  let cart = this.subject({
    content: Ember.A()
  });

  cart.pushItem({
    name: 'Foo',
    price: 100,
    increment: false
  });

  cart.pushItem({
    name: 'Foo',
    price: 100,
    increment: false
  });

  let payload = cart.payload();

  assert.deepEqual(payload, [
    { increment: false, name: 'Foo', price: 100, quantity: 1 }
  ]);
});

test('does not save to localStorage by default', function(assert) {
  let cart = this.subject({
    content: Ember.A()
  });

  cart.pushItem({
    name: 'Foo',
    price: 100
  });

  assert.equal(window.localStorage.getItem('cart'), null);
});

test('dumps to localStorage on every write action when flag is set', function(assert) {
  let cart = this.subject({
    content: Ember.A(),
    localStorage: true
  });

  assert.equal(window.localStorage.getItem('cart'), '[]', 'cart should start cleared');

  cart.pushItem({
    name: 'Foo',
    price: 100
  });

  cart.pushItem({
    name: 'Foo',
    price: 100
  });

  cart.pushItem({
    name: 'Bar',
    price: 150
  });

  assert.equal(window.localStorage.getItem('cart'), JSON.stringify(cart.payload()));

  cart.removeItem({
    name: 'Bar',
    price: 150
  });

  assert.equal(window.localStorage.getItem('cart'), JSON.stringify(cart.payload()));

  let cartItem = get(cart, 'firstObject');

  set(cartItem, 'quantity', 3);

  assert.equal(window.localStorage.getItem('cart'), JSON.stringify(cart.payload()));

  cart.clearItems();

  assert.equal(window.localStorage.getItem('cart'), '[]', 'cart should be cleared out');
});

test('pushPayload', function(assert) {
  let cart = this.subject({
    content: Ember.A()
  });

  let payload = [
    { name: 'Foo', price: 100, quantity: 2 },
    { name: 'Bar', price: 150, quantity: 1 }
  ];

  assert.equal(get(cart, 'total'), 0);
  assert.equal(get(cart, 'counter'), 0);

  cart.pushPayload(payload);

  assert.equal(get(cart, 'total'), 350);
  assert.equal(get(cart, 'counter'), 2);
});

test('isEmpty', function(assert) {
  let cart = this.subject({
    content: Ember.A()
  });

  assert.ok(get(cart, 'isEmpty'));

  cart.pushItem({
    name: 'Foo',
    price: 100
  });

  assert.ok(!get(cart, 'isEmpty'));
});

test('isNotEmpty', function(assert) {
  let cart = this.subject({
    content: Ember.A()
  });

  assert.ok(!get(cart, 'isNotEmpty'));

  cart.pushItem({
    name: 'Foo',
    price: 100
  });

  assert.ok(get(cart, 'isNotEmpty'));
});
