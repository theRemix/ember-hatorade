`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

TweetsRoute = Ember.Route.extend InfinityRoute,
  model: (params) ->
    if params.hastag? and params.user?
      @infinityModel 'tweet',{ perPage: 50, startingPage: 1 , hashtag: params.hashtag, user: params.user }
    else if params.hashtag?
      @infinityModel 'tweet',{ perPage: 50, startingPage: 1 , hashtag: params.hashtag }
    else if params.user?
      @infinityModel 'tweet',{ perPage: 50, startingPage: 1 , user: params.user }
    else
      @infinityModel 'tweet',{ perPage: 50, startingPage: 1 }

`export default TweetsRoute`
