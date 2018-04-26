import { module, test } from 'qunit';
import { visit, fillIn, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | input mask', function(hooks) {
  setupApplicationTest(hooks);

  test('scott masked-input works', async function(assert) {
    await visit('/');
    await fillIn('.masked-input > input', '123');
    assert.equal(find('span.output').textContent, '(123) ___-____');
  });

  test('does not allow masked characters', async function(assert) {
    await visit('/');
    await fillIn('.masked-input > input', 'abc');
    assert.equal(find('span.output').textContent, '(___) ___-____');
  });
});
