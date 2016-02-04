`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'app-tweet', 'Integration | Component | app tweet', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{app-tweet}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#app-tweet}}
      template block text
    {{/app-tweet}}
  """

  assert.equal @$().text().trim(), 'template block text'
