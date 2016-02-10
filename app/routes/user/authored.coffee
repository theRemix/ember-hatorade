`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

UserAuthoredRoute = Ember.Route.extend InfinityRoute,
  model: (params) ->
    Em.RSVP.hash
      # user:   @store.queryRecord('user', screen_name: params.screen_name)
      tweets: @infinityModel 'tweet', {perPage: 50, startPage: 1, authored: params.screen_name}
      user: @store.peekAll('user').findBy('screen_name', params.screen_name) || @store.queryRecord('user', screen_name: params.screen_name)

  setupController: (controller, model) ->
    controller.set('user', model.user)
    controller.set('tweets', model.tweets)
    controller.set('model', model.user)

`export default UserAuthoredRoute`
