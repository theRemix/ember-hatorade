`import Ember from 'ember'`

TweetsRoute = Ember.Route.extend
  model: ->
    @store.findAll('tweet')

`export default TweetsRoute`
