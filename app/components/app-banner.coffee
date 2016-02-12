`import Ember from 'ember'`

AppBannerComponent = Ember.Component.extend
  stream_criteria: ['#appBanner']
  actions:
    showStreamControls: ()->
      @.get('stream_criteria').forEach (search_term) ->
        $('.stream-input').tagsinput('add', search_term.replace('"',''), {trimValue: true})
        $('.stream-input').tagsinput('refresh')
      $('#control-modal').modal("show")

`export default AppBannerComponent`
