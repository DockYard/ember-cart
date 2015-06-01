import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import Dog from 'dummy/models/dog';

const get = Ember.get;

moduleFor('ember-cart@service:cart', 'Unit | Service | cart', {
  needs: ['model:cart-item']
});

test('pushItem - pojo', function(assert) {
  let cart = this.subject({
    content: Ember.A()
  });

  assert.equal(get(cart, 'counter'), 0);

  cart.pushItem({
    name: 'Foo',
    cost: 100
  });

  assert.equal(get(cart, 'counter'), 1);
  
  let cartItem = get(cart, 'firstObject');

  assert.equal(get(cartItem, 'quantity'), 1);

  cart.pushItem({
    name: 'Foo',
    cost: 100
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
    price: 150
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
    cost: 100
  });

  cart.pushItem({
    name: 'Bar',
    cost: 200
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
    cost: 100
  });

  cart.pushItem({
    name: 'Bar',
    cost: 200
  });

  assert.equal(get(cart, 'counter'), 2);
  cart.clearItems();
  assert.equal(get(cart, 'counter'), 0);
});
