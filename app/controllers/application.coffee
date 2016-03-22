`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  session: Ember.inject.service('session')
  torii: Ember.inject.service()
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
    self.get('websocket').client.subscribe '/notifications', (message) ->
      array = message.replace('\"', '').split(',')
      self.set('stream_criteria', array)
      Ember.get(self, 'flashMessages').success message,
        timeout: 2000
  actions:
    invalidateSession: ()->
      @get('session').invalidate()
    authenticateWithTwitter: ()->
      route = this
      @get('session').authenticate('authenticator:torii', 'dougtwitter', subdomain: @get('subdomain'))
      .then () =>
        @get('session').authorize('authorizer:twitter')
    logOut: () ->
      @get('session').invalidate('authenticator:torii')
    status: () ->
      @.get('websocket').client.publish '/commands', {command: 'status'}
    showStreamControls: ()->
      @.get('stream_criteria').forEach (search_term) ->
        $('.stream-input').tagsinput('add', search_term.replace('"',''), {trimValue: true})
        $('.stream-input').tagsinput('refresh')
      $('#control-modal').modal("show")
    commitStreamChange: ()->
      @.get('websocket').client.publish( '/commands', {command: "restart_and_search",  restart_and_search: $('input.stream-input').val()})

`export default ApplicationController`
