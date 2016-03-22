`import Ember from 'ember'`

AppBannerComponent = Ember.Component.extend
  session: Ember.inject.service()
  stream_criteria: ['#appBanner']
  actions:
    authenticateWithTwitter: ()->
      @attrs.authenticateWithTwitter()
    logOut: () ->
      @attrs.logOut()
    showStreamControls: ()->
      @get('stream_criteria').forEach (search_term) ->
        $('.stream-input').tagsinput('add', search_term.replace('"',''), {trimValue: true})
        $('.stream-input').tagsinput('refresh')
      $('#control-modal').modal("show")

`export default AppBannerComponent`
