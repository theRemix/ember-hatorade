`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'app-user', 'Integration | Component | app user', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{app-user}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#app-user}}
      template block text
    {{/app-user}}
  """

  assert.equal @$().text().trim(), 'template block text'
