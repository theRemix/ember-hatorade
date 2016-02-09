`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  websocket: Ember.inject.service(),
  userController: Ember.inject.controller('user')
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
    status: () ->
      @.get('websocket').client.publish '/commands', {command: 'status'}
    showStreamControls: ()->
      # client.publish('/commands', {commands: 'status', status: 'report status'})
      @.get('stream_criteria').forEach (search_term) ->
        $('.stream-input').tagsinput('add', search_term.replace('"',''), {trimValue: true})
        $('.stream-input').tagsinput('refresh')
      $('#control-modal').modal("show")
    commitStreamChange: ()->
      @.get('websocket').client.publish( '/commands', {command: "restart_and_search",  restart_and_search: $('input.stream-input').val()})

`export default ApplicationController`
