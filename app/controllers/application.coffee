`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  websocket: Ember.inject.service(),
  actions:
    showStreamControls: ()->
      $('#control-modal').modal("show")
      # client.publish('/commands', {commands: 'status', status: 'report status'})
      $('.stream-input').tagsinput({trimValue: true})
    commitStreamChange: ()->
      client.publish( '/commands', {command: "search",  terms: $('input.stream-input').val()})

`export default ApplicationController`
