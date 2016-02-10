`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

UserRoute = Ember.Route.extend InfinityRoute,
  init: ->
    @_super(arguments...)
  model: (params) ->
    @store.peekAll('user').findBy('screen_name', params.screen_name) || @store.queryRecord('user', screen_name: params.screen_name)

  setupController: (controller, model) ->
    controller.set('user', model)
`export default UserRoute`
