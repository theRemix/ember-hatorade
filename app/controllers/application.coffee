`import Ember from 'ember'`
`import config from '../config/environment';`

ApplicationController = Ember.Controller.extend
  session: Ember.inject.service()
  urlChecker: Ember.inject.service()
  websocket: Ember.inject.service()
  userController: Ember.inject.controller('user')
  subdomain: Ember.computed.alias('urlChecker.subdomain')
  appTitle: Ember.computed 'subdomain', ()->
    if @get('subdomain').length > 0
      @get('subdomain').toUpperCase() + '.HATORA.DE'
    else
      'HATORA.DE'
  user: Ember.computed.reads('userController.user')
  stream_criteria: []
  init: ->
    this._super()
    self = this
    @get('websocket').client.subscribe '/notifications', (message) ->
      @flashNotify(message).bind(self)
    @get('websocket').client.subscribe '/internal', (message) ->
      console.log 'message from websocket: ', message

  flashNotify: (message) ->
    array = message.replace('\"', '').split(',')
    self.set('stream_criteria', array)
    Ember.get(self, 'flashMessages').success message,
      timeout: 2000
  actions:
    authenticateWithTwitter: ()->
      @get('session').authenticate('authenticator:torii', 'dougtwitter', subdomain: @get('subdomain'))
      .then () =>
        @get('session').authorize('authorizer:twitter')
        route.transitionTo('index')
    logOut: () ->
      @get('session').invalidate('authenticator:torii').then () =>
        route.transitionTo('index')
    commitStreamChange: ()->
      @get('websocket').client.publish( '/commands', {command: "restart_and_search",  restart_and_search: $('input.stream-input').val()})

`export default ApplicationController`
