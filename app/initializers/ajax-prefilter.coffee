# Takes two parameters: container and application
initialize = (container, application) ->
  Ember.$.ajaxPrefilter (options, originalOptions, jqXHR) ->
    authentication = JSON.parse(Cookies.get('ember_simple_auth:session')).authenticated
    jqXHR.setRequestHeader('X-CSRF-Token', authentication.code) if authentication.code

AjaxPrefilterInitializer =
  name: 'ajax-prefilter'
  initialize: initialize

`export {initialize}`
`export default AjaxPrefilterInitializer`
