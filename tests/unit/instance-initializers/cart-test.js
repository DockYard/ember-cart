import Ember from 'ember';
import { initialize } from '../../../instance-initializers/cart';
import { module, test } from 'qunit';
import test_resolver from 'ember-test-helpers/test-resolver';

let appInstance;

module('Unit | Instance Initializer | cart', {
  beforeEach: function() {
    Ember.run(function() {
      let application = Ember.Application.create();
      let resolver = test_resolver.getResolver();
      appInstance = application.buildInstance();
      appInstance.container.register('service:cart', resolver.resolve(resolver.normalize('service:cart')));
      appInstance.container.register('model:cart-item', resolver.resolve(resolver.normalize('model:cart-item')));
      application.deferReadiness();
    });
  },
  afterEach() {
    window.localStorage.removeItem('cart');
    let CartService = appInstance.container.lookupFactory('service:cart');
    CartService.reopen({
      localStorage: false
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(appInstance);
  assert.ok(true);
});

test('does not instantiate cart with localStorage if flag is false', function(assert) {
  window.localStorage.setItem('cart', JSON.stringify([{name: 'Foo', price: 100, quantity: 1}]));

  initialize(appInstance);

  let cart = appInstance.container.lookup('cart:main');

  assert.ok(Ember.isEmpty(cart));
});

test('does instantiate cart with localStorage if flag is true', function(assert) {
  window.localStorage.setItem('cart', JSON.stringify([{name: 'Foo', price: 100, quantity: 1}]));

  let CartService = appInstance.container.lookupFactory('service:cart');

  CartService.reopen({
    localStorage: true
  });

  initialize(appInstance);

  let cart = appInstance.container.lookup('cart:main');

  assert.ok(!Ember.isEmpty(cart));
});
