`import Base from 'ember-simple-auth/authorizers/base';`

TwitterAuthorizer = Base.extend
  store: Ember.inject.service()
  session: Ember.inject.service()
  authorize: (sessionData, block) ->
    new Ember.RSVP.Promise (resolve, reject) =>
      Ember.$.ajax url: 'http://lvh.me:3000/api/v1/users/me'
      .then (data) =>
        @get('session.store').restore().then (cookieData) =>
          console.log('data:', data)
          cookieData.screen_name = data.users.screen_name
          console.log('cookieData', cookieData)
          @get('session.store').persist(cookieData)
    , ()=>
      reject('something got fucked up')
`export default TwitterAuthorizer`
