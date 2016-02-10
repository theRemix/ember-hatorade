`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'top-section', 'Integration | Component | top section', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{top-section}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#top-section}}
      template block text
    {{/top-section}}
  """

  assert.equal @$().text().trim(), 'template block text'
