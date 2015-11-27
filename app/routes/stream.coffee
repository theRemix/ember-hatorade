`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

StreamRoute = Ember.Route.extend InfinityRoute,
  model: ->
    @store.findAll('tweet')
    # @infinityModel 'tweet',{ perPage: 50, startingPage: 1 }
    # @store.all('tweet')
    # @modelFor('tweets.index').get('tweets')
  setupController: (controller, model) ->
    controller.set('model', model)


`export default StreamRoute`
