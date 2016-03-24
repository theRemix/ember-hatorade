`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

TweetsRoute = Ember.Route.extend InfinityRoute,
  subdomain: Ember.computed.alias('urlChecker.subdomain')
  model: (params) ->
    if params.hastag? and params.user?
      @infinityModel 'tweet',{ perPage: 50, startingPage: 1 , hashtag: params.hashtag, user: params.user, subdomain: @get('subdomain')}
    else if params.hashtag?
      @infinityModel 'tweet',{ perPage: 50, startingPage: 1 , hashtag: params.hashtag, subdomain: @get('subdomain')}
    else if params.user?
      @infinityModel 'tweet',{ perPage: 50, startingPage: 1 , user: params.user , subdomain: @get('subdomain')}
    else
      @infinityModel 'tweet',{ perPage: 50, startingPage: 1 , subdomain: @get('subdomain')}

`export default TweetsRoute`
