`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

UserRoute = Ember.Route.extend InfinityRoute,
  init: ->
    @_super(arguments...)
  model: (params) ->
    Em.RSVP.hash
      tweets: @infinityModel 'tweet', {perPage: 50, startPage: 1, user: params.screen_name}
      user: @store.peekAll('user').findBy('screen_name', params.screen_name) || @store.queryRecord('user', screen_name: params.screen_name)

  setupController: (controller, model) ->
    controller.set('user', model.user)
    controller.set('tweets', model.tweets)
    controller.set('model', model.user)
`export default UserRoute`
