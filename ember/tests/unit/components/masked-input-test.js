import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('masked-input', 'Unit | Component | masked input', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
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
