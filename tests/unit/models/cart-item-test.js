import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('model:cart-item', 'Unit | Model | cart item');

const {
  get,
  set
} = Ember;

test('total is quantity * price', function(assert) {
  let model = this.subject();

  assert.equal(get(model, 'total'), 0);

  set(model, 'price', 40);
  set(model, 'quantity', 10);

  assert.equal(get(model, 'total'), 400);
});

test('auto-sets guid based upon guidProps value', function(assert) {
  let modelFactory = this.factory();
  let model = modelFactory.create({
    name: 'test'
  });

  assert.notEqual(get(model, 'guid'), '(undefined)');
});

test('guid works for multiple guidProps', function(assert) {
  let modelFactory = this.factory();
  let model = modelFactory.create({
    name: 'test',
    price: 100,
    guidProps: ['name', 'price']
  });

  assert.notEqual(get(model, 'guid'), '(undefined)');
});

test('Normalizes guidProps order', function(assert) {
  let modelFactory = this.factory();
  let modelA = modelFactory.create({
    name: 'test',
    price: 100,
    guidProps: ['name', 'price']
  });

  let modelB = modelFactory.create({
    name: 'test',
    price: 100,
    guidProps: ['price', 'name']
  });

  assert.equal(get(modelA, 'guid'), get(modelB, 'guid'));
});

test('calling toCartItem returns itself', function(assert) {
  let model = this.subject();

  assert.equal(model.toCartItem(), model);
});
