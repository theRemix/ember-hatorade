`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

TweetsRoute = Ember.Route.extend InfinityRoute,
  model: ->
    @infinityModel 'tweet',{ perPage: 50, startingPage: 1 }

`export default TweetsRoute`
