import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('masked-input', 'Unit | Component | masked input', {
  unit: true
});

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

test('textMaskInputElement property is initialized', function(assert) {
  assert.expect(4);
  var component = this.subject();
  this.render();

  const textMaskInputElement = component.get('textMaskInputElement');
  assert.equal(typeof textMaskInputElement, 'object');
  assert.equal(typeof textMaskInputElement.state, 'object');
  assert.equal(typeof textMaskInputElement.state.previousConformedValue, 'string');
  assert.equal(typeof textMaskInputElement.update, 'function');
});

test('changing textMaskInputElement calls textMaskInputElement.update()', function(assert) {
  assert.expect(1);

  let component = this.subject();
  this.render();

  component.set('textMaskInputElement', {
    update: () => assert.ok(true)
  });
});

test('update() method is called when component is rendered', function(assert) {
  assert.expect(1);

  this.subject({
    _textMaskInputElementChanged(){},
    update: () => assert.ok(true)
  });

  this.render();
});

test('update() method calls textMaskInputElement.update()', function(assert) {
  assert.expect(1);

  let component = this.subject({
    _textMaskInputElementChanged(){},
    textMaskInputElement: {
      update: () => assert.ok(true)
    }
  });

  component.update();
});
