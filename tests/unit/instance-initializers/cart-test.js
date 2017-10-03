import Application from '@ember/application';
import { run } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import { module, test } from 'qunit';
import { initialize } from '../../../instance-initializers/cart';
import destroyApp from '../../helpers/destroy-app';
import resolver from '../../helpers/resolver';

module('Unit | Instance Initializer | cart', {
  beforeEach() {
    run(() => {
      let application = Application.create();
      this.appInstance = application.buildInstance();
      this.appInstance.register('service:cart', resolver.resolve(resolver.normalize('service:cart')));
      this.appInstance.register('model:cart-item', resolver.resolve(resolver.normalize('model:cart-item')));
      application.deferReadiness();
    });
  },
  afterEach() {
    window.localStorage.removeItem('cart');
    let CartService = this.appInstance.resolveRegistration('service:cart');
    CartService.reopen({
      localStorage: false
    });
    destroyApp(this.appInstance);
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(this.appInstance);
  assert.ok(true);
});

test('does not instantiate cart with localStorage if flag is false', function(assert) {
  window.localStorage.setItem('cart', JSON.stringify([{ name: 'Foo', price: 100, quantity: 1 }]));

  initialize(this.appInstance);

  let cart = this.appInstance.lookup('cart:main');

  assert.ok(isEmpty(cart));
});

test('does instantiate cart with localStorage if flag is true', function(assert) {
  window.localStorage.setItem('cart', JSON.stringify([{ name: 'Foo', price: 100, quantity: 1 }]));

  let CartService = this.appInstance.resolveRegistration('service:cart');

  CartService.reopen({
    localStorage: true
  });

  initialize(this.appInstance);

  let cart = this.appInstance.lookup('cart:main');

  assert.ok(!isEmpty(cart));
});
