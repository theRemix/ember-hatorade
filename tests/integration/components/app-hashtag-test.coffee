`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'app-hashtag', 'Integration | Component | app hashtag', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{app-hashtag}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#app-hashtag}}
      template block text
    {{/app-hashtag}}
  """

  assert.equal @$().text().trim(), 'template block text'
