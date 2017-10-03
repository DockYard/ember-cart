import { getOwner, setOwner } from '@ember/application';
import { A } from '@ember/array';
import Controller from '@ember/controller';
import { set } from '@ember/object';
import { on } from '@ember/object/evented';

export default Controller.extend({
  setItems: on('init', function() {
    let items = A();

    items.pushObject({ name: 'House', price: 44.5 });
    let dog = getOwner(this).resolveRegistration('model:dog').create({ name: 'Boomer', cost: 2500 });

    setOwner(dog, getOwner(this));
    items.pushObject(dog);

    set(this, 'items', items);
  }),

  actions: {
    addToCart(item) {
      this.cart.pushItem(item);
    }
  }
});
