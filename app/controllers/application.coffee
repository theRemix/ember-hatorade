`import Ember from 'ember'`
`import config from '../config/environment';`

ApplicationController = Ember.Controller.extend
  session: Ember.inject.service()
  danthes: Ember.inject.service()
  urlChecker: Ember.inject.service()
  userController: Ember.inject.controller('user')
  subdomain: Ember.computed.alias('urlChecker.subdomain')
  appTitle: Ember.computed 'subdomain', ()->
    if @get('subdomain').length > 0
      @get('subdomain').toUpperCase() + '.HATORA.DE'
    else
      'HATORA.DE'
  notify: Ember.inject.service()
  user:   Ember.computed.alias('userController.user')
  stream_criteria: []
  init: ->
    this._super(arguments...)
    self = this
    @get('danthes').sign
      channel:  'messages'
      callback: (message) ->
        new Ember.RSVP.Promise (resolve, reject) ->
          resolve(message)
        .then (message) ->
          self.get('notify').info(message)
    @get('danthes').sign
      channel:  'notifications'
      callback: (message) ->
        new Ember.RSVP.Promise (resolve, reject) ->
          resolve(message)
        .then (message) ->
          self.get('notify').info(message)
  actions:
    authenticateWithTwitter: ()->
      @get('session').authenticate('authenticator:torii', 'dougtwitter', subdomain: @get('subdomain'))
      .then () =>
        @get('session').authorize('authorizer:twitter')
        route.transitionTo('index')
    logOut: () ->
      @get('session').invalidate('authenticator:torii').then () =>
        route.transitionTo('index')
    ping: ()->
      @get('danthes.fayeClient').publish('/notifications', 'PONG')

    commitStreamChange: ()->
      @get('danthes.fayeClient').client.publish( '/commands', {command: "restart_and_search",  restart_and_search: $('input.stream-input').val()})

`export default ApplicationController`
