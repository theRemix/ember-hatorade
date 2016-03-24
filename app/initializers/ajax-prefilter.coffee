# Takes two parameters: container and application
initialize = (container, application) ->
  Ember.$.ajaxPrefilter (options, originalOptions, jqXHR) ->
    authentication = Cookies.getJSON('ember_simple_auth:session')?.authenticated
    jqXHR.setRequestHeader('X-CSRF-Token', authentication.code) if authentication?.code?

AjaxPrefilterInitializer =
  name: 'ajax-prefilter'
  initialize: initialize

`export {initialize}`
`export default AjaxPrefilterInitializer`
