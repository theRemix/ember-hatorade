`import Ember from 'ember'`

UserBannerComponent =  Ember.Component.extend

  stream_criteria: ['#funtimes']
  actions:
    authenticateWithTwitter: ()->
      @attrs.authenticateWithTwitter()
    logOut: () ->
      @attrs.logOut()
    showStreamControls: ()->
      @.get('stream_criteria').forEach (search_term) ->
        $('.stream-input').tagsinput('add', search_term.replace('"',''), {trimValue: true})
        $('.stream-input').tagsinput('refresh')
      $('#control-modal').modal("show")

`export default UserBannerComponent`
