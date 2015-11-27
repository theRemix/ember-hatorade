`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  websocket: Ember.inject.service(),
  init: ->
    this._super()
    self = this
    self.get('websocket').client.subscribe '/notifications', (message) ->
      Ember.get(self, 'flashMessages').success message,
        timeout: 500
  actions:
    status: () ->
      @.get('websocket').client.publish '/commands', {command: 'status'}
    showStreamControls: ()->
      $('#control-modal').modal("show")
      # client.publish('/commands', {commands: 'status', status: 'report status'})
      $('.stream-input').tagsinput({trimValue: true})
    commitStreamChange: ()->
      client.publish( '/commands', {command: "search",  terms: $('input.stream-input').val()})

`export default ApplicationController`
