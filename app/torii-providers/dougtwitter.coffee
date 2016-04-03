`import Oauth1Provider from 'torii/providers/oauth1';`
`import config from '../config/environment';`

ToriiProviderApplication = Ember.Object.extend
  subdomain: false
  store: Ember.inject.service()
  session: Ember.inject.service()
  url: ()->
    if @get('subdomain')
      config.apiScheme + @get('subdomain') + "." + config.apiHost + config.apiPort + '/users/auth/twitter'
    else
      config.apiScheme + config.apiHost + config.apiPort + '/users/auth/twitter'
  open: (data) ->
    new Ember.RSVP.Promise (resolve, reject) =>
      @set('subdomain', data.subdomain)
      @get('popup').open( @url(), ['code'], data)
      .then (authData) =>
        resolve(authData)
      .catch (reason) ->
        reject(reason)

`export default ToriiProviderApplication`
