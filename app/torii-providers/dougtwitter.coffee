`import Oauth1Provider from 'torii/providers/oauth1';`

ToriiProviderApplication = Ember.Object.extend
  subdomain: false
  store: Ember.inject.service()
  session: Ember.inject.service()
  url: ()->
    if @get('subdomain')
      'http://' + @get('subdomain') + '.lvh.me:3000/users/auth/twitter'
    else
      'http://' + @get('subdomain') + 'lvh.me:3000/users/auth/twitter'
  open: (data) ->
    new Ember.RSVP.Promise (resolve, reject) =>
      @set('subdomain', data.subdomain)
      @get('popup').open( @url(), ['code'], data)
      .then (authData) =>
        resolve(authData)
      .catch (reason) ->
        reject(reason)

`export default ToriiProviderApplication`
