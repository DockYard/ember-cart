import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import { assertionInjector, assertionCleanup } from '../assertions';

var application;

module('Acceptance | cart', {
  beforeEach: function() {
    application = startApp();
    assertionInjector(application);
  },

  afterEach: function() {
    assertionCleanup();
    Ember.run(application, 'destroy');
  }
});

test('cart is on the page', function(assert) {
  visit('/');
  assert.expect(0);

  andThen(function() {
    findWithAssert('.cart-items');
  });
});

test('cart is empty', function(assert) {
  visit('/');

  andThen(function() {
    assert.contains('.cart-items', 'Your cart is empty.');
    assert.equal(find('.cart-items .cart-item').length, 0);
  });
});

test('adding an item to the cart', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.cart-items .cart-item').length, 0);
  });

  andThen(function() {
    let button = find('ul.items li.item:contains("House") button:contains("Add to cart")');
    click(button);
  });

  andThen(function() {
    assert.equal(find('.cart-items .cart-item').length, 1);
  });
});

test('adding the same item twice to the cart', function(assert) {
  visit('/');

  let button;

  andThen(function() {
    assert.equal(find('.cart-items .cart-item').length, 0);
  });

  andThen(function() {
    button = find('ul.items li.item:contains("House") button:contains("Add to cart")');
    click(button);
  });

  andThen(function() {
    click(button);
  });

  andThen(function() {
    assert.equal(find('.cart-items .cart-item').length, 1);
    assert.find('ul.cart-items li.cart-item:contains("House"):contains("Quantity: 2")', 1);
  });
});

test('typecast ember model to cart-item', function(assert) {
  visit('/');

  let button;

  andThen(function() {
    assert.equal(find('.cart-items .cart-item').length, 0);
  });

  andThen(function() {
    button = find('ul.items li.item:contains("Boomer") button:contains("Add to cart")');
    click(button);
  });

  andThen(function() {
    click(button);
  });

  andThen(function() {
    assert.equal(find('.cart-items .cart-item').length, 1);
    assert.find('ul.cart-items li.cart-item:contains("Boomer"):contains("Quantity: 2")', 1);
  });
});

test('display total cost', function(assert) {
  visit('/');

  let button;

  andThen(function() {
    button = find('ul.items li.item:contains("House") button:contains("Add to cart")');
    click(button);
  });

  andThen(function() {
    button = find('ul.items li.item:contains("Boomer") button:contains("Add to cart")');
    click(button);
  });

  andThen(function() {
    assert.equal(find('.cart-items .cart-total').text(), 'Total: 2544.5');
  });
});

test('can display the cart count', function(assert) {
  visit('/');

  let button;
  let cartCounter;

  andThen(function() {
    assert.equal(find('.cart-counter').text().replace(/\s/g, ''), '0');
  });

  andThen(function() {
    button = find('ul.items li.item:contains("House") button:contains("Add to cart")');
    click(button);
  });

  andThen(function() {
    assert.equal(find('.cart-counter').text().replace(/\s/g, ''), '1');
  });

  andThen(function() {
    button = find('ul.items li.item:contains("Boomer") button:contains("Add to cart")');
    click(button);
  });

  andThen(function() {
    click(button);
  });

  andThen(function() {
    assert.equal(find('.cart-counter').text().replace(/\s/g, ''), '2');
  });
});
