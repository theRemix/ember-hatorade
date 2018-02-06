import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3/d3-line', 'Integration | Component | d3/d3 line', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{d3/d3-line}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#d3/d3-line}}
      template block text
    {{/d3/d3-line}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
