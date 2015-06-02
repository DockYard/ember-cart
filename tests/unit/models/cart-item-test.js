import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('model:cart-item', 'Unit | Model | cart item');

const get = Ember.get;
const set = Ember.set;

test('total is quantity * price', function(assert) {
  let model = this.subject();

  assert.equal(get(model, 'total'), 0);

  set(model, 'price', 40);
  set(model, 'quantity', 10);

  assert.equal(get(model, 'total'), 400);
});

test('auto-sets guid based upon guidProps value', function(assert) {
  let modelFactor = this.factory();
  let model = modelFactor.create({
    name: 'test'
  });

  assert.notEqual(get(model, 'guid'), undefined);
});

test('calling toCartItem returns itself', function(assert) {
  let model = this.subject();

  assert.equal(model.toCartItem(), model);
});
