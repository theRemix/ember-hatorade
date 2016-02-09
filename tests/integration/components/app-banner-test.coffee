`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'app-banner', 'Integration | Component | app banner', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{app-banner}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#app-banner}}
      template block text
    {{/app-banner}}
  """

  assert.equal @$().text().trim(), 'template block text'
