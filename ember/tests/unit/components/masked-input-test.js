import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('masked-input', 'Unit | Component | masked input', {
  unit: true
});

let mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

test('it renders', function(assert) {
  assert.expect(2);

  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('mask should not be undefined', function(assert) {
  assert.expect(1);

  var component = this.subject();
  this.render();

  component.get('textMaskInputElement').update('a');
  assert.ok(component);
});

test('mask defaults to an empty array', function(assert) {
  assert.expect(1);

  var component = this.subject();
  this.render();

  assert.deepEqual(component.get('mask'), []);
});

test('input() method calls textMaskInputElement.update()', function(assert) {
  assert.expect(1);

  var component = this.subject({ mask });
  this.render();

  // stub the textMaskInputElement
  component.set('textMaskInputElement', {
    update: () => assert.ok(true)
  });

  component.input();
});
