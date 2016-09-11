import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const { run } = Ember;
const mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

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

test('inputElement is an alias of element', function(assert) {
  assert.expect(1);

  var component = this.subject();
  this.render();

  assert.equal(component.get('inputElement'), component.get('element'));
});

test('createTextMaskInputElement() method exists', function(assert) {
  assert.expect(1);

  var component = this.subject();
  this.render();
  assert.equal(typeof component.createTextMaskInputElement, 'function');
  component.createTextMaskInputElement({
    inputElement: component.get('element'),
    mask
  });
});

test('initTextMaskInputElement() method sets textMaskInputElement property', function(assert) {
  assert.expect(4);
  var component = this.subject({ didInsertElement: null });
  this.render();

  run(() => component.initTextMaskInputElement());

  const textMaskInputElement = component.get('textMaskInputElement');
  assert.equal(typeof textMaskInputElement, 'object');
  assert.equal(typeof textMaskInputElement.state, 'object');
  assert.equal(typeof textMaskInputElement.state.previousConformedValue, 'string');
  assert.equal(typeof textMaskInputElement.update, 'function');
});

test('config is correctly passed to createTextMaskInputElement() method', function(assert) {
  assert.expect(11);

  const placeholderChar = '_';
  const pipe = function () { return ''; };
  const onReject = function () { return ''; };
  const onAccept = function () { return ''; };

  this.subject({
    mask,
    guide: true,
    placeholderChar,
    keepCharPositions: true,
    pipe,
    onReject,
    onAccept,
    createTextMaskInputElement: (config) => {
      assert.ok(config.inputElement);
      assert.equal(config.mask, mask);
      assert.equal(config.guide, true);
      assert.equal(config.placeholderChar, placeholderChar);
      assert.deepEqual(config.keepCharPositions, true);
      assert.deepEqual(config.pipe, pipe);
      assert.equal(typeof config.pipe, 'function');
      assert.deepEqual(config.onReject, onReject);
      assert.equal(typeof config.onReject, 'function');
      assert.deepEqual(config.onAccept, onAccept);
      assert.equal(typeof config.onAccept, 'function');
    }
  });
  this.render();
});

test('update() method calls textMaskInputElement.update()', function(assert) {
  assert.expect(1);

  var component = this.subject({ mask });
  this.render();

  // stub the textMaskInputElement
  run(() => component.set('textMaskInputElement', {
    update: () => assert.ok(true)
  }));

  component.update();
});
