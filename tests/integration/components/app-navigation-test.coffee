`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'app-navigation', 'Integration | Component | app navigation', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{app-navigation}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#app-navigation}}
      template block text
    {{/app-navigation}}
  """

  assert.equal @$().text().trim(), 'template block text'
